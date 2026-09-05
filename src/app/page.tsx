'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Sparkles,
  Star,
  CheckCircle2,
  ChevronRight,
  Zap,
  Activity,
  Cpu,
  Layers,
  Share2,
  TrendingUp,
  ShieldCheck,
  Video,
  Clock,
  Award,
  BarChart3,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { WorkflowVisualizer } from '@/components/interactive/WorkflowVisualizer';
import { RoiCalculator } from '@/components/interactive/RoiCalculator';
import { BookNowModal } from '@/components/booking/BookNowModal';
import {
  heroStats,
  trustedPlatforms,
  impactStats,
  homeServices,
  whyUsFeatures,
} from '@/data/homepage';
import { testimonials } from '@/data/testimonials';

// Animated Counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  const fmt = (n: number) => (n >= 10000 ? `${(n / 1000).toFixed(0)}K` : n.toLocaleString());

  return (
    <span ref={ref} className="font-mono">
      {fmt(count)}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('AI Automation Consultation');
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const handleOpenBookModal = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookModalOpen(true);
  };

  return (
    <div className="relative overflow-hidden bg-[#030407] text-white selection:bg-primary-500/30 selection:text-white">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-primary-600/15 via-accent/5 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-[30%] -left-64 w-96 h-96 bg-primary-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-[60%] -right-64 w-96 h-96 bg-accent/10 blur-[120px]" />

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top telemetry pill */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl text-xs font-mono text-neutral-300 shadow-xl shadow-black/40"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>10M+ ORGANIC VIEWS ENGINEERED</span>
              <span className="text-neutral-600">•</span>
              <span className="text-primary-400 font-semibold">Q2 COHORT OPEN</span>
            </motion.div>
          </div>

          {/* Massive Display Headline */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display tracking-tight text-white leading-[1.05]"
            >
              The Autonomous Studio for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
                High-Output Creators.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              We pair elite human cinematic video editors with autonomous multi-agent AI pipelines. 
              Turn raw recordings into 30+ viral short-form assets, scheduled and distributed across every channel.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => handleOpenBookModal('High-Retention Video Editing & AI Growth')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-xl shadow-white/10 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Strategy Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#pipeline-demo"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-xl"
              >
                <Cpu className="w-4 h-4 text-primary-400" />
                <span>Explore AI Workflows</span>
              </a>
            </motion.div>

            {/* Trust Signals Under CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sub-24 Hour First Cut SLA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Creative Pod
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% IP & Asset Ownership
              </span>
            </div>
          </div>

          {/* Live Studio Preview / Audio Waveform Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border border-white/[0.12] bg-[#07080C]/90 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/80">
              {/* Fake DAW / Studio Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-3 font-mono text-neutral-400 font-medium hidden sm:inline">
                    PROJECT: EPISODE_94_MASTER_CUT.NVM
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    AUTOPILOT RENDERING
                  </span>
                  <span className="text-neutral-500">4K • 60 FPS • ProRes</span>
                </div>
              </div>

              {/* Central Audio Waveform & Clip timeline mockup */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 bg-black/50 rounded-xl p-4 border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-neutral-400">
                    <span>TRACK 01: AUDIO TRANSCRIBED & HOOKS EXTRACTED</span>
                    <span className="text-primary-400 font-bold">VIRAL SCORE: 98/100</span>
                  </div>

                  {/* Simulated Waveform Bars */}
                  <div className="h-14 flex items-center gap-1 overflow-hidden">
                    {[40, 65, 30, 85, 95, 45, 60, 80, 100, 75, 45, 90, 85, 35, 70, 95, 60, 40, 85, 100, 70, 50, 90, 65, 45, 80, 95, 70, 40, 60, 90, 100, 80, 50, 75, 95, 60, 45, 85, 90, 65, 40, 70, 95, 80, 60].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          i > 15 && i < 30
                            ? 'bg-gradient-to-t from-primary-600 to-accent'
                            : 'bg-white/15'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  {/* Subtitle Telemetry Pill */}
                  <div className="mt-3 flex items-center justify-between text-xs font-mono bg-white/[0.03] p-2.5 rounded-lg border border-white/[0.04]">
                    <span className="text-neutral-300">
                      &quot;The #1 mistake 99% of creators make when scripting short-form...&quot;
                    </span>
                    <span className="text-accent text-[10px] uppercase font-bold shrink-0 ml-2">
                      HOOK PINPOINTED (00:02.40)
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[11px] font-mono text-neutral-400">TURNAROUND LATENCY</div>
                    <div className="text-xl font-bold font-display text-white mt-0.5">18h 42m</div>
                    <div className="text-[10px] text-emerald-400 font-mono">5h 18m ahead of SLA</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[11px] font-mono text-neutral-400">REPURPOSED VARIANTS</div>
                    <div className="text-xl font-bold font-display text-white mt-0.5">14 Shorts & Reels</div>
                    <div className="text-[10px] text-primary-400 font-mono">Queued for automated publish</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF LOGO MARQUEE ===== */}
      <section className="py-12 border-y border-white/[0.06] bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 mb-6">
            ENGINEERING ATTENTION FOR ELITE CREATORS ACROSS MAJOR PLATFORMS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-70">
            {trustedPlatforms.map((platform) => (
              <div key={platform} className="flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-white transition-colors">
                <span className="font-display tracking-tight text-base text-neutral-200">{platform}</span>
                <span className="text-[10px] font-mono text-primary-400">●</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4-COLUMN ASYMMETRIC BENTO GRID ===== */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-3">
              <Layers className="w-3.5 h-3.5 text-accent" />
              THE NOVAMINT INFRASTRUCTURE
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white">
              Engineered for Maximum Virality & Zero Creator Burnout.
            </h2>
            <p className="text-sm md:text-base text-neutral-400 mt-3">
              We replaced traditional, slow video agencies with a high-throughput content refinery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Card 1: 9:16 Video Mastery (Col 7) */}
            <SpotlightCard className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center text-primary-400 mb-4">
                  <Video className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-primary-400 font-bold tracking-wider">
                  CINEMATIC RETENTION EDITING
                </div>
                <h3 className="text-2xl font-bold font-display text-white mt-1">
                  High-Retention Short Form (Reels & Shorts)
                </h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                  Every video is engineered with custom motion graphics, sound design, punch-ins, and pacing calibrated to beat the algorithmic 3-second hook drop-off.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Turnaround SLA: &lt; 24 Hours</span>
                <span className="text-emerald-400 font-semibold">94.2% Completion Rate</span>
              </div>
            </SpotlightCard>

            {/* Bento Card 2: Autonomous Multi-Agent n8n (Col 5) */}
            <SpotlightCard className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-accent font-bold tracking-wider">
                  PROPRIETARY N8N ENGINE
                </div>
                <h3 className="text-2xl font-bold font-display text-white mt-1">
                  Autonomous Multi-Agent AI Pipelines
                </h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                  Custom-built agent networks that automatically pull long-form podcasts, transcribe audio, pinpoint viral hooks, and generate optimized titles and thumbnails.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Human Hours Saved: 85%</span>
                <span className="text-primary-400 font-semibold">0 Manual Ingests</span>
              </div>
            </SpotlightCard>

            {/* Bento Card 3: Omnichannel Distribution (Col 5) */}
            <SpotlightCard className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                  ZERO-TOUCH PUBLISHING
                </div>
                <h3 className="text-2xl font-bold font-display text-white mt-1">
                  Omnichannel Auto-Distribution
                </h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                  Direct API integrations schedule and publish to Instagram Reels, YouTube Shorts, TikTok, and LinkedIn with native hashtag and SEO caption optimization.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Platforms: 4 Simultaneous</span>
                <span className="text-emerald-400 font-semibold">Peak-Window Sync</span>
              </div>
            </SpotlightCard>

            {/* Bento Card 4: Retention Telemetry & Analytics (Col 7) */}
            <SpotlightCard className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                  REAL-TIME INTELLIGENCE
                </div>
                <h3 className="text-2xl font-bold font-display text-white mt-1">
                  Algorithmic Heatmaps & Retention Analytics
                </h3>
                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                  We monitor second-by-second drop-off graphs across all posted assets, continuously feeding performance data back into our creative scripting pods.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Weekly Audit Reports</span>
                <span className="text-accent font-semibold">+340% Avg Watch Time</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE WORKFLOW PIPELINE DEMO ===== */}
      <section id="pipeline-demo" className="py-20 md:py-28 border-t border-white/[0.06] bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkflowVisualizer />
        </div>
      </section>

      {/* ===== INTERACTIVE ROI / VALUE CALCULATOR ===== */}
      <section className="py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoiCalculator />
        </div>
      </section>

      {/* ===== AGENCY SERVICES PREVIEW ===== */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-2">
                <Flame className="w-3.5 h-3.5 text-primary-400" />
                SPECIALIZED CREATIVE TRACKS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
                Done-For-You Production & AI Systems
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-primary-400 hover:text-white transition-colors"
            >
              <span>VIEW ALL SERVICES & SCOPES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServices.map((service) => (
              <SpotlightCard key={service.title} className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary-400">
                      <Video className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-primary-500/15 text-primary-300 border border-primary-500/25">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">{service.title}</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{service.description}</p>
                  <div className="mt-4 font-mono text-sm font-bold text-emerald-400">
                    Starts at {service.price}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => handleOpenBookModal(service.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-primary-600 hover:text-white border border-white/[0.1] text-xs font-semibold text-neutral-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Consult on {service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENT TESTIMONIALS & RESULTS ===== */}
      <section className="py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
              <Award className="w-3.5 h-3.5" />
              VERIFIED CREATOR SUCCESS
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white">
              Trusted by Ambitious Creators.
            </h2>
            <p className="text-sm md:text-base text-neutral-400 mt-2">
              Real creators scaling their audience, output, and sponsorship revenue with NovaMint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((item) => (
              <SpotlightCard key={item.name} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    &quot;{item.content}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center font-bold text-xs text-white">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[11px] text-neutral-400">{item.role}</div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL HIGH-IMPACT AGENCY CALLOUT ===== */}
      <section className="py-20 md:py-28 border-t border-white/[0.08] bg-gradient-to-b from-[#08090C] to-[#030407] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            READY TO SCALE WITHOUT BURNOUT?
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
            Let’s Build Your Autonomous Content Studio.
          </h2>
          <p className="text-sm md:text-base text-neutral-400 mt-4 max-w-xl mx-auto">
            Book a complimentary 30-minute architecture session with our lead engineer. We’ll audit your existing channels and design your custom automation blueprint.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleOpenBookModal('Custom Content Studio Architecture')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all shadow-2xl shadow-white/20 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Architecture Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] text-white font-semibold text-sm transition-all"
            >
              Review Retainer Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Strategy Call Pill (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenBookModal('Quick Inbound Strategy Consultation')}
          className="px-4 py-2.5 rounded-full bg-[#090A0F] border border-white/[0.15] text-white text-xs font-semibold shadow-2xl shadow-black/80 flex items-center gap-2 backdrop-blur-xl hover:border-primary-500/50 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Book Strategy Call</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-primary-400" />
        </motion.button>
      </div>

      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}
