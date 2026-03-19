'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Download } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <Card className="p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>

                    <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                    <p className="text-muted-foreground mb-6">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>

                    {orderId && (
                        <div className="bg-muted/50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-mono font-medium">{orderId}</p>
                        </div>
                    )}

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                            <Package className="w-6 h-6 text-primary" />
                            <div className="text-left">
                                <p className="font-medium">Check Your Email</p>
                                <p className="text-sm text-muted-foreground">
                                    We've sent order details and download links to your email
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                            <Download className="w-6 h-6 text-primary" />
                            <div className="text-left">
                                <p className="font-medium">Access Your Products</p>
                                <p className="text-sm text-muted-foreground">
                                    View and download your automations from your dashboard
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/dashboard" className="flex-1">
                            <Button className="w-full">
                                Go to Dashboard
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/ai-automations" className="flex-1">
                            <Button variant="outline" className="w-full">
                                Browse More
                            </Button>
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
