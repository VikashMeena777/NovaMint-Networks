import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// GET /api/products - Get all active products
export async function GET() {
    try {
        const supabase = createAdminClient();

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('active', true)
            .order('price', { ascending: true });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ products: data });
    } catch (error) {
        console.error('Products API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
