'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Calendar, Sparkles, Video, Bot, Globe, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { BookNowModal } from '@/components/booking/BookNowModal';
import { RoiCalculator } from '@/components/interactive/RoiCalculator';
import { services } from '@/data/services';
import { getIcon } from '@/lib/icon-map';

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const filteredSections = activeCategory === 'all'
    ? services
    : services.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-primary-500/30">
      {/* Hero Header */}
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              SPECIALIZED CREATIVE & AUTOMATION TRACKS
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
              High-Output Services for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
                Serious Creators.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl">
              From cinematic 9:16 short-form retention editing to custom multi-agent n8n pipelines, we provide end-to-end infrastructure so you can focus entirely on ideation.
            </p>

            {/* Quick Track Category Filters */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'creative', label: 'Video Production' },
                { id: 'marketing', label: 'Omnichannel Growth' },
                { id: 'tech', label: 'AI & Web Architecture' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">
        {filteredSections.map((section) => (
          <div key={section.category} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
                  {section.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-white mt-1">
                  {section.label}
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {section.items.length} specialized packages available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((service) => {
                const IconComponent = getIcon(service.icon);

                return (
                  <SpotlightCard
                    key={service.title}
                    className="p-6 sm:p-8 flex flex-col justify-between h-full bg-[#08090C]/80 border-white/[0.08]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-lg text-emerald-400">
                            {service.price}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold font-display text-white tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-6 pt-5 border-t border-white/[0.06]">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                          DELIVERABLES INCLUDED
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                          {service.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center gap-3">
                      <button
                        onClick={() => handleBookNow(service.title)}
                        className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Strategy Call</span>
                      </button>

                      <Link
                        href="/contact"
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-neutral-300 transition-all"
                        aria-label="Request custom quote"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive ROI Calculator Section */}
      <section className="py-20 border-t border-white/[0.08] bg-[#08090C]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RoiCalculator />
        </div>
      </section>

      {/* Custom Scopes Banner */}
      <section className="py-20 border-t border-white/[0.08] bg-[#06070a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
            Need a Bespoke Content System or Custom Enterprise SLA?
          </h2>
          <p className="mt-3 text-sm text-neutral-400 max-w-xl mx-auto">
            We partner with high-growth media brands, venture-backed startups, and creator studios for dedicated pod setups.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-semibold text-xs shadow-xl shadow-primary-950/50 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <span>Speak with Our Studio Lead</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <BookNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}
