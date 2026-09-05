'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingCart,
  CreditCard,
  RefreshCw,
  Calendar,
  Layers,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BookNowModal } from '@/components/booking/BookNowModal';
import { useCart } from '@/contexts/CartContext';
import { oneTimeAutomations, subscriptionAutomations } from '@/data/automations';
import type { OneTimeAutomation, SubscriptionAutomation } from '@/data/automations';
import { getIcon } from '@/lib/icon-map';
import { toast } from 'sonner';

export default function AIAutomationsPage() {
  const [activeTab, setActiveTab] = useState<'one-time' | 'subscription'>('one-time');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { addItem, setIsOpen } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const handleAddOneTimeToCart = (automation: OneTimeAutomation, openDrawer = true) => {
    addItem({
      id: automation.id,
      name: automation.name,
      price: automation.price,
      originalPrice: automation.originalPrice,
      type: 'one-time',
    });
    toast.success(`Added "${automation.name}" to cart`);
    if (openDrawer) setIsOpen(true);
  };

  const handleAddSubscriptionToCart = (automation: SubscriptionAutomation, openDrawer = true) => {
    const price = billingCycle === 'monthly' ? automation.monthlyPrice : Math.round(automation.yearlyPrice / 12);
    addItem({
      id: `${automation.id}-${billingCycle}`,
      name: `${automation.name} (${billingCycle === 'monthly' ? 'Monthly' : 'Annual'})`,
      price,
      type: 'subscription',
      billingCycle,
    });
    toast.success(`Added "${automation.name}" subscription to cart`);
    if (openDrawer) setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-primary-500/30">
      {/* Hero Header */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
            <Bot className="w-3.5 h-3.5 text-accent" />
            AUTONOMOUS AGENT PIPELINES & WORKFLOWS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
            Automate Your Entire Content Engine with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
              AI Agents.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate 85% of editing, repurposing, transcription, and scheduling overhead. 
            Choose self-hosted one-time blueprints or fully-managed monthly agency retainers.
          </p>

          {/* Telemetry Metrics */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary-400" />
              <span className="text-white font-bold">500+</span> Automations Deployed
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-white font-bold">10,000+</span> Hours Saved Monthly
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-bold">100%</span> Private & Secure
            </div>
          </div>
        </div>
      </section>

      {/* Model Selection Tabs - Clean sticky bar without 160px gap */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#06070a]/90 backdrop-blur-xl border-b border-white/[0.08] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('one-time')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'one-time'
                ? 'bg-white text-black shadow-lg shadow-white/10'
                : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>One-Time Purchase (DIY Blueprints)</span>
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'subscription'
                ? 'bg-white text-black shadow-lg shadow-white/10'
                : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Fully-Managed Agency Retainers</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {activeTab === 'one-time' ? (
          <div>
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Self-Hosted n8n & Python Blueprints
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Download ready-to-import JSON nodes, environment templates, and step-by-step video setup guides. You own the code forever.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {oneTimeAutomations.map((automation) => {
                const IconComponent = getIcon(automation.icon);

                return (
                  <SpotlightCard
                    key={automation.id}
                    className="p-6 sm:p-8 flex flex-col justify-between bg-[#08090C]/80 border-white/[0.08]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {automation.tag && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-primary-500/15 text-primary-300 border border-primary-500/30">
                            {automation.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold font-display text-white tracking-tight">
                        {automation.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                        {automation.description}
                      </p>

                      <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold font-mono text-emerald-400">
                          ₹{automation.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-mono text-neutral-500 line-through">
                          ₹{automation.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-mono text-primary-300 ml-1">
                          ({Math.round((1 - automation.price / automation.originalPrice) * 100)}% OFF)
                        </span>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                        <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                          WHAT IS INCLUDED
                        </div>
                        {automation.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center gap-3">
                      <button
                        onClick={() => handleAddOneTimeToCart(automation, false)}
                        className="flex-1 py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => handleAddOneTimeToCart(automation, true)}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-semibold text-xs shadow-lg shadow-primary-950/60 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Buy & Download</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Fully-Managed Enterprise Automations
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                We build, host, monitor, and maintain your workflows on our cloud servers. Zero technical maintenance for your team.
              </p>

              {/* Billing Cycle Switcher */}
              <div className="mt-6 inline-flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    billingCycle === 'monthly' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    billingCycle === 'yearly' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                    SAVE 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {subscriptionAutomations.map((automation) => {
                const IconComponent = getIcon(automation.icon);
                const price = billingCycle === 'monthly' ? automation.monthlyPrice : Math.round(automation.yearlyPrice / 12);

                return (
                  <SpotlightCard
                    key={automation.id}
                    className="p-6 sm:p-8 flex flex-col justify-between bg-[#08090C]/80 border-white/[0.08]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        {automation.popular && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-accent/15 text-accent border border-accent/30">
                            POPULAR SLA
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold font-display text-white tracking-tight">
                        {automation.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                        {automation.description}
                      </p>

                      <div className="mt-6 flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold font-mono text-white">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">/ month</span>
                        {billingCycle === 'yearly' && (
                          <span className="text-[11px] font-mono text-emerald-400 ml-2">
                            (Billed ₹{automation.yearlyPrice.toLocaleString('en-IN')}/yr)
                          </span>
                        )}
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                        <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                          MANAGED SLA SERVICES
                        </div>
                        {automation.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center gap-3">
                      <button
                        onClick={() => handleAddSubscriptionToCart(automation, true)}
                        className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Subscribe Now</span>
                      </button>

                      <button
                        onClick={() => handleBookNow(`Managed Automation: ${automation.name}`)}
                        className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-neutral-300 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Discuss SLA</span>
                      </button>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <BookNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}
