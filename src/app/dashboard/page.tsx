'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    User, Package, CreditCard, Settings, LogOut,
    ShoppingBag, Clock, CheckCircle, XCircle, Loader2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card, Badge } from '@/components/ui';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/types';

export default function DashboardPage() {
    const { user, signOut, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (!user) return;

            const supabase = getSupabaseClient();
            const { data } = await supabase
                .from('orders')
                .select('id, status, total, created_at, billing_name, cashfree_order_id')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);

            if (data) {
                setOrders(data);
            }
            setLoading(false);
        }

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (authLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'pending':
                return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                            <p className="text-muted-foreground">
                                Welcome back, {user?.user_metadata?.full_name || user?.email}
                            </p>
                        </div>
                        <Button variant="outline" onClick={signOut}>
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Total Orders</p>
                                    <p className="text-2xl font-bold">{orders.length}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Completed</p>
                                    <p className="text-2xl font-bold">
                                        {orders.filter(o => o.status === 'paid').length}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">Pending</p>
                                    <p className="text-2xl font-bold">
                                        {orders.filter(o => o.status === 'pending').length}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sidebar Navigation */}
                        <div className="md:col-span-1">
                            <Card className="p-4">
                                <nav className="space-y-1">
                                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary">
                                        <Package className="w-5 h-5" />
                                        My Orders
                                    </Link>
                                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                                        <User className="w-5 h-5" />
                                        Profile
                                    </Link>
                                    <Link href="/dashboard/billing" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                                        <CreditCard className="w-5 h-5" />
                                        Billing
                                    </Link>
                                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                                        <Settings className="w-5 h-5" />
                                        Settings
                                    </Link>
                                </nav>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2">
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-6">Recent Orders</h2>

                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Start by exploring our AI automations
                                        </p>
                                        <Link href="/ai-automations">
                                            <Button>Browse Automations</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
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
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">₹{order.total}</p>
                                                    <Badge variant={order.status === 'paid' ? 'success' : 'default'}>
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}

                                        <Link href="/dashboard/orders" className="block">
                                            <Button variant="outline" className="w-full mt-4">
                                                View All Orders
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
