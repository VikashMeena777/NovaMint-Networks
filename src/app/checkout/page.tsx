'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, User, Mail, Phone, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button, Card, Badge } from '@/components/ui';
import { CheckoutButton } from '@/components/checkout/CheckoutButton';

export default function CheckoutPage() {
    const { items, totalPrice, removeItem, updateQuantity } = useCart();
    const [billingName, setBillingName] = useState('');
    const [billingEmail, setBillingEmail] = useState('');
    const [billingPhone, setBillingPhone] = useState('');

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                    <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">
                        Add some automations to get started
                    </p>
                    <Link href="/ai-automations">
                        <Button>Browse Automations</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link
                        href="/ai-automations"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>

                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-6">Your Cart ({items.length})</h2>

                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-border"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant={item.type === 'subscription' ? 'primary' : 'default'}>
                                                        {item.type === 'subscription' ? 'Monthly' : 'One-time'}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <select
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    className="px-3 py-1 rounded border border-border bg-background"
                                                >
                                                    {[1, 2, 3, 4, 5].map((n) => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                                <p className="font-bold w-20 text-right">₹{item.price * item.quantity}</p>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Billing Details */}
                            <Card className="p-6 mt-6">
                                <h2 className="text-xl font-bold mb-6">Billing Details</h2>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name *</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={billingName}
                                                onChange={(e) => setBillingName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="email"
                                                value={billingEmail}
                                                onChange={(e) => setBillingEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="you@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="tel"
                                                value={billingPhone}
                                                onChange={(e) => setBillingPhone(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Tax</span>
                                        <span>₹0</span>
                                    </div>
                                    <div className="border-t border-border pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>₹{totalPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                <CheckoutButton
                                    billingName={billingName}
                                    billingEmail={billingEmail}
                                    billingPhone={billingPhone}
                                    disabled={!billingName || !billingEmail}
                                />

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    By proceeding, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
