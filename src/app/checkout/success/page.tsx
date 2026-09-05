'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, Download, Home, Sparkles } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <SpotlightCard className="p-8 sm:p-10 text-center bg-[#08090C]/90 border-white/[0.1] shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
            className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-400"
          >
            <CheckCircle2 className="w-9 h-9" />
          </motion.div>

          <h1 className="text-3xl font-extrabold font-display tracking-tight text-white mb-2">
            Payment Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
            Your transaction has settled successfully. Your digital access keys and download links have been delivered to your email.
          </p>

          {orderId && (
            <div className="bg-black/40 rounded-xl p-4 mb-6 text-left border border-white/[0.06] font-mono text-xs">
              <span className="text-neutral-500">Order Reference:</span>
              <p className="font-semibold text-primary-300 mt-0.5 break-all">{orderId}</p>
            </div>
          )}

          <div className="space-y-3 mb-8 text-left text-xs font-sans">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Package className="w-5 h-5 text-primary-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Instant Email Dispatch</p>
                <p className="text-neutral-400 text-[11px]">
                  Check your inbox for direct Google Drive / cloud download access.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Download className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Dashboard Download Access</p>
                <p className="text-neutral-400 text-[11px]">
                  View and re-download your assets anytime in your account portal.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/orders" className="flex-1">
              <button className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10">
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link href="/" className="flex-1">
              <button className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-neutral-300 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            </Link>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
