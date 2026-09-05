'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Zap,
  ShieldCheck,
  Lock,
  CreditCard,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

const footerLinks = {
  products: [
    { label: 'Reels Bundles (₹99)', href: '/products?category=reels' },
    { label: 'Mega Creator Bundles', href: '/products?category=mega' },
    { label: 'Creator Academy', href: '/products?category=courses' },
    { label: 'All Digital Assets', href: '/products' },
  ],
  services: [
    { label: 'High-Retention Video Editing', href: '/services' },
    { label: 'Omnichannel Social Growth', href: '/services' },
    { label: 'Custom AI n8n Automations', href: '/ai-automations' },
    { label: 'Web & Funnel Architecture', href: '/services' },
  ],
  company: [
    { label: 'Agency Story & Pods', href: '/about' },
    { label: 'Verified Portfolio & Metrics', href: '/portfolio' },
    { label: 'Client Testimonials', href: '/testimonials' },
    { label: 'Transparent Retainer Pricing', href: '/pricing' },
  ],
  legal: [
    { label: 'Contact Studio', href: '/contact' },
    { label: 'Frequently Asked Questions', href: '/faq' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy & Security Policy', href: '/privacy' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/novamintnetworks', label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: Youtube, href: 'https://youtube.com/@novamintnetworks', label: 'YouTube', color: 'hover:text-red-500' },
  { icon: Twitter, href: 'https://twitter.com/novamintnet', label: 'Twitter', color: 'hover:text-sky-400' },
  { icon: Linkedin, href: 'https://linkedin.com/company/novamintnetworks', label: 'LinkedIn', color: 'hover:text-blue-400' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const year = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid work or creator email address.');
      return;
    }

    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail('');
      toast.success('Welcome to the NovaMint Insider Dispatch! Check your inbox.');
    }, 600);
  };

  return (
    <footer className="relative bg-[#030407] border-t border-white/[0.08] text-white overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-primary-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Live Network Status Bar */}
        <div className="py-4 border-b border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-semibold">NETWORK STATUS: ALL SYSTEMS NOMINAL</span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="hidden md:inline text-neutral-400">Avg Ingest Latency: 1.4s</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-mono">
            <span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 text-[11px]">
              Q2 COHORT
            </span>
            <span>Accepting 2 New Creator Pipelines</span>
          </div>
        </div>

        {/* Newsletter & High-Impact Agency CTA */}
        <div className="py-12 md:py-16 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-primary-300 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                THE DISPATCH BY NOVAMINT
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white">
                Breakthrough AI Workflows & Viral Architecture.
              </h3>
              <p className="text-sm text-neutral-400 mt-2 max-w-md">
                Get our weekly technical teardowns of 10M+ view creator systems, prompt engineering blueprints, and free product drops.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md lg:ml-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your creator or agency email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/80 transition-all font-mono text-xs"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all disabled:opacity-50 shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                >
                  <span>{isSubscribing ? 'Joining...' : 'Subscribe'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-2 lg:justify-end font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Zero spam
                </span>
                <span>•</span>
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Brand Info (Col 4) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center shadow-lg shadow-primary-950/50">
                <Zap className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex items-baseline tracking-tight">
                <span className="font-display font-bold text-xl text-white">Nova</span>
                <span className="font-display font-bold text-xl text-primary-400">Mint</span>
                <span className="ml-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                  NETWORKS
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Architecting high-status content engines, autonomous n8n workflows, and viral video pipelines for India & global top-tier digital creators.
            </p>

            <div className="space-y-2 text-xs text-neutral-400 font-mono pt-2">
              <a href="mailto:hello@novamintnetworks.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-primary-400" />
                hello@novamintnetworks.in
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary-400" />
                Bengaluru • Remote Worldwide
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={`w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 transition-all hover:border-white/20 hover:scale-105 ${item.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links (Col 2 each) */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-4">
              Legal & Help
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verified Badges & Trust Signals */}
        <div className="py-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <CreditCard className="w-3.5 h-3.5 text-primary-400" />
              <span>Official Cashfree Payment Gateway (UPI / Cards / Netbanking)</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Instant Digital Delivery via CloudFront</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            © {year} NovaMint Networks Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
