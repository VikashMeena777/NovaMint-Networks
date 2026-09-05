import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendAbandonedCartRecoveryEmail } from '@/lib/resend';

// GET /api/cron/recover-abandoned-checkouts - Cron job for abandoned checkout recovery
export async function GET(request: Request) {
    try {
        // 1. Verify CRON_SECRET for security (Rule 4.2)
        const authHeader = request.headers.get('authorization');
        const url = new URL(request.url);
        const querySecret = url.searchParams.get('secret');
        const expectedSecret = process.env.CRON_SECRET;

        const isAuthorized =
            Boolean(expectedSecret) &&
            (authHeader === `Bearer ${expectedSecret}` || querySecret === expectedSecret);

        if (!isAuthorized) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabase = createAdminClient();

        // 2. Window: Orders pending between 25 minutes and 24 hours ago
        const now = new Date();
        const minAgeTime = new Date(now.getTime() - 25 * 60 * 1000).toISOString();
        const maxAgeTime = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

        // Find pending orders in this window
        const { data: abandonedOrders, error: ordersError } = await supabase
            .from('orders')
            .select('id, total, billing_name, billing_email, created_at')
            .eq('status', 'pending')
            .lte('created_at', minAgeTime)
            .gte('created_at', maxAgeTime)
            .limit(20);

        if (ordersError) {
            console.error('Error fetching abandoned orders:', ordersError);
            return NextResponse.json({ error: 'Failed to query orders' }, { status: 500 });
        }

        if (!abandonedOrders || abandonedOrders.length === 0) {
            return NextResponse.json({
                message: 'No abandoned checkouts requiring recovery at this time',
                processed: 0,
            });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        let recoveredCount = 0;

        for (const order of abandonedOrders) {
            if (!order.billing_email) continue;

            // Fetch order items for this order
            const { data: items } = await supabase
                .from('order_items')
                .select('product_name, price, quantity')
                .eq('order_id', order.id);

            const emailItems = (items || []).map((item: any) => ({
                name: item.product_name,
                price: item.price,
                quantity: item.quantity,
            }));

            const recoveryUrl = `${appUrl}/checkout?order_id=${order.id}&recovery=1`;

            // Dispatch recovery email
            const result = await sendAbandonedCartRecoveryEmail(
                order.billing_email,
                order.billing_name || 'Creator',
                order.id,
                order.total,
                emailItems,
                recoveryUrl
            );

            if (result?.success) {
                recoveredCount++;
                // Mark order updated to prevent re-sending
                await supabase
                    .from('orders')
                    .update({
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', order.id);
            }
        }

        return NextResponse.json({
            success: true,
            totalFound: abandonedOrders.length,
            recoveredEmailsSent: recoveredCount,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        console.error('Abandoned checkout recovery cron error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
