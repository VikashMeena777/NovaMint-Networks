'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Package, Loader2, CheckCircle, Clock, XCircle,
    ChevronDown, ChevronUp, ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card, Badge } from '@/components/ui';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/types';

interface OrderItem {
    id: string;
    product_name: string;
    price: number;
    quantity: number;
    product_id: string | null;
}

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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

    const fetchOrderItems = async (orderId: string) => {
        if (orderItems[orderId]) return;

        const supabase = getSupabaseClient();
        const { data } = await supabase
            .from('order_items')
            .select('id, product_name, price, quantity, product_id')
            .eq('order_id', orderId);

        if (data) {
            setOrderItems((prev) => ({ ...prev, [orderId]: data }));
        }
    };

    const toggleOrder = (orderId: string) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
            fetchOrderItems(orderId);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
            default: return <Clock className="w-5 h-5" />;
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'paid': return 'success' as const;
            case 'failed': return 'destructive' as const;
            default: return 'default' as const;
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h2 className="text-xl font-bold mb-2">Sign in to view orders</h2>
                    <p className="text-muted-foreground mb-4">
                        Please sign in to view your order history.
                    </p>
                    <Link href="/auth/login">
                        <Button>Sign In</Button>
                    </Link>
                </Card>
            </div>
        );
    }

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

                    <h1 className="text-3xl font-bold mb-2">My Orders</h1>
                    <p className="text-muted-foreground mb-8">
                        View all your orders and their details
                    </p>

                    {orders.length === 0 ? (
                        <Card className="p-12 text-center">
                            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                            <p className="text-muted-foreground mb-6">
                                You haven&apos;t placed any orders yet. Browse our products to get started!
                            </p>
                            <Link href="/products">
                                <Button>Browse Products</Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Card key={order.id} className="overflow-hidden">
                                    <button
                                        onClick={() => toggleOrder(order.id)}
                                        className="w-full p-6 flex items-center justify-between hover:bg-muted/10 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            {getStatusIcon(order.status)}
                                            <div>
                                                <p className="font-semibold">
                                                    Order #{order.id.slice(0, 8)}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-bold text-lg">₹{order.total}</p>
                                                <Badge variant={getStatusVariant(order.status)}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            {expandedOrder === order.id ? (
                                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </button>

                                    {expandedOrder === order.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="border-t border-border"
                                        >
                                            <div className="p-6 space-y-4">
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground">Order ID</p>
                                                        <p className="font-mono">{order.id.slice(0, 16)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Payment Method</p>
                                                        <p className="capitalize">
                                                            {order.payment_method || 'N/A'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Billing Name</p>
                                                        <p>{order.billing_name || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Date</p>
                                                        <p>{new Date(order.created_at).toLocaleString('en-IN')}</p>
                                                    </div>
                                                </div>

                                                {orderItems[order.id] && orderItems[order.id].length > 0 && (
                                                    <div>
                                                        <h4 className="font-semibold mb-3">Items</h4>
                                                        <div className="space-y-2">
                                                            {orderItems[order.id].map((item) => (
                                                                <div
                                                                    key={item.id}
                                                                    className="flex items-center justify-between bg-muted/20 rounded-lg p-3"
                                                                >
                                                                    <div>
                                                                        <p className="font-medium">{item.product_name}</p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Qty: {item.quantity}
                                                                        </p>
                                                                    </div>
                                                                    <p className="font-bold">₹{item.price}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
