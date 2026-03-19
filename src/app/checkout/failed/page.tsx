'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function CheckoutFailedPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');

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
                        className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6"
                    >
                        <XCircle className="w-10 h-10 text-red-500" />
                    </motion.div>

                    <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
                    <p className="text-muted-foreground mb-6">
                        We couldn't process your payment. Don't worry, no charges were made.
                    </p>

                    {orderId && (
                        <div className="bg-muted/50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-muted-foreground">Reference ID</p>
                            <p className="font-mono font-medium">{orderId}</p>
                        </div>
                    )}

                    <div className="space-y-3 text-left mb-8">
                        <h3 className="font-medium">Common reasons for payment failure:</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• Insufficient balance in your account</li>
                            <li>• Card details entered incorrectly</li>
                            <li>• Transaction declined by your bank</li>
                            <li>• Network issues during payment</li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/ai-automations" className="flex-1">
                            <Button className="w-full">
                                <RefreshCw className="w-5 h-5" />
                                Try Again
                            </Button>
                        </Link>
                        <Link href="/contact" className="flex-1">
                            <Button variant="outline" className="w-full">
                                <HelpCircle className="w-5 h-5" />
                                Get Help
                            </Button>
                        </Link>
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mt-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </Card>
            </motion.div>
        </div>
    );
}
