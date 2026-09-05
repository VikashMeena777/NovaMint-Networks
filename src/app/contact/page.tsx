'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Video Editing & Retention Optimization',
    budget: '₹25,000 - ₹50,000 / month',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in your name, email, and message details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.service} (Budget: ${formData.budget})`,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setIsSuccess(true);
      toast.success('Your message was received! A studio architect will reply within 2 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Video Editing & Retention Optimization',
        budget: '₹25,000 - ₹50,000 / month',
        message: '',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit message. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030407] text-white selection:bg-primary-500/30">
      {/* Hero Header */}
      <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            DIRECT STUDIO ACCESS
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
            Let’s Engineer Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
              Content Pipeline.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Have a channel you want to scale, or need a custom multi-agent automation workflow? Send us your brief below.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Studio Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Area (Col 7) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-10 bg-[#08090C]/90 border-white/[0.08]">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto">
                    Thank you for reaching out. We have received your channel brief and a lead automation engineer will review it shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">
                      Start a Project Brief
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Fill out the form below. We typically respond in under 2 hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Kavya Joshi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Work / Creator Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="kavya@channel.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        WhatsApp / Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Service Scope
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0b0c12] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                      >
                        <option value="Video Editing & Retention Optimization">Cinematic Video Editing Retainer</option>
                        <option value="Autonomous AI Agent Pipelines">Autonomous AI / n8n Pipelines</option>
                        <option value="Omnichannel Growth & Auto-Publishing">Omnichannel Growth Architecture</option>
                        <option value="Custom Enterprise Solution">Custom Enterprise Pod</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                      Estimated Monthly Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0c12] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                    >
                      <option value="Under ₹25,000 / month">Under ₹25,000 / month</option>
                      <option value="₹25,000 - ₹50,000 / month">₹25,000 - ₹50,000 / month</option>
                      <option value="₹50,000 - ₹1,00,000 / month">₹50,000 - ₹1,00,000 / month</option>
                      <option value="₹1,00,000+ / month (Enterprise)">₹1,00,000+ / month (Enterprise)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                      Project Details & Channel Links *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your YouTube / Instagram link, current publishing schedule, and primary bottlenecks..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white font-semibold text-sm shadow-xl shadow-primary-950/60 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Transmitting Brief...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Project Brief
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Encrypted submission. Your data and channel IP remain confidential.
                  </div>
                </form>
              )}
            </SpotlightCard>
          </div>

          {/* Direct Studio Channels (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
              <h3 className="text-lg font-bold font-display text-white mb-4">
                Fast-Track Communication
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Prefer direct messaging or quick consultation calls? Reach out directly to our engineering desk:
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      WhatsApp Studio Chat
                    </div>
                    <div className="text-[11px] text-neutral-500">+91 98765 43210 (Quick Queries)</div>
                  </div>
                </a>

                <a
                  href="mailto:hello@novamintnetworks.in"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-primary-500/40 hover:bg-primary-500/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white group-hover:text-primary-400 transition-colors">
                      Direct Architect Email
                    </div>
                    <div className="text-[11px] text-neutral-500">hello@novamintnetworks.in</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white">
                      Guaranteed SLA Response
                    </div>
                    <div className="text-[11px] text-neutral-500">&lt; 2 Hours during active market hours</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 bg-[#08090C]/80 border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Q2 STUDIO CAPACITY</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We onboard a maximum of 4 new creator retainers per quarter to maintain sub-24h turnaround SLAs. 2 slots remain for Q2.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
}
