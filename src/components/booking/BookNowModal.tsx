'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, Calendar, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export function BookNowModal({ isOpen, onClose, serviceName = '' }: BookNowModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceName,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update service when serviceName prop changes
  useEffect(() => {
    if (serviceName) {
      setFormData(prev => ({ ...prev, service: serviceName }));
    }
  }, [serviceName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || 'General Consultation',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit consultation request');
      }

      setIsSuccess(true);
      toast.success('Consultation request submitted! Our team will contact you within 24 hours.');

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ name: '', email: '', phone: '', service: '' });
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.12] bg-[#07080C] shadow-2xl shadow-black/80 p-6 sm:p-8 overflow-hidden z-10"
          >
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-600/20 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Strategy Session Confirmed!
                </h3>
                <p className="text-sm text-neutral-400 max-w-xs mx-auto">
                  We’ve received your intake details. A senior automation architect will review your channel and reach out shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  AGENCY CONSULTATION INTAKE
                </div>

                <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                  Book Your Architecture Call
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Targeting: <span className="text-primary-300 font-medium">{formData.service || 'Custom Automation Pipeline'}</span>
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Alex Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                      />
                      <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Work / Creator Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="alex@creatorstudio.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                      />
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                      Phone / WhatsApp (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
                      />
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white font-semibold text-sm shadow-xl shadow-primary-950/60 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting Intake...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          Lock In Strategy Consultation
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Strict confidentiality guaranteed. No obligation.
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
