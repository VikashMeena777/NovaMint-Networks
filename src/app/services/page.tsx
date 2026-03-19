'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Video, Image, Users, TrendingUp, Zap, Bot, Palette,
    FileText, Target, Mail, Globe, BookOpen, Megaphone,
    Play, BarChart3, Sparkles, ArrowRight, CheckCircle2, Calendar
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Badge } from '@/components/ui';
import { BookNowModal } from '@/components/booking/BookNowModal';

const services = [
    {
        category: 'Creative',
        label: 'Content That Captivates',
        gradient: 'from-nova-purple to-electric-blue',
        items: [
            {
                icon: Video,
                title: 'Premium Video Editing',
                description: 'Stunning reels, shorts, and videos that captivate audiences and drive engagement. Professional transitions, effects, and color grading included.',
                features: ['Cinematic editing', 'Motion graphics', 'Color grading', 'Sound design'],
                price: 'From ₹499',
            },
            {
                icon: Image,
                title: 'Thumbnail Design',
                description: 'Click-worthy thumbnails that boost your CTR. We study what works and create designs that demand attention across platforms.',
                features: ['A/B testing designs', 'Brand consistency', 'Platform optimized', 'Fast delivery'],
                price: 'From ₹199',
            },
            {
                icon: Palette,
                title: 'Graphic Design',
                description: 'Social media graphics, carousel posts, stories, and visual content that strengthens your brand identity across all channels.',
                features: ['Social media kits', 'Carousel designs', 'Story templates', 'Brand assets'],
                price: 'From ₹299',
            },
            {
                icon: Sparkles,
                title: 'Logo & Branding',
                description: 'Complete brand identity packages including logo design, color palette, typography, and professional brand guidelines.',
                features: ['Logo design', 'Brand guidelines', 'Color palette', 'Typography'],
                price: 'From ₹2,999',
            },
        ],
    },
    {
        category: 'Marketing',
        label: 'Strategies That Scale',
        gradient: 'from-electric-blue to-cyan',
        items: [
            {
                icon: Users,
                title: 'Social Media Management',
                description: 'Complete management of your social channels. We handle content creation, scheduling, engagement, and growth — end to end.',
                features: ['Content calendar', 'Daily posting', 'Community management', 'Analytics'],
                price: 'From ₹4,999/mo',
            },
            {
                icon: TrendingUp,
                title: 'Instagram Growth',
                description: 'Organic growth strategies that build a genuine, engaged audience on Instagram. No bots, no fake followers — just real results.',
                features: ['Hashtag strategy', 'Content optimization', 'Engagement tactics', 'Analytics'],
                price: 'From ₹2,999/mo',
            },
            {
                icon: FileText,
                title: 'Content Strategy',
                description: 'Data-driven content plans that align with your goals and resonate deeply with your target audience on every platform.',
                features: ['Audience research', 'Content calendar', 'Trend analysis', 'Performance tracking'],
                price: 'From ₹1,999',
            },
            {
                icon: Megaphone,
                title: 'Paid Ads Management',
                description: 'Meta and Google ads that deliver ROI. We create, optimize, and scale campaigns for maximum reach and conversions.',
                features: ['Campaign setup', 'A/B testing', 'Budget optimization', 'Reporting'],
                price: 'From ₹4,999/mo',
            },
            {
                icon: Mail,
                title: 'Email Marketing',
                description: 'Automated email sequences and campaigns that nurture leads and convert subscribers into loyal paying customers.',
                features: ['Email automation', 'Campaign design', 'List management', 'Analytics'],
                price: 'From ₹1,499/mo',
            },
        ],
    },
    {
        category: 'Tech & Automation',
        label: 'Systems That Work 24/7',
        gradient: 'from-hot-pink to-gold',
        items: [
            {
                icon: Bot,
                title: 'AI Automation Setup',
                description: 'Custom n8n workflows that automate your entire content and business workflow. Set up once, benefit forever — 24/7.',
                features: ['Custom workflows', 'API integrations', 'Training included', '30-day support'],
                price: 'From ₹4,999',
            },
            {
                icon: Play,
                title: 'YouTube Automation',
                description: 'Complete faceless YouTube channel automation. AI scripts, auto-editing, and scheduled uploads — fully on autopilot.',
                features: ['AI scriptwriting', 'Auto-editing', 'Thumbnail generation', 'SEO optimization'],
                price: 'From ₹9,999',
            },
            {
                icon: Target,
                title: 'Lead Generation',
                description: 'Automated lead capture and nurturing systems that work 24/7 to grow your business while you sleep.',
                features: ['Lead capture forms', 'Auto-scoring', 'Email sequences', 'CRM integration'],
                price: 'From ₹3,999',
            },
            {
                icon: Globe,
                title: 'Website Development',
                description: 'Modern, responsive websites built with Next.js. Fast, SEO-optimized, and conversion-focused for maximum impact.',
                features: ['Responsive design', 'SEO optimized', 'Fast loading', 'CMS integration'],
                price: 'From ₹9,999',
            },
            {
                icon: BookOpen,
                title: 'Course Creation',
                description: 'End-to-end course production including curriculum design, video production, platform setup, and marketing materials.',
                features: ['Curriculum design', 'Video production', 'Platform setup', 'Marketing materials'],
                price: 'From ₹14,999',
            },
        ],
    },
];

export default function ServicesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');

    const handleBookNow = (serviceName: string) => {
        setSelectedService(serviceName);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Hero */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-nova-purple/12 blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/5 w-60 h-60 rounded-full bg-electric-blue/10 blur-[70px]" />

                <div className="container relative">
                    <div className="max-w-4xl">
                        <SlideUp>
                            <div className="mb-5">
                                <Badge variant="primary">Our Services</Badge>
                            </div>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight heading-pro">
                                Everything You Need to
                                <br />
                                <span className="gradient-text">Win at Digital</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                From stunning content creation to powerful automations,
                                we offer comprehensive solutions to transform your entire digital presence.
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Services Sections */}
            {services.map((section, sectionIndex) => (
                <section
                    key={section.category}
                    className={`py-16 md:py-24 ${sectionIndex % 2 === 1 ? 'bg-card/30' : ''}`}
                >
                    <div className="container">
                        <ScrollReveal>
                            <div className="mb-12 md:mb-16">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${section.gradient}`} />
                                    <Badge variant="primary">{section.category}</Badge>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold heading-pro">
                                    {section.label}
                                </h2>
                            </div>
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                            {section.items.map((service, index) => (
                                <ScrollReveal key={service.title} delay={index * 0.08}>
                                    <motion.div
                                        className="group card-pro p-7 md:p-8 rounded-2xl h-full"
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                    >
                                        <div className="flex items-start gap-5">
                                            <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <service.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                    <h3 className="text-lg font-bold group-hover:text-nova-purple transition-colors">{service.title}</h3>
                                                    <span className="text-nova-purple font-mono font-bold text-sm whitespace-nowrap">
                                                        {service.price}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                                                    {service.description}
                                                </p>
                                                <div className="grid grid-cols-2 gap-2 mb-5">
                                                    {service.features.map((feature) => (
                                                        <div key={feature} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-nova-purple flex-shrink-0" />
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                                <Button
                                                    className="w-full"
                                                    onClick={() => handleBookNow(service.title)}
                                                >
                                                    <Calendar className="w-4 h-4" />
                                                    Book Now
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-nova-purple via-[hsl(240,70%,55%)] to-electric-blue" />
                            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.15),transparent_55%)]" />

                            <div className="relative z-10 p-10 md:p-16 lg:p-20 text-center">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 heading-pro">
                                    Need Something Custom?
                                </h2>
                                <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                                    Don't see exactly what you need? We love custom projects.
                                    Let's discuss your unique requirements.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/contact">
                                        <Button size="lg" className="bg-white text-nova-purple hover:bg-white/92 border-0 shadow-xl shadow-black/20 px-8 font-bold">
                                            Get Custom Quote
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/pricing">
                                        <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8">
                                            View Pricing
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <BookNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceName={selectedService} />
        </>
    );
}
