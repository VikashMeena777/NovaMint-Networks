import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendBookingNotification } from '@/lib/resend';

// POST /api/bookings - Create a booking request (for subscription services)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, service } = body;

        if (!name || !email || !service) {
            return NextResponse.json(
                { error: 'Name, email, and service are required' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        const { data, error } = await supabase
            .from('bookings')
            .insert({
                name,
                email,
                phone: phone || null,
                service,
                status: 'pending',
            })
            .select()
            .single();

        if (error) {
            console.error('Booking creation error:', error);
            return NextResponse.json(
                { error: 'Failed to create booking' },
                { status: 500 }
            );
        }

        // Send admin notification via Resend
        await sendBookingNotification({ name, email, phone, service });

        return NextResponse.json({
            success: true,
            message: 'Booking request submitted! We\'ll contact you within 24 hours to discuss setup.',
        });
    } catch (error) {
        console.error('Booking API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
