import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

// GET /api/orders - Get user's orders
export async function GET() {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (*)
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ orders: data });
    } catch (error) {
        console.error('Orders API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const adminClient = createAdminClient();

        const { data: { user } } = await supabase.auth.getUser();
        const body = await request.json();

        const { items, total, billing_name, billing_email, billing_phone } = body;

        if (!items || !items.length || !total) {
            return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
        }

        // Create order
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
            return NextResponse.json({ error: orderError.message }, { status: 500 });
        }

        // Create order items
        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.productId || null,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type,
        }));

        const { error: itemsError } = await adminClient
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            return NextResponse.json({ error: itemsError.message }, { status: 500 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error('Orders API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
