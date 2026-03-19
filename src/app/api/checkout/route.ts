import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { createCashfreeOrder } from '@/lib/cashfree';

// POST /api/checkout - Create Cashfree order + DB order
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, billing_name, billing_email, billing_phone } = body;

        if (!items || !items.length) {
            return NextResponse.json(
                { error: 'No items in cart' },
                { status: 400 }
            );
        }

        // Calculate total
        const total = items.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
        );

        // Get authenticated user (optional)
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        const adminClient = createAdminClient();

        // Create order in database first
        const { data: order, error: orderError } = await adminClient
            .from('orders')
            .insert({
                user_id: user?.id || null,
                status: 'pending',
                total,
                billing_name,
                billing_email,
                billing_phone,
            })
            .select()
            .single();

        if (orderError) {
            console.error('Order creation error:', orderError);
            return NextResponse.json(
                { error: 'Failed to create order' },
                { status: 500 }
            );
        }

        // Resolve cart item slugs to real product UUIDs
        const itemSlugs = items.map((item: any) => item.id).filter(Boolean);
        const { data: dbProducts } = await adminClient
            .from('products')
            .select('id, slug')
            .in('slug', itemSlugs);

        const slugToUuid = new Map(
            dbProducts?.map((p: any) => [p.slug, p.id]) || []
        );

        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            product_id: slugToUuid.get(item.id) || null,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type,
        }));

        const { error: itemsError } = await adminClient
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            console.error('Order items insert error:', itemsError);
            // Don't fail the checkout — order is already created; items are logged
        }

        // Create Cashfree order
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const cashfreeOrder = await createCashfreeOrder({
            orderId: order.id,
            amount: total,
            customerName: billing_name,
            customerEmail: billing_email,
            customerPhone: billing_phone || '9999999999',
            returnUrl: `${appUrl}/checkout/status?order_id=${order.id}`,
            notifyUrl: `${appUrl}/api/webhooks/cashfree`,
        });

        // Update order with Cashfree order ID
        await adminClient
            .from('orders')
            .update({ cashfree_order_id: cashfreeOrder.cf_order_id })
            .eq('id', order.id);

        return NextResponse.json({
            orderId: order.id,
            paymentSessionId: cashfreeOrder.payment_session_id,
            cfOrderId: cashfreeOrder.cf_order_id,
            environment: process.env.NEXT_PUBLIC_CASHFREE_MODE || 'sandbox',
        });
    } catch (error) {
        console.error('Checkout API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
