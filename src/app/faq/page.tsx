'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    MessageCircle,
    ArrowRight,
    Package,
    CreditCard,
    Zap,
    HeadphonesIcon,
    FileText,
    RefreshCw
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Card, Badge, SectionHeading, Input } from '@/components/ui';

// FAQ Categories
const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'services', name: 'Services', icon: Zap },
    { id: 'support', name: 'Support', icon: HeadphonesIcon },
];

// FAQ Data
const faqs = [
    {
        id: 1,
        category: 'products',
        question: 'What are Reels Bundles?',
        answer: 'Reels Bundles are collections of ready-to-post short videos designed for Instagram Reels, YouTube Shorts, and TikTok. Each bundle contains 50+ high-quality viral-ready content from specific categories like fitness, motivation, luxury lifestyle, etc. All bundles come with full resell rights, meaning you can use them for your own pages or resell them to earn profit.',
    },
    {
        id: 2,
        category: 'products',
        question: 'What is the difference between Reels Bundles (₹99) and Mega Bundles (₹149)?',
        answer: 'Reels Bundles at ₹99 contain 50+ videos per bundle from a single category. Mega Bundles at ₹149 are massive collections containing 250 to 30,000+ videos with significantly more value per rupee. Mega Bundles are ideal for creators who want maximum content at the lowest cost per video.',
    },
    {
        id: 3,
        category: 'products',
        question: 'Do I get resell rights with the bundles?',
        answer: 'Yes! All our reels bundles and mega bundles come with full resell rights. You can use the content for your own social media accounts, or resell the bundles to others and keep 100% of the profit. This makes it a great opportunity to start a digital product business.',
    },
    {
        id: 4,
        category: 'products',
        question: 'How do I download my purchased products?',
        answer: 'After successful payment, you will receive an instant download link via email and on the confirmation page. All products are delivered as Google Drive links for easy access. Download links are valid for 30 days, and you can request a new link anytime via WhatsApp support.',
    },
    {
        id: 5,
        category: 'products',
        question: 'What AI Automation Systems do you offer?',
        answer: 'We offer 5 main AI automation systems: Instagram Auto Poster, YouTube Channel Automation, Content Repurposer Bot, AI Lead Generator, and Podcast Clipper Automation. Each system is built on n8n and comes with setup documentation, training, and support.',
    },
    {
        id: 6,
        category: 'payments',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods through Cashfree including: UPI (Google Pay, PhonePe, Paytm, etc.), Credit/Debit Cards (Visa, Mastercard, Rupay), Net Banking, Wallets, and International Cards. All transactions are 100% secure with bank-grade encryption.',
    },
    {
        id: 7,
        category: 'payments',
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use Cashfree, India\'s leading payment gateway, which is PCI DSS compliant. We never store your card details on our servers. All transactions are encrypted with 256-bit SSL security.',
    },
    {
        id: 8,
        category: 'payments',
        question: 'Do you offer refunds?',
        answer: 'Due to the digital nature of our products and services, we generally don\'t offer refunds once the product has been delivered. However, if there\'s a genuine issue with your order (wrong product, corrupted files, etc.), please contact us within 24 hours and we\'ll resolve it promptly.',
    },
    {
        id: 9,
        category: 'payments',
        question: 'Can I get an invoice for my purchase?',
        answer: 'Yes, invoices are automatically generated and sent to your email after every purchase. If you need a custom invoice with your business details (GST number, company name), just WhatsApp us with your order ID.',
    },
    {
        id: 10,
        category: 'services',
        question: 'What services do you offer?',
        answer: 'We offer 17 professional services including: Video Editing, Thumbnail Design, Social Media Management, Instagram Growth, AI Automation Setup, YouTube Automation, Content Strategy, Graphic Design, Branding & Logo Design, Course Creation, Website Building, Paid Ads Management, and more. Visit our Services page for complete details.',
    },
    {
        id: 11,
        category: 'services',
        question: 'How long does it take to complete a project?',
        answer: 'Turnaround times vary by project: Simple video edits: 1-2 days, Thumbnail designs: 24 hours, Social media management: Ongoing monthly, AI automation setup: 3-5 days, Website development: 1-2 weeks. Rush delivery is available for urgent projects.',
    },
    {
        id: 12,
        category: 'services',
        question: 'Do you offer revisions?',
        answer: 'Yes! All our services include unlimited revisions until you\'re completely satisfied. We believe in delivering quality work that meets your expectations. Just provide clear feedback and we\'ll make the necessary changes.',
    },
    {
        id: 13,
        category: 'services',
        question: 'Can I request custom work?',
        answer: 'Absolutely! We love custom projects. Whether you need a unique automation workflow, special video editing style, or custom design work, just contact us with your requirements. We\'ll provide a tailored quote within 24 hours.',
    },
    {
        id: 14,
        category: 'services',
        question: 'Do you offer monthly retainer packages?',
        answer: 'Yes, we offer Starter (₹2999/mo), Growth (₹5999/mo), and Pro (₹9999/mo) packages for ongoing content creation needs. These include a set number of deliverables, priority support, and better rates compared to one-off projects.',
    },
    {
        id: 15,
        category: 'support',
        question: 'How can I contact support?',
        answer: 'You can reach us via: WhatsApp (fastest response, usually within minutes), Email (response within 24 hours), or the contact form on our website. We\'re available from 10 AM to 10 PM IST, 7 days a week.',
    },
    {
        id: 16,
        category: 'support',
        question: 'What is your response time?',
        answer: 'WhatsApp: Usually within 5-30 minutes during business hours. Email: Within 2-4 hours during business hours, up to 24 hours maximum. For urgent matters, WhatsApp is always the fastest way to reach us.',
    },
    {
        id: 17,
        category: 'support',
        question: 'Do you offer training for automation systems?',
        answer: 'Yes! Every AI automation system purchase includes: Video tutorials for setup, Documentation, One-on-one setup call (30 mins), 30 days of support for questions, and Free updates for 6 months.',
    },
    {
        id: 18,
        category: 'support',
        question: 'What if I face issues after purchase?',
        answer: 'We\'re here to help! Just reach out via WhatsApp or email with your order ID and describe the issue. For products, we\'ll send new links or fix any issues. For services, we\'ll make revisions until you\'re satisfied.',
    },
];

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
                                <category.icon className="w-4 h-4" />
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
