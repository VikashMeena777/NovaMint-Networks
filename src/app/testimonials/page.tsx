'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Star,
    Quote,
    ArrowRight,
    Play,
    Users,
    TrendingUp,
    Award,
    CheckCircle2
} from 'lucide-react';
import { ScrollReveal, SlideUp, StaggerContainer, StaggerItem } from '@/components/animations';
import { Button, Card, Badge, SectionHeading } from '@/components/ui';
import { testimonials, testimonialPageStats as stats } from '@/data/testimonials';

export default function TestimonialsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section pt-8">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <SlideUp>
                            <Badge variant="primary" className="mb-2">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Client Reviews
                            </Badge>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Trusted by{' '}
                                <span className="gradient-text">100+ Creators</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Don't just take our word for it. See what our clients have to say
                                about working with NovaMint Networks.
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-border bg-card/50">
                <div className="container">
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <StaggerItem key={stat.label} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-muted-foreground text-base">{stat.label}</div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Featured Testimonials */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Featured Reviews"
                            title="Top Client Stories"
                            description="Real results from real clients."
                        />
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {testimonials.filter(t => t.featured).map((testimonial, index) => (
                            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
                                <Card className="h-full relative">
                                    {/* Quote Icon */}
                                    <Quote className="absolute top-6 right-6 w-8 h-8 text-nova-purple/20" />

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-muted-foreground mb-6 relative z-10">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Metric */}
                                    <div className="bg-mint-green/10 border border-mint-green/20 rounded-lg p-3 mb-6">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-mint-green" />
                                            <span className="font-semibold text-mint-green">{testimonial.metrics}</span>
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center text-white font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{testimonial.name}</div>
                                            <div className="text-muted-foreground text-base">{testimonial.role}</div>
                                            <div className="text-nova-purple text-xs">{testimonial.company}</div>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Testimonials */}
            <section className="section bg-card/50 pt-8">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="All Reviews"
                            title="What Clients Say"
                            description="Hear from creators, influencers, and businesses."
                        />
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <ScrollReveal key={testimonial.id} delay={index * 0.05}>
                                <Card className="h-full">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-muted-foreground text-base mb-4 line-clamp-4">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Metric Badge */}
                                    <Badge variant="success" className="mb-4">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        {testimonial.metrics}
                                    </Badge>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center text-white font-semibold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-base">{testimonial.name}</div>
                                            <div className="text-muted-foreground text-xs">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Testimonials Placeholder */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Coming Soon"
                            title="Video Testimonials"
                            description="Video reviews from our clients - coming soon!"
                        />
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((_, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <Card className="aspect-video flex items-center justify-center bg-muted/50">
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-full bg-nova-purple/20 flex items-center justify-center mx-auto mb-4">
                                            <Play className="w-8 h-8 text-nova-purple" />
                                        </div>
                                        <p className="text-muted-foreground">Coming Soon</p>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <Card glass className="text-center p-8 md:p-12">
                            <Badge variant="primary" className="mb-4">
                                <Award className="w-3 h-3 mr-1" />
                                Join 100+ Happy Clients
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Get Results Like These?
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                                Start your journey with NovaMint Networks today
                                and transform your content workflow.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/contact">
                                    <Button size="lg">
                                        Get Started
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/products">
                                    <Button variant="secondary" size="lg">
                                        Browse Products
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
