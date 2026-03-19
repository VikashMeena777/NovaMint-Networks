'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ArrowLeft, Download, Loader2, ShoppingBag, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card, Badge } from '@/components/ui';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/types';

export default function BillingPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (!user) return;
            const supabase = getSupabaseClient();
            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (data) setOrders(data);
            setLoading(false);
        }
        if (user) fetchOrders();
    }, [user]);

    const totalSpent = orders
        .filter((o) => o.status === 'paid')
        .reduce((sum, o) => sum + (o.total || 0), 0);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container max-w-4xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">Billing</h1>
                    <p className="text-muted-foreground mb-8">
                        View your payment history and invoices
                    </p>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Total Spent</p>
                                    <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Successful</p>
                                    <p className="text-2xl font-bold">
                                        {orders.filter((o) => o.status === 'paid').length}
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Total Orders</p>
                                    <p className="text-2xl font-bold">{orders.length}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Orders Table */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-6">Payment History</h2>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-12">
                                <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No payments yet</h3>
                                <p className="text-muted-foreground mb-6">
                                    Your payment history will appear here
                                </p>
                                <Link href="/products">
                                    <Button>Browse Products</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(order.status)}
                                            <div>
                                                <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-bold">₹{order.total}</p>
                                                <Badge variant={order.status === 'paid' ? 'success' : 'default'}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            {order.status === 'paid' && (
                                                <Button variant="ghost" size="sm" title="Download invoice">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
