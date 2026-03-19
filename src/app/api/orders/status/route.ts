import { NextRequest, NextResponse } from 'next/server';
import { getCashfreeOrderStatus } from '@/lib/cashfree';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
        return NextResponse.json({ error: 'order_id is required' }, { status: 400 });
    }

    try {
        const payments = await getCashfreeOrderStatus(orderId);
        return NextResponse.json({ payments });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unable to fetch order status';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
