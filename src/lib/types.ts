// Database types matching Supabase schema

export interface Profile {
    id: string;
    email: string | null;
    full_name: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    original_price: number | null;
    category: 'reels' | 'mega' | 'automation' | 'course';
    type: 'one-time' | 'subscription';
    billing_period: 'monthly' | 'yearly' | null;
    features: string[];
    delivery_url: string | null;
    delivery_instructions: string | null;
    icon: string | null;
    popular: boolean;
    tag: string | null;
    active: boolean;
    created_at: string;
}

export interface Order {
    id: string;
    user_id: string | null;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    total: number;
    cashfree_order_id: string | null;
    cashfree_payment_id: string | null;
    payment_method: string | null;
    billing_name: string | null;
    billing_email: string | null;
    billing_phone: string | null;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string | null;
    product_name: string;
    price: number;
    quantity: number;
    type: 'one-time' | 'subscription';
}

export interface UserProduct {
    id: string;
    user_id: string;
    product_id: string | null;
    order_id: string | null;
    delivery_url: string | null;
    delivery_instructions: string | null;
    purchased_at: string;
    // joined fields
    product?: Product;
}

export interface Subscription {
    id: string;
    user_id: string;
    plan_name: string;
    plan_price: number;
    billing_period: 'monthly' | 'yearly';
    n8n_workflow_ids: string[];
    status: 'active' | 'expired' | 'paused' | 'cancelled';
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    service: string;
    status: 'pending' | 'contacted' | 'setup_complete';
    created_at: string;
}

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    created_at: string;
}

// Cart types (for frontend)
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    type: 'one-time' | 'subscription';
    billingPeriod?: 'monthly' | 'yearly';
}

export interface Cart {
    items: CartItem[];
    total: number;
}
