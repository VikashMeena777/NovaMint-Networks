'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

function CheckoutFailedContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

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
            className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-6 text-red-400"
          >
            <XCircle className="w-9 h-9" />
          </motion.div>

          <h1 className="text-3xl font-extrabold font-display tracking-tight text-white mb-2">
            Payment Incomplete
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
            The transaction was declined or interrupted before completion. No charges were made to your account.
          </p>

          {orderId && (
            <div className="bg-black/40 rounded-xl p-4 mb-6 text-left border border-white/[0.06] font-mono text-xs">
              <span className="text-neutral-500">Failed Reference:</span>
              <p className="font-semibold text-neutral-300 mt-0.5 break-all">{orderId}</p>
            </div>
          )}

          <div className="space-y-2 text-left mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-400">
            <h3 className="font-semibold text-white mb-1">Common causes:</h3>
            <p>• Bank UPI server timeout or daily transaction limit reached.</p>
            <p>• Card 3D Secure OTP expired before confirmation.</p>
            <p>• Window closed before gateway returned settlement status.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/checkout" className="flex-1">
              <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer">
                <RefreshCw className="w-4 h-4" />
                <span>Retry Payment</span>
              </button>
            </Link>

            <Link href="/contact" className="flex-1">
              <button className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-neutral-300 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <HelpCircle className="w-4 h-4" />
                <span>Contact Support</span>
              </button>
            </Link>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}

export default function CheckoutFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutFailedContent />
    </Suspense>
  );
}
