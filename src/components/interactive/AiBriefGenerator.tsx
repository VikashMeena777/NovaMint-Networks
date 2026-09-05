'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Loader2,
  TrendingUp,
  Clock,
  Layers,
  Building2,
  RefreshCw,
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BookNowModal } from '@/components/booking/BookNowModal';
import { toast } from 'sonner';

interface GeneratedPlan {
  title: string;
  summary: string;
  coreArchitecture: string;
  deliverables: string[];
  hoursSavedPerMonth: number;
  estimatedAnnualSavings: string;
  recommendedRetainer: string;
  nextSteps: string;
}

export function AiBriefGenerator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [niche, setNiche] = useState('creator');
  const [goal, setGoal] = useState('reels');
  const [volume, setVolume] = useState('30');
  const [bottleneck, setBottleneck] = useState('slow_turnaround');
  const [brandName, setBrandName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [handle, setHandle] = useState('');

  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail) {
      toast.error('Please enter your work email to receive the proposal');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ai/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          goal,
          volume,
          bottleneck,
          brandName,
          workEmail,
          handle,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate proposal');
      }

      setGeneratedPlan(data.plan);
      setStep(4);
      toast.success('Your Custom AI Blueprint is Ready!');
    } catch (err: any) {
      console.error('Brief generation failed:', err);
      toast.error(err.message || 'Failed to formulate proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          INTERACTIVE AI SCOPE & STRATEGY CONSULTANT
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
          Formulate Your Custom Growth Architecture
        </h3>
        <p className="text-sm md:text-base text-neutral-400 mt-2">
          Answer 3 brief questions to receive an audited operational blueprint, projected annual hours saved, and tailored retainer scope in 3 seconds.
        </p>

        {/* Step Progress Pills */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`h-1.5 rounded-full transition-all ${
                step === num
                  ? 'w-8 bg-gradient-to-r from-primary-500 to-accent'
                  : step > num
                  ? 'w-4 bg-emerald-500'
                  : 'w-4 bg-white/[0.08]'
              }`}
            />
          ))}
        </div>
      </div>

      <SpotlightCard className="max-w-3xl mx-auto p-6 md:p-10 bg-[#08090C]/90 border-white/[0.08] relative overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          {/* STEP 1: NICHE & INDUSTRY */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-mono uppercase text-primary-400 tracking-wider">
                  STEP 01 / 03
                </span>
                <h4 className="text-xl font-bold font-display text-white mt-1">
                  What is your primary industry or brand model?
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'creator', label: 'High-Ticket Creator / Influencer', desc: 'YouTube, Podcasts, Personal Brand Reels' },
                  { id: 'ecom', label: 'E-Commerce & D2C Brands', desc: 'Product Reels, UGC Scaling, TikTok Ads' },
                  { id: 'saas', label: 'B2B SaaS & Tech Ventures', desc: 'Feature Demos, Thought Leadership, Leads' },
                  { id: 'realestate', label: 'Luxury Real Estate & Finance', desc: 'Cinematic Tours, WhatsApp Lead Inbound' },
                  { id: 'agency', label: 'Marketing & Digital Agencies', desc: 'White-Label Editing Pods & Automations' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setNiche(item.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      niche === item.id
                        ? 'bg-primary-500/15 border-primary-500/40 text-white shadow-lg shadow-primary-950/40'
                        : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-6 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Objectives</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: GOALS & VOLUME */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-mono uppercase text-primary-400 tracking-wider">
                  STEP 02 / 03
                </span>
                <h4 className="text-xl font-bold font-display text-white mt-1">
                  What is your primary growth target and target output?
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Primary Strategic Objective
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'reels', label: '10x Viral Reels & Short-Form Organic Reach' },
                      { id: 'leads', label: 'Automated CRM & WhatsApp Inbound Funnel' },
                      { id: 'editing', label: 'Fully Outsourced Turnkey Video Studio' },
                      { id: 'cold_outreach', label: 'Multi-Agent Automated Cold Outreach' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGoal(item.id)}
                        className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          goal === item.id
                            ? 'bg-primary-500/20 border-primary-500/40 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Desired Monthly Output
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: '10', label: '10-15 / mo' },
                      { id: '30', label: '30 / mo (Standard)' },
                      { id: '60', label: '60 / mo (Hyper)' },
                      { id: 'enterprise', label: '100+ Enterprise' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setVolume(item.id)}
                        className={`text-center py-2.5 px-2 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer ${
                          volume === item.id
                            ? 'bg-accent/20 border-accent/40 text-accent'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-300 font-semibold text-xs hover:bg-white/[0.08] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="py-3 px-6 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: BOTTLENECK & CONTACT */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-mono uppercase text-primary-400 tracking-wider">
                  STEP 03 / 03
                </span>
                <h4 className="text-xl font-bold font-display text-white mt-1">
                  Where should we synthesize your proposal?
                </h4>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Biggest Current Production Bottleneck
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'slow_turnaround', label: 'Manual editing takes 3-5 days per video' },
                      { id: 'lead_drop', label: 'Slow inbound lead response time' },
                      { id: 'consistency', label: 'Inconsistent posting & burnout' },
                      { id: 'high_cost', label: 'High editor salaries with low ROI' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setBottleneck(item.id)}
                        className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          bottleneck === item.id
                            ? 'bg-primary-500/20 border-primary-500/40 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Brand / Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Media Co."
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-300 block mb-1">
                      Instagram or Website Handle
                    </label>
                    <input
                      type="text"
                      placeholder="@acmemedia"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-300 block mb-1">
                    Work Email (Required for Brief Delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@yourdomain.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-neutral-300 font-semibold text-xs hover:bg-white/[0.08] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white font-semibold text-xs shadow-xl shadow-primary-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Synthesizing Architecture...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate My Custom Blueprint</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4: GENERATED EXECUTIVE BLUEPRINT */}
          {step === 4 && generatedPlan && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>AUDITED STRATEGY PROPOSAL</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    {generatedPlan.title}
                  </h4>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-configure</span>
                </button>
              </div>

              {/* Core System Card */}
              <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/25">
                <div className="text-[11px] font-mono text-primary-300 uppercase tracking-wider">
                  RECOMMENDED CORE ARCHITECTURE
                </div>
                <div className="text-base font-bold font-display text-white mt-1">
                  {generatedPlan.coreArchitecture}
                </div>
                <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                  {generatedPlan.summary}
                </p>
              </div>

              {/* High Impact Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    Monthly Time Saved
                  </div>
                  <div className="text-xl font-bold font-display text-white mt-0.5">
                    {generatedPlan.hoursSavedPerMonth} hrs
                  </div>
                  <div className="text-[10px] text-neutral-500">Autonomous workflow</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    Projected Savings
                  </div>
                  <div className="text-xl font-bold font-display text-emerald-400 mt-0.5">
                    {generatedPlan.estimatedAnnualSavings}
                  </div>
                  <div className="text-[10px] text-neutral-500">Capital liberated</div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    Recommended Tier
                  </div>
                  <div className="text-xs font-bold text-accent mt-1 leading-snug">
                    {generatedPlan.recommendedRetainer}
                  </div>
                </div>
              </div>

              {/* Deliverables List */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
                  Pipeline Deliverables & Integrations
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {generatedPlan.deliverables.map((deliv, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-neutral-300 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <Zap className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Bar */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-neutral-400">
                  A copy of this operational brief has been assigned to our Technical Director.
                </div>

                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white font-bold text-xs shadow-xl shadow-primary-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Strategy Session</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SpotlightCard>

      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        serviceName={generatedPlan?.recommendedRetainer || 'Autonomous AI Agency Retainer'}
      />
    </div>
  );
}
