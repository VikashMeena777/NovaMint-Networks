'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/types';

export default function CheckoutStatusPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkOrderStatus() {
            if (!orderId) {
                setLoading(false);
                return;
            }

            const supabase = getSupabaseClient();

            // Poll Supabase a few times as webhook may take a moment
            let attempts = 0;
            const maxAttempts = 6;
            const interval = 3000;

            const poll = async () => {
                const { data } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('id', orderId)
                    .single();

                if (data) {
                    setOrder(data);
                    if (data.status !== 'pending') {
                        setLoading(false);
                        return;
                    }
                }

                attempts++;

                if (attempts < maxAttempts) {
                    setTimeout(poll, interval);
                } else {
                    // Supabase still shows pending — check Cashfree directly
                    try {
                        const res = await fetch(`/api/orders/status?order_id=${orderId}`);
                        if (res.ok) {
                            const { payments } = await res.json();
                            if (payments && payments.length > 0) {
                                const latest = payments[0];
                                const cfStatus =
                                    latest.payment_status === 'SUCCESS' ? 'paid' :
                                    latest.payment_status === 'FAILED' ? 'failed' :
                                    'pending';
                                if (cfStatus !== 'pending' && data) {
                                    setOrder({ ...data, status: cfStatus });
                                }
                            }
                        }
                    } catch {
                        // Cashfree check failed — keep existing status
                    }
                    setLoading(false);
                }
            };

            poll();
        }

        checkOrderStatus();
    }, [orderId]);

    const getStatusContent = () => {
        if (loading) {
            return {
                icon: <Loader2 className="w-16 h-16 animate-spin text-primary" />,
                title: 'Verifying Payment...',
                description: 'Please wait while we confirm your payment.',
                color: 'text-primary',
            };
        }

        if (!order) {
            return {
                icon: <XCircle className="w-16 h-16 text-red-500" />,
                title: 'Order Not Found',
                description: 'We could not find your order. Please contact support.',
                color: 'text-red-500',
            };
        }

        switch (order.status) {
            case 'paid':
                return {
                    icon: <CheckCircle className="w-16 h-16 text-green-500" />,
                    title: 'Payment Successful!',
                    description: 'Your order has been confirmed. Check your email for details and download links.',
                    color: 'text-green-500',
                };
            case 'failed':
                return {
                    icon: <XCircle className="w-16 h-16 text-red-500" />,
                    title: 'Payment Failed',
                    description: 'Your payment could not be processed. Please try again.',
                    color: 'text-red-500',
                };
            default:
                return {
                    icon: <Clock className="w-16 h-16 text-yellow-500" />,
                    title: 'Payment Pending',
                    description: 'Your payment is still being processed. You\'ll receive a confirmation email shortly.',
                    color: 'text-yellow-500',
                };
        }
    };

    const content = getStatusContent();

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full px-4"
            >
                <Card className="p-8 text-center">
                    <div className="flex justify-center mb-6">{content.icon}</div>
                    <h1 className={`text-2xl font-bold mb-3 ${content.color}`}>
                        {content.title}
                    </h1>
                    <p className="text-muted-foreground mb-6">{content.description}</p>

                    {order && (
                        <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-mono text-sm">{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-muted-foreground mt-2">Amount</p>
                            <p className="font-bold text-lg">₹{order.total}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        {order?.status === 'paid' && (
                            <Link href="/dashboard">
                                <Button className="w-full">Go to Dashboard</Button>
                            </Link>
                        )}
                        {order?.status === 'failed' && (
                            <Link href="/checkout">
                                <Button className="w-full">Try Again</Button>
                            </Link>
                        )}
                        <Link href="/">
                            <Button variant="outline" className="w-full">Back to Home</Button>
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
