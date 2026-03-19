// ============================================
// NovaMint Email Templates (Resend HTML)
// ============================================

const baseStyle = `
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: #0a0a0a;
  color: #e5e5e5;
  padding: 40px 20px;
`;

const cardStyle = `
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #2a2a4a;
`;

const buttonStyle = `
  display: inline-block;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  margin-top: 8px;
`;

interface OrderEmailItem {
    name: string;
    price: number;
    quantity: number;
    delivery_url?: string | null;
    delivery_instructions?: string | null;
}

// ── Order Confirmation (sent to buyer) ──
export function orderConfirmationHtml(
    customerName: string,
    orderId: string,
    total: number,
    items: OrderEmailItem[]
): string {
    const itemRows = items.map((item) => {
        const deliveryBlock = item.delivery_url
            ? `<div style="margin-top: 8px;">
                 <a href="${item.delivery_url}" style="${buttonStyle}; font-size: 12px; padding: 10px 20px;">
                   📥 Download / Access
                 </a>
                 ${item.delivery_instructions
                    ? `<p style="color: #9ca3af; font-size: 12px; margin-top: 6px;">${item.delivery_instructions}</p>`
                    : ''
                 }
               </div>`
            : '';

        return `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #2a2a4a;">
              <strong style="color: #f3f4f6;">${item.name}</strong>
              <span style="color: #6b7280; font-size: 12px;"> × ${item.quantity}</span>
              ${deliveryBlock}
            </td>
            <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #2a2a4a; color: #10b981; font-weight: 600;">
              ₹${item.price * item.quantity}
            </td>
          </tr>
        `;
    }).join('');

    return `
    <div style="${baseStyle}">
      <div style="${cardStyle}">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #10b981; margin: 0; font-size: 24px;">✅ Order Confirmed</h1>
          <p style="color: #9ca3af; margin-top: 4px;">Order #${orderId.slice(0, 8)}</p>
        </div>

        <p style="color: #d1d5db;">Hi <strong>${customerName}</strong>,</p>
        <p style="color: #9ca3af;">Thank you for your purchase! Here are your order details:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px 0; border-bottom: 2px solid #10b981; color: #10b981; font-size: 12px; text-transform: uppercase;">Item</th>
              <th style="text-align: right; padding: 8px 0; border-bottom: 2px solid #10b981; color: #10b981; font-size: 12px; text-transform: uppercase;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 16px 0 0; font-weight: 700; color: #f3f4f6; font-size: 16px;">Total</td>
              <td style="padding: 16px 0 0; text-align: right; font-weight: 700; color: #10b981; font-size: 18px;">₹${total}</td>
            </tr>
          </tfoot>
        </table>

        <div style="text-align: center; margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://novamintnetworks.com'}/dashboard" style="${buttonStyle}">
            View in Dashboard →
          </a>
        </div>

        <p style="color: #6b7280; font-size: 12px; margin-top: 24px; text-align: center;">
          Need help? Reply to this email or contact us at support@novamintnetworks.com
        </p>
      </div>
    </div>
    `;
}

// ── Booking Notification (sent to admin) ──
export function bookingNotificationHtml(
    booking: { name: string; email: string; phone?: string; service: string }
): string {
    return `
    <div style="${baseStyle}">
      <div style="${cardStyle}">
        <h1 style="color: #f59e0b; margin: 0 0 16px;">📋 New Booking Request</h1>
        <table style="width: 100%;">
          <tr><td style="color: #9ca3af; padding: 6px 0;">Service:</td><td style="color: #f3f4f6; font-weight: 600;">${booking.service}</td></tr>
          <tr><td style="color: #9ca3af; padding: 6px 0;">Name:</td><td style="color: #f3f4f6;">${booking.name}</td></tr>
          <tr><td style="color: #9ca3af; padding: 6px 0;">Email:</td><td style="color: #f3f4f6;">${booking.email}</td></tr>
          ${booking.phone ? `<tr><td style="color: #9ca3af; padding: 6px 0;">Phone:</td><td style="color: #f3f4f6;">${booking.phone}</td></tr>` : ''}
        </table>
        <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">Contact them to discuss setup and start the subscription.</p>
      </div>
    </div>
    `;
}

// ── Contact Notification (sent to admin) ──
export function contactNotificationHtml(
    contact: { name: string; email: string; phone?: string; subject?: string; message: string }
): string {
    return `
    <div style="${baseStyle}">
      <div style="${cardStyle}">
        <h1 style="color: #3b82f6; margin: 0 0 16px;">💬 New Contact Message</h1>
        <table style="width: 100%;">
          <tr><td style="color: #9ca3af; padding: 6px 0;">From:</td><td style="color: #f3f4f6;">${contact.name} (${contact.email})</td></tr>
          ${contact.phone ? `<tr><td style="color: #9ca3af; padding: 6px 0;">Phone:</td><td style="color: #f3f4f6;">${contact.phone}</td></tr>` : ''}
          ${contact.subject ? `<tr><td style="color: #9ca3af; padding: 6px 0;">Subject:</td><td style="color: #f3f4f6;">${contact.subject}</td></tr>` : ''}
        </table>
        <div style="background: #111827; border-radius: 8px; padding: 16px; margin-top: 16px; color: #d1d5db;">
          ${contact.message}
        </div>
      </div>
    </div>
    `;
}

// ── Subscription Expiry Reminder (sent to user) ──
export function subscriptionExpiryReminderHtml(
    customerName: string,
    planName: string,
    daysRemaining: number,
    renewUrl: string
): string {
    return `
    <div style="${baseStyle}">
      <div style="${cardStyle}">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #f59e0b; margin: 0; font-size: 24px;">⚠️ Subscription Expiring</h1>
        </div>

        <p style="color: #d1d5db;">Hi <strong>${customerName}</strong>,</p>
        <p style="color: #9ca3af;">
          Your <strong style="color: #10b981;">${planName}</strong> plan expires in
          <strong style="color: #f59e0b;">${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}</strong>.
        </p>
        <p style="color: #9ca3af;">
          Renew now to keep your automations running without interruption.
          If you don't renew, your workflows will be automatically paused.
        </p>

        <div style="text-align: center; margin-top: 24px;">
          <a href="${renewUrl}" style="${buttonStyle}">
            Renew Now →
          </a>
        </div>

        <p style="color: #6b7280; font-size: 12px; margin-top: 24px; text-align: center;">
          Questions? Reply to this email or contact support@novamintnetworks.com
        </p>
      </div>
    </div>
    `;
}
