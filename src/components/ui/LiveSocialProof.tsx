'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

interface SocialProofEvent {
    id: string;
    title: string;
    detail: string;
    location: string;
    timeAgo: string;
    tag: string;
}

const EVENTS: SocialProofEvent[] = [
    {
        id: 'event-1',
        title: '150+ Viral Reels Vault Unlocked',
        detail: 'Growth agency founder started instant deployment',
        location: 'Bengaluru, IN',
        timeAgo: '4m ago',
        tag: 'Digital Asset'
    },
    {
        id: 'event-2',
        title: 'AI Content Retainer Secured',
        detail: '30 cinematic AI reels/mo pipeline commissioned',
        location: 'Mumbai, IN',
        timeAgo: '18m ago',
        tag: 'Agency Retainer'
    },
    {
        id: 'event-3',
        title: 'n8n Autonomous Lead Funnel Deployed',
        detail: 'CRM + WhatsApp instant response agent live',
        location: 'Delhi NCR, IN',
        timeAgo: '32m ago',
        tag: 'AI Workflow'
    },
    {
        id: 'event-4',
        title: 'Strategy Consultation Booked',
        detail: 'High-ticket video production workflow audit',
        location: 'Hyderabad, IN',
        timeAgo: '49m ago',
        tag: 'Private Audit'
    },
    {
        id: 'event-5',
        title: 'Autonomous Creator Stack Licensed',
        detail: 'Automated viral captioning & sound design system',
        location: 'Pune, IN',
        timeAgo: '1h ago',
        tag: 'Digital Asset'
    }
];

export function LiveSocialProof() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const dismissed = sessionStorage.getItem('novamint_social_proof_dismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
            return;
        }

        // Show first proof after 5 seconds
        const initialTimer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        // Rotate events every 32 seconds (display for 8s, pause for 24s)
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % EVENTS.length);
                setIsVisible(true);
            }, 1200);
        }, 28000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('novamint_social_proof_dismissed', 'true');
        }
    };

    if (isDismissed) return null;

    const currentEvent = EVENTS[currentIndex];

    return (
        <aside aria-label="Recent activity notifications" className="fixed bottom-5 left-5 z-40 max-w-xs sm:max-w-sm pointer-events-none select-none">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-auto rounded-2xl border border-white/[0.08] bg-[#08090C]/90 backdrop-blur-xl p-4 shadow-2xl shadow-black/80 ring-1 ring-white/5 relative overflow-hidden"
                    >
                        {/* Glowing highlight streak */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />

                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center text-primary-400 shrink-0 mt-0.5 shadow-sm">
                                    <Sparkles className="w-4 h-4" />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            {currentEvent.tag}
                                        </span>
                                        <span className="text-white/20 text-xs">·</span>
                                        <span className="text-[10px] font-mono text-neutral-500 truncate">
                                            {currentEvent.timeAgo}
                                        </span>
                                    </div>

                                    <div className="text-xs font-bold font-display text-white mt-0.5 truncate">
                                        {currentEvent.title}
                                    </div>

                                    <p className="text-[11px] text-neutral-400 leading-snug mt-0.5">
                                        {currentEvent.detail}
                                    </p>

                                    <div className="flex items-center gap-1 mt-1.5 text-[10px] font-mono text-neutral-500">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-400/80 shrink-0" />
                                        <span>Verified in {currentEvent.location}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleDismiss}
                                aria-label="Dismiss notification"
                                className="p-1 rounded-md text-neutral-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}
