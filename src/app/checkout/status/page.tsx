'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Loader2, ArrowRight, Home } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/types';

function CheckoutStatusContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkOrderStatus() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const supabase = getSupabaseClient();

      let attempts = 0;
      const maxAttempts = 6;
      const interval = 3000;

      const poll = async () => {
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (data) {
          setOrder(data);
          if (data.status !== 'pending') {
            setLoading(false);
            return;
          }
        }

        attempts++;

        if (attempts < maxAttempts) {
          setTimeout(poll, interval);
        } else {
          try {
            const res = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ order_id: orderId }),
            });
            if (res.ok) {
              const result = await res.json();
              if (result.order) {
                setOrder(result.order);
              }
            }
          } catch {
            // keep existing status
          }
          setLoading(false);
        }
      };

      poll();
    }

    checkOrderStatus();
  }, [orderId]);

  const getStatusContent = () => {
    if (loading) {
      return {
        icon: <Loader2 className="w-14 h-14 animate-spin text-primary-400" />,
        title: 'Verifying Gateway Transaction...',
        description: 'Please wait while we confirm your payment telemetry with Cashfree.',
        color: 'text-primary-300',
      };
    }

    if (!order) {
      return {
        icon: <XCircle className="w-14 h-14 text-red-400" />,
        title: 'Order Record Not Found',
        description: 'We could not locate this transaction ID. If money was debited, contact support with your UPI reference.',
        color: 'text-red-400',
      };
    }

    switch (order.status) {
      case 'paid':
        return {
          icon: <CheckCircle className="w-14 h-14 text-emerald-400" />,
          title: 'Payment Confirmed & Verified!',
          description: 'Your digital download link has been dispatched to your email.',
          color: 'text-emerald-400',
        };
      case 'failed':
        return {
          icon: <XCircle className="w-14 h-14 text-red-400" />,
          title: 'Transaction Declined',
          description: 'Your payment could not be processed by your issuing bank. No funds were debited.',
          color: 'text-red-400',
        };
      default:
        return {
          icon: <Clock className="w-14 h-14 text-amber-400" />,
          title: 'Payment Awaiting Settlement',
          description: 'Payment is processing. You will receive an instant email as soon as settlement is confirmed.',
          color: 'text-amber-400',
        };
    }
  };

  const content = getStatusContent();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <SpotlightCard className="p-8 text-center bg-[#08090C]/90 border-white/[0.1] shadow-2xl">
          <div className="flex justify-center mb-6">{content.icon}</div>
          <h1 className={`text-2xl font-bold font-display mb-2 ${content.color}`}>
            {content.title}
          </h1>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">{content.description}</p>

          {order && (
            <div className="bg-black/40 rounded-xl p-4 mb-6 text-left border border-white/[0.06] font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order ID:</span>
                <span className="text-white font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Settled:</span>
                <span className="text-emerald-400 font-bold">₹{order.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status:</span>
                <span className="uppercase text-primary-300 font-semibold">{order.status}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {order?.status === 'paid' && (
              <Link href="/dashboard/orders">
                <button className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2">
                  <span>View Downloads in Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            )}
            {order?.status === 'failed' && (
              <Link href="/checkout">
                <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-bold text-xs shadow-lg transition-all cursor-pointer">
                  Try Again
                </button>
              </Link>
            )}
            <Link href="/">
              <button className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-neutral-300 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Home className="w-3.5 h-3.5" />
                <span>Return to Homepage</span>
              </button>
            </Link>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[75vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutStatusContent />
    </Suspense>
  );
}
