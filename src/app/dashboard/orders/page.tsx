'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package, Loader2, CheckCircle, Clock, XCircle,
    ChevronDown, ChevronUp, Download, ShoppingBag, ExternalLink,
    Copy, Check
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { Order } from '@/lib/types';

interface OrderItem {
    id: string;
    product_name: string;
    price: number;
    quantity: number;
    product_id: string | null;
    delivery_url: string | null;
}

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrders() {
            if (!user) {
                setLoading(false);
                return;
            }
            const supabase = getSupabaseClient();

            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (data) setOrders(data);
            setLoading(false);
        }
        if (user) {
            fetchOrders();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const fetchOrderItems = async (orderId: string) => {
        if (orderItems[orderId]) return;

        const supabase = getSupabaseClient();
        const { data } = await supabase
            .from('order_items')
            .select('id, product_name, price, quantity, product_id, product:products(delivery_url)')
            .eq('order_id', orderId);

        const items = (data || []).map((item: any) => ({
            ...item,
            delivery_url: item.product?.delivery_url || null,
            product: undefined,
        }));

        if (items.length > 0) {
            setOrderItems((prev) => ({ ...prev, [orderId]: items }));
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

    const copyOrderId = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        toast.success('Order ID copied to clipboard');
        setTimeout(() => setCopiedId(null), 2000);
    };

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

    if (authLoading || loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
            </div>
        );
    }

    if (!user) {
        return (
            <SpotlightCard className="p-8 sm:p-12 text-center bg-[#08090C]/90 border-white/[0.08] max-w-md mx-auto">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-neutral-500" />
                <h2 className="text-xl font-bold font-display text-white mb-2">Sign in to Access Orders</h2>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                    Please log in to your NovaMint client account to inspect your license keys, order receipts, and digital vault downloads.
                </p>
                <Link href="/login">
                    <button className="w-full py-3 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer">
                        Sign In Now
                    </button>
                </Link>
            </SpotlightCard>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">
                        My Orders & Asset Downloads
                    </h1>
                    <p className="text-xs text-neutral-400">
                        Inspect purchase telemetry, download deliverable archives, and manage asset licenses.
                    </p>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                    TOTAL ORDERS: <span className="text-white font-bold">{orders.length}</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <SpotlightCard className="p-12 text-center bg-[#08090C]/80 border-white/[0.08]">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4 text-neutral-500">
                        <Package className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold font-display text-white mb-1">No Orders Found</h3>
                    <p className="text-xs text-neutral-400 mb-6 max-w-md mx-auto leading-relaxed">
                        You have not placed any orders yet. Discover our viral creator asset packs, AI workflow templates, and agency growth retainers.
                    </p>
                    <Link href="/products">
                        <button className="py-2.5 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer">
                            Browse Products
                        </button>
                    </Link>
                </SpotlightCard>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const isExpanded = expandedOrder === order.id;
                        return (
                            <SpotlightCard
                                key={order.id}
                                className="bg-[#08090C]/80 border-white/[0.08] overflow-hidden transition-all"
                            >
                                <div
                                    onClick={() => toggleOrder(order.id)}
                                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary-400 shrink-0">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm font-bold text-white">
                                                    Order #{order.id.slice(0, 8)}
                                                </span>
                                                <button
                                                    onClick={(e) => copyOrderId(order.id, e)}
                                                    className="p-1 rounded text-neutral-500 hover:text-white transition-colors"
                                                    title="Copy full Order ID"
                                                >
                                                    {copiedId === order.id ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            </div>
                                            <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                                                {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-5">
                                        <div className="text-right">
                                            <div className="text-base font-bold font-mono text-white">
                                                ₹{order.total}
                                            </div>
                                            <div className="mt-1">{getStatusBadge(order.status)}</div>
                                        </div>

                                        <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral-400">
                                            {isExpanded ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="border-t border-white/[0.06] bg-black/40 px-5 py-6 sm:px-6 space-y-6"
                                        >
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                                                <div>
                                                    <div className="text-neutral-500 mb-1">GATEWAY ID</div>
                                                    <div className="text-white truncate">
                                                        {order.cashfree_order_id || 'N/A'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-neutral-500 mb-1">PAYMENT CHANNEL</div>
                                                    <div className="text-white uppercase">
                                                        {order.payment_method || 'Cashfree UPI/PG'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-neutral-500 mb-1">RECIPIENT</div>
                                                    <div className="text-white truncate">
                                                        {order.billing_name || 'Customer'}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-neutral-500 mb-1">TIMESTAMP</div>
                                                    <div className="text-white">
                                                        {new Date(order.created_at).toLocaleTimeString('en-IN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Line Items & Download Links */}
                                            <div>
                                                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-3">
                                                    Deliverable Assets
                                                </h4>

                                                {orderItems[order.id] ? (
                                                    <div className="space-y-2">
                                                        {orderItems[order.id].map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] gap-3"
                                                            >
                                                                <div>
                                                                    <div className="text-sm font-semibold text-white">
                                                                        {item.product_name}
                                                                    </div>
                                                                    <div className="text-[11px] font-mono text-neutral-500">
                                                                        Qty: {item.quantity} · Rate: ₹{item.price}
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                                                    <div className="font-mono text-sm font-bold text-white">
                                                                        ₹{item.price * item.quantity}
                                                                    </div>

                                                                    {order.status === 'paid' && item.delivery_url ? (
                                                                        <a
                                                                            href={item.delivery_url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors shadow"
                                                                        >
                                                                            <Download className="w-3.5 h-3.5" />
                                                                            <span>Download Vault</span>
                                                                        </a>
                                                                    ) : order.status === 'paid' ? (
                                                                        <span className="text-xs text-neutral-400 italic">
                                                                            Dispatched to email
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs text-amber-400/80 font-mono">
                                                                            Awaiting payment
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 py-4 text-xs font-mono text-neutral-500">
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        <span>Loading assets telemetry...</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </SpotlightCard>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
