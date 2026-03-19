import { NextRequest, NextResponse } from 'next/server';
import { getCashfreeOrderStatus } from '@/lib/cashfree';
import { createAdminClient } from '@/lib/supabase/server';
import { sendOrderConfirmation } from '@/lib/resend';

// POST /api/orders/verify — Manually verify & sync payment status from Cashfree
export async function POST(req: NextRequest) {
    try {
        const { order_id } = await req.json();

        if (!order_id) {
            return NextResponse.json({ error: 'order_id is required' }, { status: 400 });
        }

        const supabase = createAdminClient();

        // 1. Fetch current order from DB
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', order_id)
            .single();

        if (orderError || !order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Already processed — return current status
        if (order.status === 'paid') {
            return NextResponse.json({ order, already_paid: true });
        }

        // 2. Check Cashfree for actual payment status
        let payments: any[] = [];
        try {
            payments = await getCashfreeOrderStatus(order_id) as any[];
        } catch {
            return NextResponse.json({ order, cashfree_check: 'failed' });
        }

        if (!payments || payments.length === 0) {
            return NextResponse.json({ order, cashfree_check: 'no_payments' });
        }

        // Find a successful payment
        const successPayment = payments.find(
            (p: any) => p.payment_status === 'SUCCESS'
        );

        if (!successPayment) {
            // Check if all failed
            const allFailed = payments.every(
                (p: any) => p.payment_status === 'FAILED' || p.payment_status === 'CANCELLED'
            );
            if (allFailed && order.status !== 'failed') {
                await supabase
                    .from('orders')
                    .update({ status: 'failed', updated_at: new Date().toISOString() })
                    .eq('id', order_id);
                return NextResponse.json({
                    order: { ...order, status: 'failed' },
                    synced: true,
                });
            }
            return NextResponse.json({ order, cashfree_check: 'pending' });
        }

        // 3. Payment is SUCCESS but webhook was missed — sync now
        const cfPaymentId = successPayment.cf_payment_id?.toString();
        const paymentMethod = successPayment.payment_group || 'unknown';

        const { data: updatedOrder } = await supabase
            .from('orders')
            .update({
                status: 'paid',
                cashfree_payment_id: cfPaymentId,
                payment_method: paymentMethod,
                updated_at: new Date().toISOString(),
            })
            .eq('id', order_id)
            .select()
            .single();

        // 4. Grant digital product access
        const { data: orderItems } = await supabase
            .from('order_items')
            .select('*, product:products(delivery_url, delivery_instructions)')
            .eq('order_id', order_id);

        if (updatedOrder?.user_id && orderItems) {
            const userProducts = orderItems
                .filter((item: any) => item.product_id)
                .map((item: any) => ({
                    user_id: updatedOrder.user_id,
                    product_id: item.product_id,
                    order_id: order_id,
                    delivery_url: item.product?.delivery_url || null,
                    delivery_instructions: item.product?.delivery_instructions || null,
                }));

            if (userProducts.length > 0) {
                await supabase
                    .from('user_products')
                    .upsert(userProducts, { onConflict: 'user_id,product_id' })
                    .select();
            }
        }

        // 5. Send confirmation email (if not already sent)
        if (updatedOrder?.billing_email) {
            const emailItems = (orderItems || []).map((item: any) => ({
                name: item.product_name,
                price: item.price,
                quantity: item.quantity,
                delivery_url: item.product?.delivery_url || null,
                delivery_instructions: item.product?.delivery_instructions || null,
            }));

            await sendOrderConfirmation(
                updatedOrder.billing_email,
                updatedOrder.billing_name || 'Customer',
                order_id,
                updatedOrder.total,
                emailItems
            );
        }

        return NextResponse.json({
            order: updatedOrder || { ...order, status: 'paid' },
            synced: true,
        });
    } catch (error) {
        console.error('Order verify error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
