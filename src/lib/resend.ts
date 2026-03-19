import { Resend } from 'resend';
import {
    orderConfirmationHtml,
    bookingNotificationHtml,
    contactNotificationHtml,
    subscriptionExpiryReminderHtml,
} from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY!);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'orders@novamintnetworks.com';

interface OrderEmailItem {
    name: string;
    price: number;
    quantity: number;
    delivery_url?: string | null;
    delivery_instructions?: string | null;
}

// Send order confirmation with download links to buyer
export async function sendOrderConfirmation(
    customerEmail: string,
    customerName: string,
    orderId: string,
    total: number,
    items: OrderEmailItem[]
) {
    try {
        const { data, error } = await resend.emails.send({
            from: `NovaMint Networks <${fromEmail}>`,
            to: customerEmail,
            subject: `Order Confirmed — #${orderId.slice(0, 8)}`,
            html: orderConfirmationHtml(customerName, orderId, total, items),
        });

        if (error) {
            console.error('Resend order email error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Resend error:', err);
        return { success: false, error: err };
    }
}

// Send admin notification for new booking
export async function sendBookingNotification(
    booking: { name: string; email: string; phone?: string; service: string }
) {
    try {
        const adminEmail = process.env.RESEND_FROM_EMAIL || fromEmail;
        const { data, error } = await resend.emails.send({
            from: `NovaMint Notifications <${fromEmail}>`,
            to: adminEmail,
            subject: `New Booking: ${booking.service} — ${booking.name}`,
            html: bookingNotificationHtml(booking),
        });

        if (error) console.error('Resend booking email error:', error);
        return { success: !error, data, error };
    } catch (err) {
        console.error('Resend error:', err);
        return { success: false, error: err };
    }
}

// Send admin notification for new contact submission
export async function sendContactNotification(
    contact: { name: string; email: string; phone?: string; subject?: string; message: string }
) {
    try {
        const adminEmail = process.env.RESEND_FROM_EMAIL || fromEmail;
        const { data, error } = await resend.emails.send({
            from: `NovaMint Notifications <${fromEmail}>`,
            to: adminEmail,
            subject: `New Contact: ${contact.subject || 'General Inquiry'} — ${contact.name}`,
            html: contactNotificationHtml(contact),
        });

        if (error) console.error('Resend contact email error:', error);
        return { success: !error, data, error };
    } catch (err) {
        console.error('Resend error:', err);
        return { success: false, error: err };
    }
}

// Send subscription expiry reminder to user
export async function sendSubscriptionExpiryReminder(
    customerEmail: string,
    customerName: string,
    planName: string,
    daysRemaining: number,
    renewUrl: string
) {
    try {
        const { data, error } = await resend.emails.send({
            from: `NovaMint Networks <${fromEmail}>`,
            to: customerEmail,
            subject: `⚠️ Your ${planName} plan expires in ${daysRemaining} days`,
            html: subscriptionExpiryReminderHtml(customerName, planName, daysRemaining, renewUrl),
        });

        if (error) console.error('Resend expiry email error:', error);
        return { success: !error, data, error };
    } catch (err) {
        console.error('Resend error:', err);
        return { success: false, error: err };
    }
}
