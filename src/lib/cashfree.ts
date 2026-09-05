import { Cashfree, CFEnvironment } from 'cashfree-pg';
import crypto from 'crypto';

// Initialize Cashfree SDK (v5 instance-based API)
const cashfreeEnvironment =
    process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production'
        ? CFEnvironment.PRODUCTION
        : CFEnvironment.SANDBOX;

const cashfree = new Cashfree(
    cashfreeEnvironment,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);

export interface CashfreeOrderRequest {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    returnUrl: string;
    notifyUrl: string;
}

export interface CashfreeOrderResponse {
    cf_order_id: string;
    order_id: string;
    payment_session_id: string;
    order_status: string;
}

// Create a Cashfree order
export async function createCashfreeOrder(params: CashfreeOrderRequest): Promise<CashfreeOrderResponse> {
    const request = {
        order_amount: params.amount,
        order_currency: 'INR',
        order_id: params.orderId,
        customer_details: {
            customer_id: params.orderId,
            customer_name: params.customerName,
            customer_email: params.customerEmail,
            customer_phone: params.customerPhone || '9999999999',
        },
        order_meta: {
            return_url: params.returnUrl,
            notify_url: params.notifyUrl,
        },
    };

    const response = await cashfree.PGCreateOrder(request);
    return response.data as CashfreeOrderResponse;
}

// Verify Cashfree webhook signature
export function verifyCashfreeWebhook(
    rawBody: string,
    timestamp: string,
    signature: string
): boolean {
    const secretKey = process.env.CASHFREE_WEBHOOK_SECRET || process.env.CASHFREE_SECRET_KEY;
    if (!process.env.CASHFREE_WEBHOOK_SECRET && process.env.CASHFREE_SECRET_KEY) {
        console.warn('WARNING: CASHFREE_WEBHOOK_SECRET is not set, falling back to CASHFREE_SECRET_KEY');
    }
    if (!secretKey) {
        console.error('CRITICAL: No webhook secret configured — rejecting webhook');
        return false;
    }
    if (!signature || !timestamp) {
        console.error('CRITICAL: Missing signature or timestamp header — rejecting webhook');
        return false;
    }
    const body = timestamp + rawBody;
    const expectedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(body)
        .digest('base64');

    // Use timing-safe comparison to prevent timing attacks
    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

// Fetch order status from Cashfree
export async function getCashfreeOrderStatus(orderId: string) {
    const response = await cashfree.PGOrderFetchPayments(orderId);
    return response.data;
}
