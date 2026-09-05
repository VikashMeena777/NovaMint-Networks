'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CreditCard, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface CheckoutButtonProps {
  billingName: string;
  billingEmail: string;
  billingPhone: string;
  disabled?: boolean;
}

export function CheckoutButton({
  billingName,
  billingEmail,
  billingPhone,
  disabled = false,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const loadCashfreeScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as unknown as { Cashfree?: unknown }).Cashfree) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!billingName.trim() || !billingEmail.trim()) {
      toast.error('Please enter your full name and email for order receipt & digital delivery.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billingEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Load Cashfree SDK
      const loaded = await loadCashfreeScript();
      if (!loaded) {
        toast.error('Failed to connect to Cashfree payment gateway. Check your internet connection.');
        setLoading(false);
        return;
      }

      // Create order on server
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type,
          })),
          billing_name: billingName,
          billing_email: billingEmail,
          billing_phone: billingPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment session');
      }

      // Initialize Cashfree drop-in checkout
      type CashfreeInstance = {
        checkout: (options: { paymentSessionId: string; redirectTarget: string }) => Promise<{
          error?: unknown;
          redirect?: boolean;
          paymentDetails?: unknown;
        }>;
      };

      const cashfreeFactory = (window as unknown as { Cashfree: (opts: { mode: string }) => CashfreeInstance }).Cashfree;
      const cashfree = cashfreeFactory({
        mode: data.environment === 'production' ? 'production' : 'sandbox',
      });

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: '_self',
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.error('Cashfree checkout error:', result.error);
          router.push(`/checkout/failed?order_id=${data.orderId}`);
        }
        if (result.redirect) {
          // Payment will redirect, clear cart
          clearCart();
        }
        if (result.paymentDetails) {
          clearCart();
          router.push(`/checkout/success?order_id=${data.orderId}`);
        }
      });
    } catch (error: unknown) {
      console.error('Checkout error:', error);
      const msg = error instanceof Error ? error.message : 'Payment initiation failed. Please try again.';
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading || items.length === 0}
      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white font-bold text-sm shadow-xl shadow-primary-950/60 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Connecting to Secure Gateway...</span>
        </>
      ) : (
        <>
          <Lock className="w-4 h-4 text-emerald-300" />
          <span>Pay ₹{totalPrice.toLocaleString('en-IN')} Securely</span>
        </>
      )}
    </button>
  );
}
