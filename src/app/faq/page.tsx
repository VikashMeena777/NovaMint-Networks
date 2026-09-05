'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, MessageCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { faqCategories as categories, faqs } from '@/data/faq';
import { getIcon } from '@/lib/icon-map';

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SpotlightCard
            onClick={() => setIsOpen(!isOpen)}
            className="p-6 bg-[#08090C]/80 border-white/[0.08] cursor-pointer hover:border-white/[0.15] transition-all"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-base text-white text-left font-display">
                        {faq.question}
                    </h3>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <p className="text-xs sm:text-sm text-neutral-400 mt-3.5 text-left leading-relaxed border-t border-white/[0.04] pt-3.5">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 mt-0.5 p-1 rounded-lg bg-white/[0.04] text-neutral-400"
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </div>
        </SpotlightCard>
    );
}

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Hero */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest">
                        <HelpCircle className="w-3 h-3" />
                        <span>Knowledge Base & Protocols</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight leading-none">
                        Frequently Asked Questions
                    </h1>

                    <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
                        Instant answers regarding our autonomous editing workflows, digital vault licenses, Cashfree checkout security, and client onboarding.
                    </p>

                    {/* Search Field */}
                    <div className="relative max-w-md mx-auto pt-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search questions or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-10 py-3 rounded-xl border border-white/[0.08] bg-[#08090C]/90 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => {
                        const Icon = getIcon(category.icon);
                        const isSelected = selectedCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                    isSelected
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25 border border-primary-500'
                                        : 'bg-[#08090C]/80 border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{category.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* FAQ Results */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
                        <span>FILTERED QUESTIONS: <strong className="text-white">{filteredFaqs.length}</strong></span>
                        <span>STATUS: ALL NOMINAL</span>
                    </div>

                    <div className="space-y-3">
                        {filteredFaqs.map((faq) => (
                            <FAQItem key={faq.id} faq={faq} />
                        ))}
                    </div>

                    {filteredFaqs.length === 0 && (
                        <SpotlightCard className="p-12 text-center bg-[#08090C]/80 border-white/[0.08]">
                            <HelpCircle className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
                            <h3 className="text-base font-bold font-display text-white mb-1">No Matching Questions</h3>
                            <p className="text-xs text-neutral-400 mb-6">
                                Try adjusting your query or send our engineering team a direct message on WhatsApp.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="py-2.5 px-5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
                            >
                                Clear All Filters
                            </button>
                        </SpotlightCard>
                    )}
                </div>

                {/* Still Have Questions CTA */}
                <SpotlightCard className="p-8 sm:p-10 text-center bg-gradient-to-r from-primary-950/40 via-[#08090C] to-[#08090C] border-white/[0.1] shadow-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-4">
                        <MessageCircle className="w-3 h-3" />
                        <span>Direct Communication</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
                        Still Have Specific Technical Questions?
                    </h2>
                    <p className="text-xs text-neutral-400 max-w-lg mx-auto mb-8 leading-relaxed">
                        Our engineering team and strategy directors respond rapidly via WhatsApp and email.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://wa.me/919999999999"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <button className="w-full py-3 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg">
                                <span>Message on WhatsApp</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </a>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button className="w-full py-3 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-neutral-300 transition-all cursor-pointer">
                                Open Inquiry Ticket
                            </button>
                        </Link>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}
