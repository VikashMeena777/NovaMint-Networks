'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Card, Badge, SectionHeading, Input } from '@/components/ui';
import { faqCategories as categories, faqs } from '@/data/faq';
import { getIcon } from '@/lib/icon-map';

// FAQ Item Component
function FAQItem({ faq }: { faq: typeof faqs[0] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card
            hover={false}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-left">{faq.question}</h3>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <p className="text-muted-foreground mt-3 text-left">{faq.answer}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </div>
        </Card>
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
        <>
            {/* Hero Section */}
            <section className="section pt-8">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <SlideUp>
                            <Badge variant="primary" className="mb-2">
                                <HelpCircle className="w-3 h-3 mr-1" />
                                FAQ
                            </Badge>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Frequently Asked{' '}
                                <span className="gradient-text">Questions</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                                Find quick answers to common questions about our products,
                                services, payments, and support.
                            </p>
                        </SlideUp>

                        {/* Search */}
                        <SlideUp delay={0.3}>
                            <div className="relative max-w-md mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-nova-purple"
                                />
                            </div>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 border-y border-border bg-card/50 sticky top-20 z-30">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                                onClick={() => setSelectedCategory(category.id)}
                                className="text-base"
                            >
                                {(() => { const Icon = getIcon(category.icon); return <Icon className="w-4 h-4" />; })()}
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="section">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-muted-foreground">
                                Showing <strong className="text-foreground">{filteredFaqs.length}</strong> questions
                            </p>
                        </div>

                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <ScrollReveal key={faq.id} delay={index * 0.03}>
                                    <FAQItem faq={faq} />
                                </ScrollReveal>
                            ))}
                        </div>

                        {filteredFaqs.length === 0 && (
                            <div className="text-center py-12">
                                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or category filter</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-3xl p-8 md:p-16 text-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-nova-purple to-electric-blue" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

                            <div className="relative z-10">
                                <Badge className="mb-6 bg-white/20 text-white">
                                    <MessageCircle className="w-3 h-3 mr-1" />
                                    Still Have Questions?
                                </Badge>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    We're Here to Help!
                                </h2>
                                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                                    Can't find the answer you're looking for? Our support team
                                    is just a message away. We typically respond within minutes.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a
                                        href="https://wa.me/919999999999"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            size="lg"
                                            className="bg-white text-nova-purple hover:bg-white/90"
                                        >
                                            Chat on WhatsApp
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </a>
                                    <Link href="/contact">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="border-white text-white hover:bg-white/10"
                                        >
                                            Contact Form
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
