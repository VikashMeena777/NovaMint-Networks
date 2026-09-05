'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard, Download, Loader2, ShoppingBag, CheckCircle,
    Clock, XCircle, ShieldCheck, Printer, FileText
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { Order } from '@/lib/types';

export default function BillingPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

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

    const paidOrders = orders.filter((o) => o.status === 'paid');
    const totalSpent = paidOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    const handlePrintInvoice = (order: Order) => {
        const invoiceWindow = window.open('', '_blank');
        if (!invoiceWindow) {
            toast.error('Pop-up blocked. Please allow pop-ups to print the invoice.');
            return;
        }

        const dateStr = new Date(order.created_at).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        invoiceWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice #${order.id.slice(0, 8)} - NovaMint Networks</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; }
                    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
                    .logo { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
                    .logo span { color: #7c3aed; }
                    .tagline { font-size: 11px; color: #666; margin-top: 4px; }
                    .meta { font-size: 13px; line-height: 1.6; }
                    .bill-to { margin-bottom: 30px; font-size: 13px; }
                    .bill-to h4 { margin: 0 0 6px 0; color: #666; text-transform: uppercase; font-size: 11px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th { text-align: left; background: #f9f9f9; padding: 12px; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #ddd; }
                    td { padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; }
                    .total-box { margin-left: auto; width: 280px; text-align: right; }
                    .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
                    .grand-total { font-size: 18px; font-weight: bold; border-top: 2px solid #111; margin-top: 8px; padding-top: 8px; color: #7c3aed; }
                    .stamp { display: inline-block; padding: 6px 12px; background: #ecfdf5; border: 1px solid #10b981; color: #065f46; font-weight: bold; font-size: 12px; border-radius: 4px; margin-top: 20px; }
                    .footer { border-top: 1px solid #eee; margin-top: 40px; padding-top: 20px; font-size: 11px; color: #888; text-align: center; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <div class="logo">NovaMint <span>Networks</span></div>
                        <div class="tagline">Next-Gen Autonomous AI Systems & Creator Growth Agency</div>
                        <div class="meta" style="margin-top: 8px;">support@novamint.in · www.novamint.in</div>
                    </div>
                    <div style="text-align: right;">
                        <h2 style="margin: 0; font-size: 20px;">TAX INVOICE</h2>
                        <div class="meta" style="margin-top: 6px;">
                            <strong>Invoice #:</strong> INV-${order.id.slice(0, 8).toUpperCase()}<br/>
                            <strong>Date:</strong> ${dateStr}<br/>
                            <strong>Gateway ID:</strong> ${order.cashfree_order_id || 'CF_VERIFIED'}
                        </div>
                    </div>
                </div>

                <div class="bill-to">
                    <h4>Billed To:</h4>
                    <strong>${order.billing_name || 'Customer'}</strong><br/>
                    Email: ${order.billing_email || user?.email || 'N/A'}<br/>
                    Phone: ${order.billing_phone || 'N/A'}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Transaction Type</th>
                            <th style="text-align: right;">Amount (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Digital Asset License / Automation Retainer Package</td>
                            <td>One-Time Digital Fulfillment</td>
                            <td style="text-align: right;">₹${order.total}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="total-box">
                    <div class="total-row"><span>Subtotal:</span> <span>₹${order.total}</span></div>
                    <div class="total-row"><span>GST (18% inclusive):</span> <span>₹${Math.round(order.total * 0.18)}</span></div>
                    <div class="total-row grand-total"><span>Total Paid:</span> <span>₹${order.total}</span></div>
                </div>

                <div class="stamp">✓ SETTLED & VERIFIED VIA CASHFREE PAYMENTS</div>

                <div class="footer">
                    Thank you for partnering with NovaMint Networks. This is a computer-generated tax invoice and requires no physical signature.
                </div>

                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
        invoiceWindow.document.close();
        toast.success('Generated printable invoice');
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
            </div>
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
                        Billing & Payment Invoices
                    </h1>
                    <p className="text-xs text-neutral-400">
                        View financial receipts, download compliant GST tax invoices, and track payment status.
                    </p>
                </div>
                <div className="text-xs font-mono text-neutral-400">
                    SETTLED CAPITAL: <span className="text-emerald-400 font-bold">₹{totalSpent.toLocaleString()}</span>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SpotlightCard className="p-5 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Total Invested</span>
                        <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                            <CreditCard className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold font-display text-white">₹{totalSpent.toLocaleString()}</div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">Total settled volume</div>
                </SpotlightCard>

                <SpotlightCard className="p-5 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Successful Receipts</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold font-display text-emerald-400">{paidOrders.length}</div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">Printable invoices available</div>
                </SpotlightCard>

                <SpotlightCard className="p-5 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Processing Security</span>
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold font-display text-white">256-Bit SSL</div>
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">Cashfree RBI-regulated</div>
                </SpotlightCard>
            </div>

            {/* Invoices List */}
            <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
                <h2 className="text-base font-bold font-display text-white mb-6">Payment History</h2>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4 text-neutral-500">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">No Invoices Available</h3>
                        <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto">
                            Invoices will be automatically generated and made available here when you make a purchase.
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
                                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 shrink-0">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-white font-mono">
                                            INV-{order.id.slice(0, 8).toUpperCase()}
                                        </div>
                                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })} · {order.payment_method || 'Cashfree'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <div className="text-right">
                                        <div className="text-sm font-bold font-mono text-white">
                                            ₹{order.total}
                                        </div>
                                        <span className={`inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                                            order.status === 'paid'
                                                ? 'text-emerald-400 bg-emerald-500/10'
                                                : order.status === 'pending'
                                                ? 'text-amber-400 bg-amber-500/10'
                                                : 'text-red-400 bg-red-500/10'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    {order.status === 'paid' ? (
                                        <button
                                            onClick={() => handlePrintInvoice(order)}
                                            className="p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                                            title="Print Tax Invoice"
                                        >
                                            <Printer className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">INVOICE</span>
                                        </button>
                                    ) : (
                                        <div className="w-10 text-center text-xs font-mono text-neutral-600">—</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </SpotlightCard>
        </motion.div>
    );
}
