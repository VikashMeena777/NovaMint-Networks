'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#08090C] border-l border-white/[0.1] z-50 flex flex-col shadow-2xl shadow-black"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center text-primary-400">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                    Your Order Cart
                  </h2>
                  <p className="text-[11px] font-mono text-neutral-400">
                    {totalItems} item{totalItems !== 1 ? 's' : ''} queued
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-500 mb-4">
                    <ShoppingCart className="w-8 h-8 stroke-1" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    Your cart is currently empty
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs mb-6">
                    Unlock explosive social reach with our battle-tested ₹99 Reels Bundles or ready-made n8n workflows.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold shadow-lg shadow-primary-950/50 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Browse Digital Bundles
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.12] transition-all"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white tracking-tight line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="inline-block mt-0.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            {item.type === 'one-time' ? 'Instant Digital Download' : `Retainer (${item.billingCycle || 'monthly'})`}
                          </span>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
                        <div className="flex items-center gap-1.5 bg-black/40 rounded-lg p-0.5 border border-white/[0.06]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-bold font-mono text-white">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-white/[0.08] bg-[#050608] space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono uppercase text-neutral-400">Order Subtotal</span>
                  <span className="text-2xl font-extrabold font-display text-white">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white font-semibold text-sm shadow-xl shadow-primary-950/60 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Access</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
