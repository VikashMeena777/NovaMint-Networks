'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, User, Mail, Phone, ArrowLeft, ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { CheckoutButton } from '@/components/checkout/CheckoutButton';

export default function CheckoutPage() {
    const { items, totalPrice, removeItem, updateQuantity } = useCart();
    const [billingName, setBillingName] = useState('');
    const [billingEmail, setBillingEmail] = useState('');
    const [billingPhone, setBillingPhone] = useState('');

    if (items.length === 0) {
        return (
            <div className="min-h-[75vh] flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center"
                >
                    <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-6 text-primary-400">
                            <ShoppingCart className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold font-display text-white mb-2">Your Cart is Empty</h1>
                        <p className="text-xs text-neutral-400 mb-8 leading-relaxed">
                            Explore our viral creator asset packs, AI workflow templates, and agency growth retainers.
                        </p>
                        <Link href="/products">
                            <button className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg">
                                <span>Browse Digital Products</span>
                                <Sparkles className="w-4 h-4 text-primary-600" />
                            </button>
                        </Link>
                    </SpotlightCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>RETURN TO CATALOG</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-3">
                                <Lock className="w-3 h-3" />
                                <span>End-to-End Encrypted Checkout</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                                Secure Checkout
                            </h1>
                        </div>
                        <div className="text-xs font-mono text-neutral-400">
                            ITEMS IN QUEUE: <span className="text-white font-bold">{items.length}</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Cart Items & Customer Form */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Items Section */}
                            <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
                                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-6 flex items-center justify-between">
                                    <span>Selected Assets</span>
                                    <span className="text-xs text-neutral-500">{items.length} Items</span>
                                </h2>

                                <div className="space-y-4 divide-y divide-white/[0.05]">
                                    {items.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className={`flex items-center justify-between gap-4 ${idx > 0 ? 'pt-4' : ''}`}
                                        >
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-primary-300">
                                                        {item.type === 'subscription' ? 'Monthly Retainer' : 'Instant Download'}
                                                    </span>
                                                    <span className="text-[11px] font-mono text-neutral-500">
                                                        ₹{item.price} each
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    className="px-2.5 py-1.5 rounded-lg border border-white/[0.08] bg-black text-white text-xs font-mono focus:outline-none focus:border-primary-500 cursor-pointer"
                                                >
                                                    {[1, 2, 3, 4, 5].map((n) => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                                <p className="font-mono text-sm font-bold text-white w-20 text-right">
                                                    ₹{item.price * item.quantity}
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SpotlightCard>

                            {/* Billing Intake Form */}
                            <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
                                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-2">
                                    Customer & Delivery Details
                                </h2>
                                <p className="text-xs text-neutral-400 mb-6">
                                    Your digital access credentials and receipt will be dispatched to this email immediately upon settlement.
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                            <input
                                                type="text"
                                                value={billingName}
                                                onChange={(e) => setBillingName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600"
                                                placeholder="e.g. Rahul Sharma"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                            Delivery Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                            <input
                                                type="email"
                                                value={billingEmail}
                                                onChange={(e) => setBillingEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600"
                                                placeholder="rahul@company.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                            WhatsApp / Phone Number (Optional)
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                            <input
                                                type="tel"
                                                value={billingPhone}
                                                onChange={(e) => setBillingPhone(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-5">
                            <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/90 border-white/[0.1] sticky top-28 shadow-2xl">
                                <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-300 mb-6">
                                    Settlement Summary
                                </h2>

                                <div className="space-y-3.5 mb-6 text-xs font-mono">
                                    <div className="flex justify-between text-neutral-400">
                                        <span>SUBTOTAL</span>
                                        <span className="text-white">₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400">
                                        <span>TAX & PROCESSING (GST)</span>
                                        <span className="text-emerald-400">WAIVED (0%)</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-400">
                                        <span>INSTANT DELIVERY</span>
                                        <span className="text-emerald-400">FREE VIA EMAIL</span>
                                    </div>

                                    <div className="border-t border-white/[0.08] pt-4 mt-2">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-sm font-semibold text-neutral-200">TOTAL DUE</span>
                                            <span className="text-2xl font-black font-display text-white tracking-tight">
                                                ₹{totalPrice}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <CheckoutButton
                                    billingName={billingName}
                                    billingEmail={billingEmail}
                                    billingPhone={billingPhone}
                                    disabled={!billingName.trim() || !billingEmail.trim()}
                                />

                                <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-3">
                                    <div className="flex items-center gap-2.5 text-[11px] text-neutral-400">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <span>Cashfree RBI-Authorized Gateway (UPI, Cards, NetBanking)</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-[11px] text-neutral-400">
                                        <Zap className="w-4 h-4 text-primary-400 shrink-0" />
                                        <span>Automated immediate download link & dashboard sync</span>
                                    </div>
                                </div>

                                <p className="text-[10px] text-neutral-500 text-center mt-6">
                                    By proceeding, you agree to NovaMint Networks'{' '}
                                    <Link href="/terms" className="text-neutral-400 underline hover:text-white">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-neutral-400 underline hover:text-white">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </SpotlightCard>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
