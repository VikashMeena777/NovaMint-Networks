'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui';

export function CartDrawer() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="w-6 h-6 text-primary" />
                                <h2 className="text-xl font-bold">Your Cart</h2>
                                {totalItems > 0 && (
                                    <span className="px-2 py-1 text-sm bg-primary/20 text-primary rounded-full">
                                        {totalItems} item{totalItems !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Add some awesome automations to get started!
                                    </p>
                                    <Button onClick={() => setIsOpen(false)}>
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="p-4 bg-muted rounded-xl border border-border"
                                        >
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1">
                                                    <h3 className="font-medium mb-1">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.type === 'one-time' ? 'One-Time Purchase' : `Subscription (${item.billingCycle})`}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1.5 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1.5 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <span className="text-lg font-bold">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-border space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-2xl font-bold">₹{totalPrice.toLocaleString()}</span>
                                </div>

                                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                    <Button size="lg" className="w-full gap-2">
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>

                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={clearCart}
                                        className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
