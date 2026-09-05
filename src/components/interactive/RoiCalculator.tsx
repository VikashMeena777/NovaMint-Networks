'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  IndianRupee,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  Briefcase,
  Zap,
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BookNowModal } from '@/components/booking/BookNowModal';

export function RoiCalculator() {
  const [tierMode, setTierMode] = useState<'creator' | 'agency'>('agency');
  const [teamSize, setTeamSize] = useState<number>(4);
  const [videosPerMonth, setVideosPerMonth] = useState<number>(30);
  const [hoursPerVideo, setHoursPerVideo] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(2500);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);

  const stats = useMemo(() => {
    // Total hours team spends currently
    const baseHours = videosPerMonth * hoursPerVideo;
    const teamMultiplier = Math.max(1, 1 + (teamSize - 1) * 0.25);
    const totalManualHours = Math.round(baseHours * teamMultiplier);

    // NovaMint autonomous pipelines save 85% of repetitive editing, captioning, reframing & posting
    const automatedHoursSaved = Math.round(totalManualHours * 0.85);

    // Capital saved via executive/editor time liberation
    const monthlyLaborSaved = automatedHoursSaved * hourlyRate;
    // Internal tooling overhead saved per team member (₹8,000/seat/mo on plugins, render farms, stock)
    const toolOverheadSaved = teamSize * 6000;
    const monthlyCapitalSaved = monthlyLaborSaved + toolOverheadSaved;
    const yearlyCapitalSaved = monthlyCapitalSaved * 12;

    // Average NovaMint Growth Retainer
    const estimatedCost = tierMode === 'creator' ? 24999 : 49999;
    const dailySavings = monthlyCapitalSaved / 30;
    const paybackDays = Math.max(2, Math.min(45, Math.round(estimatedCost / dailySavings)));

    return {
      totalManualHours,
      automatedHoursSaved,
      monthlyCapitalSaved,
      yearlyCapitalSaved,
      paybackDays,
      contentMultiplier: Math.round((automatedHoursSaved / (hoursPerVideo || 1))),
    };
  }, [tierMode, teamSize, videosPerMonth, hoursPerVideo, hourlyRate]);

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          ESTIMATE YOUR TIME & REVENUE MULTIPLIER
        </div>
        <h3 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
          What Is Inefficient Production Costing You?
        </h3>
        <p className="text-sm md:text-base text-neutral-400 mt-2">
          Adjust the sliders below to calculate how many executive hours and capital NovaMint’s autonomous AI workflows unlock for your organization.
        </p>

        {/* Mode Selector */}
        <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] mt-6 gap-1">
          <button
            onClick={() => {
              setTierMode('creator');
              setTeamSize(1);
              setVideosPerMonth(15);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tierMode === 'creator'
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Creator / Solo Founder</span>
          </button>
          <button
            onClick={() => {
              setTierMode('agency');
              setTeamSize(5);
              setVideosPerMonth(35);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tierMode === 'agency'
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Agency & Enterprise Studio</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Sliders Area (Col 7) */}
        <div className="lg:col-span-7 bg-[#08090C]/90 rounded-2xl border border-white/[0.08] p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Slider 0: Team Size (If agency or multi-person) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Content & Operations Team Size
                </label>
                <span className="font-mono font-bold text-sm text-cyan-400 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  {teamSize} {teamSize === 1 ? 'member' : 'members'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                <span>1 (Solo)</span>
                <span>10 (Agency)</span>
                <span>25 (Enterprise)</span>
              </div>
            </div>

            {/* Slider 1: Videos per Month */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary-400" />
                  Videos / Reels Produced Monthly
                </label>
                <span className="font-mono font-bold text-sm text-primary-300 px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20">
                  {videosPerMonth} videos
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="90"
                step="1"
                value={videosPerMonth}
                onChange={(e) => setVideosPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary-500 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                <span>5 / mo</span>
                <span>45 / mo</span>
                <span>90 / mo</span>
              </div>
            </div>

            {/* Slider 2: Hours per video */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Hours Spent Per Video (Manual Production)
                </label>
                <span className="font-mono font-bold text-sm text-accent px-3 py-1 rounded-lg bg-accent/10 border border-accent/20">
                  {hoursPerVideo} hrs / video
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={hoursPerVideo}
                onChange={(e) => setHoursPerVideo(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                <span>1 hr (Raw)</span>
                <span>6 hrs (Average)</span>
                <span>12 hrs (High Polish)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Value */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                  Average Hourly Cost / Value of Time
                </label>
                <span className="font-mono font-bold text-sm text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  ₹{hourlyRate.toLocaleString('en-IN')}/hr
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-1">
                <span>₹500/hr</span>
                <span>₹5,000/hr</span>
                <span>₹10,000/hr</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-2 text-xs text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Based on audited time-tracking across 40+ creator pipelines and studio teams managed by NovaMint.</span>
          </div>
        </div>

        {/* Output Metrics Card (Col 5) */}
        <div className="lg:col-span-5">
          <SpotlightCard className="p-6 md:p-8 h-full flex flex-col justify-between border-primary-500/30 bg-gradient-to-br from-[#0D0B18] via-[#08090E] to-[#040507]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
                  AUDITED AGENCY PROJECTION
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
                  85% EFFICIENCY GAIN
                </span>
              </div>

              <div className="mt-4 pb-6 border-b border-white/[0.08]">
                <div className="text-xs text-neutral-400 uppercase tracking-wider font-mono">
                  Monthly Capital Liberated
                </div>
                <div className="text-3xl md:text-4xl font-extrabold font-display text-white mt-1">
                  ₹{stats.monthlyCapitalSaved.toLocaleString('en-IN')}
                  <span className="text-sm font-normal text-neutral-400 ml-1">/ month</span>
                </div>
                <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>≈ ₹{stats.yearlyCapitalSaved.toLocaleString('en-IN')} annualized savings</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-b border-white/[0.08]">
                <div>
                  <div className="text-xs text-neutral-400 uppercase font-mono">Hours Saved</div>
                  <div className="text-2xl font-bold font-display text-white mt-0.5">
                    {stats.automatedHoursSaved} <span className="text-xs font-normal text-neutral-400">hrs/mo</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    ≈ {Math.round(stats.automatedHoursSaved / 8)} full working days
                  </div>
                </div>

                <div>
                  <div className="text-xs text-neutral-400 uppercase font-mono">Est. Payback</div>
                  <div className="text-2xl font-bold font-display text-emerald-400 mt-0.5">
                    {stats.paybackDays} <span className="text-xs font-normal text-neutral-400">days</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">Break-even threshold</div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white font-semibold text-sm shadow-xl shadow-primary-950/50 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Automate My Content Workflow</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-neutral-500 font-mono">
                Complimentary 1-on-1 operational audit included
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        serviceName="AI Content Automation Pipeline"
      />
    </div>
  );
}
