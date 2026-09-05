'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ShoppingBag, CheckCircle, Clock, XCircle, Loader2,
    ArrowRight, Sparkles, Download, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/types';

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (!user) return;

            const supabase = getSupabaseClient();
            const { data } = await supabase
                .from('orders')
                .select('id, status, total, created_at, billing_name, cashfree_order_id, payment_method')
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
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    if (authLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
            </div>
        );
    }

    const paidOrders = orders.filter((o) => o.status === 'paid');
    const totalSpent = paidOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" />
                        Settled
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        Pending
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                        <XCircle className="w-3 h-3" />
                        Failed
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] text-neutral-400 border border-white/[0.08]">
                        {status}
                    </span>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Greeting Banner */}
            <SpotlightCard className="p-6 sm:p-8 bg-gradient-to-r from-primary-950/40 via-[#08090C] to-[#08090C] border-white/[0.08]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-3">
                            <Sparkles className="w-3 h-3" />
                            <span>Client Workspace Online</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-1.5">
                            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Partner'}
                        </h1>
                        <p className="text-xs text-neutral-400 max-w-xl">
                            Monitor your digital assets, download viral reels vaults, view settlement invoices, or schedule your next sprint review.
                        </p>
                    </div>

                    <Link href="/products" className="shrink-0">
                        <button className="py-2.5 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer shadow-lg">
                            <span>Browse New Assets</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </Link>
                </div>
            </SpotlightCard>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SpotlightCard className="p-5 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Total Orders</span>
                        <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                            <ShoppingBag className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold font-display text-white">{orders.length}</div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">Recorded in telemetry</div>
                </SpotlightCard>

                <SpotlightCard className="p-5 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Active Assets</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold font-display text-emerald-400">{paidOrders.length}</div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">Settled & accessible</div>
                </SpotlightCard>

                <SpotlightCard className="p-5 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Total Settled</span>
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold font-display text-white">₹{totalSpent.toLocaleString()}</div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">INR verified via Cashfree</div>
                </SpotlightCard>
            </div>

            {/* Recent Orders Section */}
            <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                    <div>
                        <h2 className="text-base font-bold font-display text-white">Recent Transactions</h2>
                        <p className="text-xs text-neutral-400">Your latest automation packages and digital bundles</p>
                    </div>
                    <Link
                        href="/dashboard/orders"
                        className="text-xs font-mono text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                    >
                        <span>VIEW ALL</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4 text-neutral-500">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">No Orders Recorded</h3>
                        <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto">
                            You haven't made any purchases yet. Discover our top-rated AI content engines and viral creator kits.
                        </p>
                        <Link href="/products">
                            <button className="py-2.5 px-5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs transition-all cursor-pointer">
                                Browse Digital Products
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-black/40 hover:border-white/[0.12] transition-colors gap-4"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary-400 shrink-0 font-mono text-xs font-bold">
                                        #{order.id.slice(0, 4)}
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-white font-mono">
                                            ID: {order.id.slice(0, 8)}...{order.id.slice(-4)}
                                        </div>
                                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <div className="text-right">
                                        <div className="text-sm font-bold font-mono text-white">
                                            ₹{order.total}
                                        </div>
                                        <div className="mt-0.5">{getStatusBadge(order.status)}</div>
                                    </div>

                                    <Link href="/dashboard/orders">
                                        <button className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors cursor-pointer" title="View details">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </SpotlightCard>
        </motion.div>
    );
}
