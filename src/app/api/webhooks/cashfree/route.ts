import { NextResponse } from 'next/server';
import { verifyCashfreeWebhook } from '@/lib/cashfree';
import { createAdminClient } from '@/lib/supabase/server';
import { sendOrderConfirmation } from '@/lib/resend';

// POST /api/webhooks/cashfree - Handle Cashfree payment webhook
export async function POST(request: Request) {
    try {
        const rawBody = await request.text();
        const timestamp = request.headers.get('x-webhook-timestamp') || '';
        const signature = request.headers.get('x-webhook-signature') || '';

        // Verify webhook signature
        if (signature && process.env.CASHFREE_SECRET_KEY) {
            const isValid = verifyCashfreeWebhook(rawBody, timestamp, signature);
            if (!isValid) {
                console.error('Invalid Cashfree webhook signature');
                return NextResponse.json(
                    { error: 'Invalid signature' },
                    { status: 400 }
                );
            }
        }

        const body = JSON.parse(rawBody);
        const eventType = body.type;

        // Only process payment success events
        if (eventType !== 'PAYMENT_SUCCESS_WEBHOOK') {
            return NextResponse.json({ ok: true });
        }

        const paymentData = body.data;
        const orderId = paymentData?.order?.order_id;
        const cfPaymentId = paymentData?.payment?.cf_payment_id?.toString();
        const paymentMethod = paymentData?.payment?.payment_group || 'unknown';

        if (!orderId) {
            return NextResponse.json(
                { error: 'Missing order_id' },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Update order status
        const { data: order, error } = await supabase
            .from('orders')
            .update({
                status: 'paid',
                cashfree_payment_id: cfPaymentId,
                payment_method: paymentMethod,
                updated_at: new Date().toISOString(),
            })
            .eq('id', orderId)
            .select()
            .single();

        if (error || !order) {
            console.error('Order update error:', error);
            return NextResponse.json(
                { error: 'Failed to update order' },
                { status: 500 }
            );
        }

        // Fetch order items with product details
        const { data: orderItems } = await supabase
            .from('order_items')
            .select('*, product:products(delivery_url, delivery_instructions)')
            .eq('order_id', orderId);

        // Grant digital product access (insert into user_products)
        if (order.user_id && orderItems) {
            const userProducts = orderItems
                .filter((item: any) => item.product_id)
                .map((item: any) => ({
                    user_id: order.user_id,
                    product_id: item.product_id,
                    order_id: orderId,
                    delivery_url: item.product?.delivery_url || null,
                    delivery_instructions: item.product?.delivery_instructions || null,
                }));

            if (userProducts.length > 0) {
                await supabase.from('user_products').insert(userProducts);
            }
        }

        // Send confirmation email with download links
        if (order.billing_email) {
            const emailItems = (orderItems || []).map((item: any) => ({
                name: item.product_name,
                price: item.price,
                quantity: item.quantity,
                delivery_url: item.product?.delivery_url || null,
                delivery_instructions: item.product?.delivery_instructions || null,
            }));

            await sendOrderConfirmation(
                order.billing_email,
                order.billing_name || 'Customer',
                orderId,
                order.total,
                emailItems
            );
        }

        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        console.error('Cashfree webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
