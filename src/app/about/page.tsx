'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Users,
  Award,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Video,
  Cpu,
  TrendingUp,
  Flame,
  Terminal,
  Layers
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const pods = [
  {
    name: 'Creative Retention Pod',
    role: 'Cinematic Visuals & Motion Graphics',
    icon: Video,
    color: '#8B5CF6',
    description: 'Master video editors and sound designers dedicated to crafting thumb-stopping 9:16 cuts that defeat algorithmic swipe-away rates.',
    skills: ['Foley Sound Design', 'Kinetic Typography', '3D Motion Graphics', 'Retention Pacing'],
  },
  {
    name: 'Autonomous Systems Pod',
    role: 'n8n & Multi-Agent Architecture',
    icon: Cpu,
    color: '#06B6D4',
    description: 'Engineers who wire AI models, transcription endpoints, and cloud APIs into zero-touch content ingestion and distribution pipelines.',
    skills: ['n8n Cloud Workflows', 'Whisper & Gemini APIs', 'Automated FFmpeg Transcoding', 'Social API Webhooks'],
  },
  {
    name: 'Audience Growth Pod',
    role: 'Hook Scripting & Algorithmic Telemetry',
    icon: TrendingUp,
    color: '#10B981',
    description: 'Data analysts tracking second-by-second drop-off heatmaps, continuously feeding empirical retention data back into our creative scripts.',
    skills: ['Viral Hook Research', 'A/B Thumbnail Systems', 'Audience Retention Audits', 'Omnichannel Scheduling'],
  },
];

const principles = [
  {
    title: 'Output Multiplied, Quality Uncompromised',
    description: 'We never use generic AI video templates. AI handles the boring ingestion and transcription; human masters craft the emotion and storytelling.',
  },
  {
    title: 'Rigorous Sub-24h First Cut SLA',
    description: 'Speed is the ultimate competitive advantage in the creator economy. We deliver fast so your content matches real-time cultural moments.',
  },
  {
    title: 'Total Intellectual Property Freedom',
    description: 'You own 100% of raw footage, project files, custom n8n configurations, and finished assets. No vendor lock-in, ever.',
  },
];

const timeline = [
  {
    year: '2024',
    title: 'Founded NovaMint Networks',
    desc: 'Began as a boutique post-production studio helping top creators scale past 100K subscribers.',
  },
  {
    year: '2025',
    title: 'Proprietary n8n AI Refinery Launched',
    desc: 'Integrated autonomous multi-agent pipelines, saving 85% of manual ingest overhead for 100+ partner channels.',
  },
  {
    year: '2026',
    title: 'Category-Defining Creator Infrastructure',
    desc: 'Managing over 10M+ organic monthly views across YouTube Shorts, Instagram Reels, and enterprise podcast networks.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-primary-500/30">
      {/* Hero Header */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            THE NOVAMINT MANIFESTO
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
            Engineering the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
              Creator Output.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            We are not a traditional, slow creative agency. We are a high-throughput studio infrastructure pairing human creative masters with autonomous AI systems.
          </p>
        </div>
      </section>

      {/* Specialist Pods */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
            AGENCY ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mt-1">
            Specialized Creator Pods
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Every client is assigned a dedicated multi-disciplinary pod configured for their niche.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pods.map((pod) => {
            const Icon = pod.icon;

            return (
              <SpotlightCard
                key={pod.name}
                className="p-6 sm:p-8 flex flex-col justify-between bg-[#08090C]/80 border-white/[0.08]"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/10"
                    style={{ backgroundColor: `${pod.color}15`, color: pod.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                    {pod.role}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">{pod.name}</h3>

                  <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
                    {pod.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                      CORE CAPABILITIES
                    </span>
                    {pod.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 md:py-24 border-t border-white/[0.06] bg-[#050608]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
              HOW WE OPERATE
            </span>
            <h2 className="text-3xl font-bold font-display text-white mt-1">
              Our Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, index) => (
              <SpotlightCard key={p.title} className="p-6 bg-[#08090C]/90 border-white/[0.08]">
                <div className="text-xs font-mono text-primary-400 font-bold mb-2">
                  0{index + 1} // RULE
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{p.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Timeline */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
              TRACK RECORD
            </span>
            <h2 className="text-3xl font-bold font-display text-white mt-1">
              The Evolution of NovaMint
            </h2>
          </div>

          <div className="space-y-6 border-l border-white/[0.1] pl-6 ml-4">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-[#030407]" />
                <span className="text-xs font-mono font-bold text-primary-400">{item.year}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{item.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.08] bg-[#06070a] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Ready to Partner with a High-Output Content Pod?
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Let’s review your channel and explore how NovaMint can take over your post-production and distribution.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all shadow-xl shadow-white/10 flex items-center gap-2"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
