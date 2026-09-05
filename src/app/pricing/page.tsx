'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  Zap,
  Star,
  ArrowRight,
  Crown,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ShoppingCart
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BookNowModal } from '@/components/booking/BookNowModal';
import { useCart } from '@/contexts/CartContext';
import { servicePlans, automationPricing, pricingFaqs as faqs } from '@/data/pricing';
import { toast } from 'sonner';

export default function PricingPage() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { addItem, setIsOpen } = useCart();

  const handleBookPlan = (planName: string) => {
    setSelectedPlan(`Retainer: ${planName}`);
    setIsBookModalOpen(true);
  };

  const handleAddAutomationToCart = (item: typeof automationPricing[0]) => {
    addItem({
      id: item.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      type: 'one-time',
    });
    toast.success(`Added "${item.name}" to cart`);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-primary-500/30">
      {/* Hero Header */}
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            TRANSPARENT VALUE-BASED PRICING
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
            Predictable Retainers.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
              Unmatched ROI.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
            Scale your content output with a dedicated creative pod, or purchase pre-built automation systems with zero recurring software fees.
          </p>
        </div>
      </section>

      {/* Retainer Service Plans */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
            MONTHLY CREATOR RETAINERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mt-1">
            Dedicated Creative & Automation Pods
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            No long-term contracts. Pause or scale your tier as your channel demands change.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicePlans.map((plan) => (
            <SpotlightCard
              key={plan.name}
              className={`p-6 sm:p-8 flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-primary-500/50 bg-[#090b14] ring-1 ring-primary-500/30 shadow-2xl shadow-primary-950/40'
                  : 'bg-[#08090C]/80 border-white/[0.08]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-primary-600 to-accent text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary-950/80 flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Most Popular Pod
                </div>
              )}

              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  TIER PACKAGE
                </div>
                <h3 className="text-2xl font-bold font-display text-white mt-1">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{plan.description}</p>

                <div className="mt-6 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">/{plan.period}</span>
                  </div>
                </div>

                <div className="py-6 space-y-3">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    INCLUDED DELIVERABLES
                  </div>
                  {plan.features.map((feature) => (
                    <div
                      key={feature.name}
                      className={`flex items-start gap-2.5 text-xs ${
                        feature.included ? 'text-neutral-200' : 'text-neutral-600'
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                      )}
                      <span className={!feature.included ? 'line-through' : ''}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => handleBookPlan(plan.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-600 to-accent text-white shadow-xl shadow-primary-950/60 hover:brightness-110'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  <span>{plan.cta || 'Claim This Tier'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* One-Time Automation Systems */}
      <section className="py-16 md:py-24 border-t border-white/[0.06] bg-[#050608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
              LIFETIME ASSETS • ZERO MONTHLY BILLS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mt-1">
              Ready-to-Deploy AI Systems
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              Instant blueprint downloads, pre-configured n8n JSON nodes, and step-by-step video setup guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationPricing.map((item) => (
              <SpotlightCard
                key={item.name}
                className="p-6 flex flex-col justify-between bg-[#08090C]/90 border-white/[0.08]"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white tracking-tight">{item.name}</h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-emerald-400">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs font-mono text-neutral-500 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-neutral-300">
                    {item.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => handleAddAutomationToCart(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-primary-600 hover:text-white border border-white/[0.1] text-xs font-semibold text-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-bold font-display text-white mt-1">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/[0.08] bg-[#07080C]/80 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-medium text-sm text-neutral-200 font-sans">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/[0.04]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        serviceName={selectedPlan}
      />
    </div>
  );
}
