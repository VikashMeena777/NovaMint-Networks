'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Star,
    Quote,
    ArrowRight,
    TrendingUp,
    Award,
    CheckCircle2,
    Sparkles,
    Play,
    Zap,
    Users,
    Eye
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { testimonials, testimonialPageStats as stats } from '@/data/testimonials';

const videoCaseStudies = [
    {
        title: "Finance & Wealth Channel Overhaul",
        creator: "FinVeda Daily",
        stats: "1.4M → 8.2M Monthly Views",
        niche: "Automated Shorts Pipeline",
        audioWave: [40, 75, 100, 60, 85, 30, 95, 55, 70, 90, 45, 80, 65, 90, 100, 40]
    },
    {
        title: "B2B SaaS Founder Personal Brand",
        creator: "SaaS Scale Lab",
        stats: "0 → 42K LinkedIn Followers",
        niche: "AI Scriptwriting & Repurposing",
        audioWave: [60, 40, 80, 95, 50, 70, 100, 85, 40, 90, 60, 75, 85, 95, 70, 50]
    },
    {
        title: "D2C Fitness Brand Content Machine",
        creator: "RawFit Nutrition",
        stats: "480K Engaged Leads / Mo",
        niche: "n8n Automated Editing & Scheduling",
        audioWave: [80, 50, 90, 70, 100, 40, 85, 95, 60, 75, 90, 100, 55, 80, 90, 65]
    }
];

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-20">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-4"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>Verified Creator & Agency Telemetry</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-none mb-6"
                    >
                        Trusted by High-Output{' '}
                        <span className="bg-gradient-to-r from-primary-400 via-accent to-pink-400 bg-clip-text text-transparent">
                            Creators & Founders
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Explore verifiable outcomes, subscriber multipliers, and autonomous production pipelines engineered by NovaMint Networks.
                    </motion.p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => (
                        <SpotlightCard
                            key={stat.label}
                            className="p-6 text-center bg-[#08090C]/80 border-white/[0.08]"
                        >
                            <div className="text-3xl sm:text-4xl font-black font-display text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>

                {/* Featured Testimonials */}
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.06]">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-1">
                                Executive Endorsements
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                                Flagship Case Studies
                            </h2>
                        </div>
                        <div className="text-xs font-mono text-neutral-400">
                            AVERAGE RATING: <span className="text-amber-400 font-bold">5.0 / 5.0 ★</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.filter(t => t.featured).map((testimonial) => (
                            <SpotlightCard
                                key={testimonial.id}
                                className="p-7 bg-[#08090C]/90 border-white/[0.08] flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-1 text-amber-400">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                            ))}
                                        </div>
                                        <Quote className="w-6 h-6 text-white/10" />
                                    </div>

                                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                                        &ldquo;{testimonial.content}&rdquo;
                                    </p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                                        <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                                        <span>{testimonial.metrics}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-white font-bold font-display text-sm shrink-0">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-sm text-white truncate font-display">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-[11px] text-neutral-400 truncate">
                                                {testimonial.role} · <span className="text-primary-300">{testimonial.company}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* Case Study Deep Dive / Telemetry Breakdowns */}
                <div className="space-y-8">
                    <div className="pb-4 border-b border-white/[0.06]">
                        <div className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-1">
                            Production Architecture
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                            Verified Creator Audio & Video Workflows
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {videoCaseStudies.map((study, idx) => (
                            <SpotlightCard
                                key={study.title}
                                className="p-6 bg-[#08090C]/80 border-white/[0.08] flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-primary-300">
                                            {study.niche}
                                        </span>
                                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                                            <Zap className="w-3 h-3" />
                                            Active
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold font-display text-white mb-1.5">
                                        {study.title}
                                    </h3>
                                    <p className="text-xs text-neutral-400 mb-6">
                                        Client: <span className="text-white font-semibold">{study.creator}</span>
                                    </p>

                                    {/* Waveform Visualization */}
                                    <div className="p-4 rounded-xl bg-black/60 border border-white/[0.06] mb-6">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-2">
                                            <span>AUDIO RETENTION CURVE</span>
                                            <span>PEAK 94.2%</span>
                                        </div>
                                        <div className="h-10 flex items-end gap-1">
                                            {study.audioWave.map((h, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 bg-gradient-to-t from-primary-600 to-accent rounded-t-sm opacity-80"
                                                    style={{ height: `${h}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                                    <span className="text-neutral-400">OUTCOME:</span>
                                    <span className="text-emerald-400 font-bold">{study.stats}</span>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* All Testimonials Grid */}
                <div className="space-y-8">
                    <div className="pb-4 border-b border-white/[0.06]">
                        <div className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-1">
                            Extended Reviews
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                            What Our Global Partners Say
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial) => (
                            <SpotlightCard
                                key={testimonial.id}
                                className="p-6 bg-[#08090C]/80 border-white/[0.08] flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex gap-1 text-amber-400 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                    </div>

                                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                                        &ldquo;{testimonial.content}&rdquo;
                                    </p>
                                </div>

                                <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        {testimonial.metrics}
                                    </span>

                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-white font-display">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs font-semibold text-white truncate font-display">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-[10px] text-neutral-500 truncate">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA Card */}
                <SpotlightCard className="p-8 sm:p-12 text-center bg-gradient-to-r from-primary-950/40 via-[#08090C] to-[#08090C] border-white/[0.1] shadow-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-4">
                        <Award className="w-3 h-3" />
                        <span>Direct Agency Engagement</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4">
                        Ready to Scale Your Audience & Automate Production?
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
                        Book a free 30-minute content architecture audit with our lead systems engineer.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact">
                            <button className="w-full sm:w-auto py-3 px-8 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg">
                                <span>Schedule Strategy Call</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link href="/products">
                            <button className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-neutral-300 transition-all cursor-pointer">
                                Browse Digital Bundles
                            </button>
                        </Link>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}
