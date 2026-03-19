import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendContactNotification } from '@/lib/resend';

// POST /api/contact - Submit contact form
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        const { data, error } = await supabase
            .from('contact_submissions')
            .insert({
                name,
                email,
                phone: phone || null,
                subject: subject || null,
                message,
            })
            .select()
            .single();

        if (error) {
            console.error('Contact submission error:', error);
            return NextResponse.json(
                { error: 'Failed to submit contact form' },
                { status: 500 }
            );
        }

        // Send email notification via Resend
        await sendContactNotification({ name, email, phone, subject, message });

        return NextResponse.json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.',
        });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
