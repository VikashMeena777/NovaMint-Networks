'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    Play,
    ExternalLink,
    Filter,
    Video,
    Bot,
    Palette,
    Users,
    TrendingUp,
    Eye,
    ThumbsUp,
    Calendar,
    ArrowRight
} from 'lucide-react';
import { ScrollReveal, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations';
import { Button, Card, Badge, SectionHeading } from '@/components/ui';

// Project Categories
const categories = [
    { id: 'all', name: 'All Projects', icon: Filter },
    { id: 'video', name: 'Video Editing', icon: Video },
    { id: 'automation', name: 'AI Automation', icon: Bot },
    { id: 'social', name: 'Social Media', icon: Users },
    { id: 'design', name: 'Design', icon: Palette },
];

// Portfolio Projects
const projects = [
    {
        id: 1,
        title: 'YouTube Shorts Automation',
        category: 'automation',
        description: 'Built a complete faceless YouTube channel automation system generating 3 shorts/day with AI scripts, auto-editing, and scheduled posting.',
        image: '/portfolio/youtube-automation.jpg',
        client: 'Content Creator',
        metrics: {
            views: '500K+',
            subscribers: '10K+',
            result: '3x Growth',
        },
        tags: ['n8n', 'AI', 'YouTube', 'Automation'],
        featured: true,
    },
    {
        id: 2,
        title: 'Instagram Growth Management',
        category: 'social',
        description: 'Full Instagram management for a fitness influencer including content creation, posting schedule, and community engagement.',
        image: '/portfolio/instagram-growth.jpg',
        client: 'Fitness Influencer',
        metrics: {
            followers: '0 to 50K',
            engagement: '8.5%',
            result: 'Brand Deals',
        },
        tags: ['Instagram', 'Content', 'Growth'],
        featured: true,
    },
    {
        id: 3,
        title: 'Motivational Reels Pack',
        category: 'video',
        description: 'Created 100+ professional motivational reels with custom editing, captions, and trending audio for a motivation page.',
        image: '/portfolio/motivational-reels.jpg',
        client: 'Motivation Page',
        metrics: {
            reels: '100+',
            avgViews: '50K/reel',
            result: 'Viral Content',
        },
        tags: ['Reels', 'Video Editing', 'Motivation'],
    },
    {
        id: 4,
        title: 'Lead Generation Bot',
        category: 'automation',
        description: 'Custom lead generation automation with auto-capture, scoring, and email sequences for a digital marketing agency.',
        image: '/portfolio/lead-gen.jpg',
        client: 'Marketing Agency',
        metrics: {
            leads: '500+/month',
            conversion: '15%',
            result: '3x ROI',
        },
        tags: ['n8n', 'Lead Gen', 'Email Automation'],
    },
    {
        id: 5,
        title: 'Brand Identity Design',
        category: 'design',
        description: 'Complete brand identity including logo, color palette, social media templates, and brand guidelines.',
        image: '/portfolio/brand-identity.jpg',
        client: 'Startup',
        metrics: {
            deliverables: '20+',
            satisfaction: '5 Stars',
            result: 'Professional Brand',
        },
        tags: ['Logo', 'Branding', 'Design'],
    },
    {
        id: 6,
        title: 'Podcast Clipping Automation',
        category: 'automation',
        description: 'Automated system to extract viral clips from podcasts with AI transcription, caption generation, and scheduling.',
        image: '/portfolio/podcast-clipper.jpg',
        client: 'Podcast Network',
        metrics: {
            clips: '50+/week',
            timeSaved: '20 hrs',
            result: '5x Output',
        },
        tags: ['Podcast', 'AI', 'Automation'],
        featured: true,
    },
    {
        id: 7,
        title: 'E-commerce Product Videos',
        category: 'video',
        description: 'High-converting product showcase videos for an e-commerce store with professional editing and motion graphics.',
        image: '/portfolio/ecommerce-videos.jpg',
        client: 'E-commerce Store',
        metrics: {
            videos: '50+',
            conversionUp: '+35%',
            result: 'Higher Sales',
        },
        tags: ['Product Videos', 'E-commerce', 'Motion Graphics'],
    },
    {
        id: 8,
        title: 'Reddit Stories Automation',
        category: 'automation',
        description: 'Complete Reddit story video automation with AI narration, background clips, and auto-upload to YouTube.',
        image: '/portfolio/reddit-automation.jpg',
        client: 'Faceless Channel',
        metrics: {
            videos: '90+/month',
            subscribers: '25K+',
            result: 'Monetized',
        },
        tags: ['Reddit', 'AI TTS', 'YouTube'],
    },
];

export default function PortfolioPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = projects.filter(
        project => selectedCategory === 'all' || project.category === selectedCategory
    );

    return (
        <>
            {/* Hero Section */}
            <section className="section pt-8">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <SlideUp>
                            <Badge variant="primary" className="mb-2">Our Work</Badge>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Real Results for{' '}
                                <span className="gradient-text">Real Clients</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-2">
                                Explore our portfolio of successful projects across video editing,
                                AI automation, social media management, and design.
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>


            {/* Featured Projects */}
            {selectedCategory === 'all' && (
                <section className="section pb-8">
                    <div className="container">
                        <ScrollReveal>
                            <SectionHeading
                                badge="Featured"
                                title="Highlighted Projects"
                                description="Our most impactful work that drove real results."
                            />
                        </ScrollReveal>

                        <div className="grid md:grid-cols-3 gap-6">
                            {projects.filter(p => p.featured).map((project, index) => (
                                <ScrollReveal key={project.id} delay={index * 0.1}>
                                    <Card className="h-full group overflow-hidden">
                                        {/* Image */}
                                        <div className="h-48 bg-gradient-to-br from-nova-purple/20 to-electric-blue/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                            {project.category === 'video' && <Video className="w-16 h-16 text-nova-purple/50" />}
                                            {project.category === 'automation' && <Bot className="w-16 h-16 text-nova-purple/50" />}
                                            {project.category === 'social' && <Users className="w-16 h-16 text-nova-purple/50" />}
                                            {project.category === 'design' && <Palette className="w-16 h-16 text-nova-purple/50" />}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button variant="secondary" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {project.tags.slice(0, 3).map(tag => (
                                                <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
                                            ))}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-nova-purple transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-base mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Metrics */}
                                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                                            {Object.entries(project.metrics).map(([key, value]) => (
                                                <div key={key} className="text-center">
                                                    <div className="text-lg font-bold gradient-text">{value}</div>
                                                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Projects Grid */}
            <section className="section pt-8">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, index) => (
                            <ScrollReveal key={project.id} delay={index * 0.05}>
                                <Card className="h-full group">
                                    {/* Image Placeholder */}
                                    <div className="h-40 bg-gradient-to-br from-nova-purple/10 to-electric-blue/10 rounded-lg mb-4 flex items-center justify-center">
                                        {project.category === 'video' && <Video className="w-12 h-12 text-nova-purple/40" />}
                                        {project.category === 'automation' && <Bot className="w-12 h-12 text-nova-purple/40" />}
                                        {project.category === 'social' && <Users className="w-12 h-12 text-nova-purple/40" />}
                                        {project.category === 'design' && <Palette className="w-12 h-12 text-nova-purple/40" />}
                                    </div>

                                    {/* Category Badge */}
                                    <Badge variant="primary" className="mb-2 text-xs capitalize">
                                        {project.category}
                                    </Badge>

                                    <h3 className="font-semibold mb-2 group-hover:text-nova-purple transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-base mb-3 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Client */}
                                    <div className="flex items-center gap-2 text-base text-muted-foreground mb-4">
                                        <Calendar className="w-4 h-4" />
                                        Client: {project.client}
                                    </div>

                                    {/* Result Highlight */}
                                    <div className="flex items-center justify-between pt-3 border-t border-border">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-mint-green" />
                                            <span className="font-medium text-mint-green">{project.metrics.result}</span>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            View <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <Card glass className="text-center p-8 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Want Results Like These?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                                Let's discuss your project and create something amazing together.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/contact">
                                    <Button size="lg">
                                        Start Your Project
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/services">
                                    <Button variant="secondary" size="lg">
                                        View Services
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
