'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Video,
  Bot,
  Palette,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  X,
  CheckCircle2,
  BarChart2,
  Clock,
  Play
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BookNowModal } from '@/components/booking/BookNowModal';

interface PortfolioProject {
  id: number;
  title: string;
  category: 'video' | 'automation' | 'social' | 'design';
  client: string;
  description: string;
  badge: string;
  gradient: string;
  tags: string[];
  metrics: {
    primary: string;
    primaryLabel: string;
    secondary: string;
    secondaryLabel: string;
    outcome: string;
  };
  details: {
    challenge: string;
    solution: string;
    turnaround: string;
    stack: string[];
  };
}

const projects: PortfolioProject[] = [
  {
    id: 1,
    title: 'Autonomous Shorts Refinery (3x Daily Postings)',
    category: 'automation',
    client: 'Fintech Creator Studio (350K Subs)',
    description: 'Engineered an automated n8n pipeline that watches Google Drive for raw studio podcast footage, clips high-scoring viral hooks via Gemini Flash, and formats 9:16 reels.',
    badge: 'AUTOMATION PIPELINE',
    gradient: 'from-primary-600 via-primary-500 to-accent',
    tags: ['n8n', 'Gemini Flash', 'Whisper API', 'Google Drive'],
    metrics: {
      primary: '1.4M+',
      primaryLabel: 'Views Generated in 30 Days',
      secondary: '24 hrs/wk',
      secondaryLabel: 'Manual Overhead Saved',
      outcome: '3x Audience Scale',
    },
    details: {
      challenge: 'The client spent 35 hours weekly manually reviewing 2-hour podcast recordings, scrubbing timestamps, and exporting vertical clips.',
      solution: 'Built an autonomous multi-agent pipeline that transcribes audio in real-time, scores hooks based on semantic tension, and renders 9:16 captions.',
      turnaround: '14 days deployment',
      stack: ['n8n Cloud', 'FFmpeg Server', 'Whisper', 'Gemini 2.5 Flash'],
    },
  },
  {
    id: 2,
    title: 'Cinematic High-Retention Reels Redesign',
    category: 'video',
    client: 'Health & Biohacking Brand',
    description: 'Revamped entire visual identity for short-form clips: custom kinetic typography, SFX audio ducking, speed ramps, and 3D mockups.',
    badge: 'CREATIVE PRODUCTION',
    gradient: 'from-accent via-blue-500 to-primary-600',
    tags: ['Premiere Pro', 'After Effects', 'Sound Design', '9:16'],
    metrics: {
      primary: '82%',
      primaryLabel: 'Avg Watch Time (Up from 41%)',
      secondary: '8.4M+',
      secondaryLabel: 'Total Impressions',
      outcome: 'Brand Sponsorships',
    },
    details: {
      challenge: 'High swipe-away rates within the first 2 seconds; plain subtitling was blending in with generic TikTok styles.',
      solution: 'Replaced stock captions with tailored kinetic typography, subtle Foley sound design, and custom 3D infographic callouts.',
      turnaround: '24hr per episode SLA',
      stack: ['Adobe Premiere Pro', 'After Effects', 'Audition'],
    },
  },
  {
    id: 3,
    title: 'Omnichannel Growth & Zero-Touch Distribution',
    category: 'social',
    client: 'SaaS Founder & Angel Investor',
    description: 'Automated simultaneous distribution across YouTube Shorts, Instagram Reels, TikTok, and LinkedIn with tailored titles and platform hashtags.',
    badge: 'GROWTH ARCHITECTURE',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    tags: ['Instagram Graph API', 'YouTube API', 'LinkedIn API'],
    metrics: {
      primary: '0 to 48K',
      primaryLabel: 'Followers in 60 Days',
      secondary: '4 Channels',
      secondaryLabel: 'Simultaneous Distribution',
      outcome: 'Inbound Pipeline',
    },
    details: {
      challenge: 'Inconsistent posting across secondary platforms due to the manual labor of adapting descriptions and thumbnail frames.',
      solution: 'Orchestrated zero-touch webhook distribution that schedules releases for peak engagement time slots in target geographies.',
      turnaround: 'Ongoing Retainer',
      stack: ['Meta Graph API', 'YouTube Data v3', 'n8n'],
    },
  },
  {
    id: 4,
    title: 'Multi-Variant Lead Intake & WhatsApp Funnel',
    category: 'automation',
    client: 'Digital Agency Academy',
    description: 'Custom CRM webhook integration capturing creator inquiries, scoring their channel size, and instantly booking qualifying leads via WhatsApp & Calendly.',
    badge: 'AI LEAD FUNNEL',
    gradient: 'from-purple-600 via-pink-500 to-rose-500',
    tags: ['WhatsApp Business', 'Supabase', 'Calendly', 'Resend'],
    metrics: {
      primary: '4.2x',
      primaryLabel: 'Lead Conversion Lift',
      secondary: '&lt; 90 sec',
      secondaryLabel: 'Response Latency',
      outcome: '₹18L Revenue Added',
    },
    details: {
      challenge: 'Qualified creator leads dropped off when waiting 6+ hours for a manual email reply.',
      solution: 'Automated 90-second response sequence delivering tailored case studies directly on WhatsApp.',
      turnaround: '7 days deployment',
      stack: ['WhatsApp Cloud API', 'Supabase', 'Resend API'],
    },
  },
  {
    id: 5,
    title: 'High-Status Personal Brand Visual Identity',
    category: 'design',
    client: 'Venture Capital Partner',
    description: 'Bespoke design system for LinkedIn slide decks, thumbnail systems, YouTube banner art, and presentation decks.',
    badge: 'BRAND IDENTITY',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    tags: ['Figma', 'Brand Guidelines', 'Typography System'],
    metrics: {
      primary: '220%',
      primaryLabel: 'CTR Boost on Thumbnails',
      secondary: '100%',
      secondaryLabel: 'Design Consistency',
      outcome: 'High-Ticket Dealflow',
    },
    details: {
      challenge: 'Generic template look undermined the authority required for multi-million dollar venture fund outreach.',
      solution: 'Crafted an editorial, Swiss-inspired dark aesthetic featuring high-contrast display typography and custom graphics.',
      turnaround: '10 days delivery',
      stack: ['Figma', 'Photoshop', 'Custom Design Tokens'],
    },
  },
  {
    id: 6,
    title: 'Viral Motivational Reels Media Network',
    category: 'video',
    client: 'Motivation Media Network (1.2M Community)',
    description: 'Daily delivery of high-contrast, philosophical short-form videos with bespoke voiceover mastering and cinematic 4K archival footage.',
    badge: 'HIGH-VOLUME RETAINER',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    tags: ['Archival 4K', 'Audio Mastering', 'Color Grading'],
    metrics: {
      primary: '24M+',
      primaryLabel: 'Quarterly Video Views',
      secondary: '90 Videos',
      secondaryLabel: 'Delivered On Schedule',
      outcome: 'Ad Monetization',
    },
    details: {
      challenge: 'Burnout from editing 3 videos every single day led to severe quality drop-offs.',
      solution: 'Assigned a dedicated 2-editor pod with a custom asset library and standardized color-grading LUTs.',
      turnaround: 'Daily Continuous SLA',
      stack: ['DaVinci Resolve', 'Soundly', 'Frame.io'],
    },
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Case Studies', icon: Filter },
    { id: 'automation', name: 'AI Automations', icon: Bot },
    { id: 'video', name: 'Retention Video', icon: Video },
    { id: 'social', name: 'Omnichannel Growth', icon: Users },
    { id: 'design', name: 'Brand Systems', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-primary-500/30">
      {/* Hero Header */}
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            MEASURABLE CREATOR RESULTS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
            Proof of Output.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
              Real Performance.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Explore audited case studies of how NovaMint builds viral video systems and autonomous AI pipelines for leading creators.
          </p>
        </div>
      </section>

      {/* Category Pills Bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#06070a]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="p-6 sm:p-7 flex flex-col justify-between bg-[#08090C]/80 border-white/[0.08] group"
            >
              <div>
                {/* Code-Crafted Graphic Preview Card */}
                <div className={`relative h-44 rounded-xl mb-5 overflow-hidden bg-gradient-to-br ${project.gradient} p-0.5 shadow-lg`}>
                  <div className="w-full h-full rounded-[10px] bg-[#07080C] p-4 flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative subtle background lines */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff),linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff)] bg-[size:16px_16px]" />

                    <div className="flex items-center justify-between z-10">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                        {project.badge}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    {/* Central metric highlight */}
                    <div className="z-10 text-center py-2">
                      <div className="text-3xl font-black font-display text-white tracking-tight">
                        {project.metrics.primary}
                      </div>
                      <div className="text-[10px] font-mono uppercase text-neutral-400 mt-0.5">
                        {project.metrics.primaryLabel}
                      </div>
                    </div>

                    <div className="flex items-center justify-between z-10 text-[10px] font-mono text-neutral-400 border-t border-white/[0.06] pt-2">
                      <span>{project.client}</span>
                      <span className="text-emerald-400 font-bold">{project.metrics.outcome}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-neutral-400 border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold font-display text-white tracking-tight group-hover:text-primary-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setActiveProject(project)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white text-neutral-200 hover:text-black border border-white/[0.1] text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inspect Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/[0.12] bg-[#08090C] p-6 sm:p-8 shadow-2xl shadow-black z-10 max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary-400 px-2.5 py-0.5 rounded-full bg-primary-500/15 border border-primary-500/30">
                {activeProject.badge}
              </span>

              <h3 className="text-2xl font-bold font-display text-white mt-3">
                {activeProject.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">Client: {activeProject.client}</p>

              {/* Metrics Highlights Bar */}
              <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-white/[0.025] border border-white/[0.08] text-center">
                <div>
                  <div className="text-xl font-bold font-display text-white">{activeProject.metrics.primary}</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">{activeProject.metrics.primaryLabel}</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-display text-primary-400">{activeProject.metrics.secondary}</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">{activeProject.metrics.secondaryLabel}</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-display text-emerald-400">{activeProject.metrics.outcome}</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Verified Result</div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-white uppercase font-mono text-xs mb-1">The Bottleneck:</h4>
                  <p className="text-neutral-400">{activeProject.details.challenge}</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase font-mono text-xs mb-1">NovaMint Architecture:</h4>
                  <p className="text-neutral-400">{activeProject.details.solution}</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase font-mono text-xs mb-1">Tools & Stack Deployed:</h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeProject.details.stack.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.05] border border-white/[0.1] text-neutral-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-400">
                  Turnaround: {activeProject.details.turnaround}
                </span>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    setIsBookModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                >
                  <span>Build This For My Channel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookNowModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        serviceName="Case Study Architecture Discussion"
      />
    </div>
  );
}
