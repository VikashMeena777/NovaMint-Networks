'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Target,
    Lightbulb,
    Heart,
    Zap,
    Users,
    Award,
    Clock,
    Rocket,
    CheckCircle2,
    ArrowRight,
    Calendar,
    Star,
} from 'lucide-react';
import {
    ScrollReveal,
    SlideUp,
    StaggerContainer,
    StaggerItem
} from '@/components/animations';
import { Button, Card, Badge, SectionHeading } from '@/components/ui';

const teamMembers = [
    {
        name: 'Vikash Meena',
        role: 'Founder & CEO',
        bio: 'Passionate about AI automation and helping creators scale their content empire to new heights.',
        gradient: 'from-nova-purple to-electric-blue',
        initials: 'VM',
    },
];

const values = [
    { icon: Target,    title: 'Quality First',   description: 'We never compromise on quality. Every deliverable meets our high standards.',    gradient: 'from-nova-purple to-electric-blue' },
    { icon: Lightbulb, title: 'Innovation',       description: 'We stay ahead with the latest AI tools and automation technologies.',             gradient: 'from-electric-blue to-cyan' },
    { icon: Heart,     title: 'Client-Focused',   description: 'Your success is our success. We go the extra mile for every client.',            gradient: 'from-cyan to-mint-green' },
    { icon: Zap,       title: 'Speed',            description: 'Fast turnaround times without compromising on quality — ever.',                  gradient: 'from-hot-pink to-gold' },
];

const milestones = [
    { year: '2024', title: 'Founded NovaMint Networks',  description: 'Started with a vision to help creators scale with AI automation.',   icon: Rocket },
    { year: '2024', title: '50+ Projects Completed',     description: 'Reached our first major milestone in successful client deliveries.',  icon: CheckCircle2 },
    { year: '2025', title: 'AI Automation Launch',        description: 'Launched our premium AI automation systems for content creators.',    icon: Zap },
    { year: '2025', title: '100+ Happy Clients',          description: 'Growing community of satisfied creators, agencies and businesses.',   icon: Users },
];

const stats = [
    { value: '50+',  label: 'Projects Delivered', icon: CheckCircle2, gradient: 'from-nova-purple to-electric-blue' },
    { value: '100+', label: 'Happy Clients',       icon: Users,        gradient: 'from-electric-blue to-cyan' },
    { value: '500+', label: 'Hours Saved',         icon: Clock,        gradient: 'from-cyan to-mint-green' },
    { value: '5★',   label: 'Client Rating',       icon: Award,        gradient: 'from-hot-pink to-gold' },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-nova-purple/15 blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-electric-blue/12 blur-[70px]" />

                <div className="container relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <SlideUp>
                            <div className="flex justify-center mb-5">
                                <Badge variant="primary">About Us</Badge>
                            </div>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 heading-pro">
                                Building the Future of{' '}
                                <span className="gradient-text">Content Creation</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                NovaMint Networks is a premium agency helping creators, influencers,
                                and businesses scale their content with AI automation and professional services.
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-border/50 bg-card/40 backdrop-blur-sm">
                <div className="container">
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat) => (
                            <StaggerItem key={stat.label} className="text-center">
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                                <div className="text-muted-foreground text-sm">{stat.label}</div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Our Story */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <ScrollReveal>
                            <div>
                                <div className="flex mb-5">
                                    <Badge variant="primary">Our Story</Badge>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 heading-pro">
                                    From Passion to{' '}
                                    <span className="gradient-text">Premium Agency</span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        NovaMint Networks was born from a simple observation: creators were
                                        spending too much time on repetitive tasks instead of focusing on
                                        what they do best — creating amazing content.
                                    </p>
                                    <p>
                                        We started by building automation systems for our own content channels,
                                        and the results were incredible. What used to take hours now took minutes.
                                        That's when we knew we had to share these solutions with other creators.
                                    </p>
                                    <p>
                                        Today, we're proud to have helped hundreds of creators and businesses
                                        transform their content workflows. Our mission: make content creation
                                        effortless, scalable, and profitable.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2}>
                            <div className="relative">
                                <div className="aspect-square rounded-3xl bg-gradient-to-br from-nova-purple/20 via-electric-blue/15 to-cyan/10 flex items-center justify-center border border-border/40">
                                    <div className="text-center">
                                        <Rocket className="w-24 h-24 text-nova-purple/60 mx-auto mb-4" />
                                        <p className="text-sm font-semibold text-muted-foreground">Launching creators to the moon 🚀</p>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-nova-purple/20 blur-xl" />
                                <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-electric-blue/15 blur-xl" />

                                {/* Floating badge */}
                                <div className="absolute top-6 -right-4 card-pro p-3 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-xl">
                                    <Star className="w-4 h-4 fill-gold text-gold" />
                                    <span>99% Satisfaction</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-card/30">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Our Values"
                            title="What Drives"
                            titleHighlight="Us Forward"
                            description="The principles that guide everything we create and deliver."
                        />
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                        {values.map((value, index) => (
                            <ScrollReveal key={value.title} delay={index * 0.1}>
                                <div className="card-pro p-6 md:p-7 h-full text-center rounded-2xl group hover:scale-[1.02] transition-transform duration-300">
                                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <value.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Our Team"
                            title="Meet the"
                            titleHighlight="Creators"
                            description="The passionate people behind NovaMint Networks."
                        />
                    </ScrollReveal>

                    <div className="max-w-sm mx-auto">
                        {teamMembers.map((member, index) => (
                            <ScrollReveal key={member.name} delay={index * 0.1}>
                                <div className="card-pro p-8 text-center rounded-2xl">
                                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 shadow-xl shadow-nova-purple/25`}>
                                        <span className="text-3xl font-bold text-white">{member.initials}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-nova-purple font-semibold text-sm mb-4">{member.role}</p>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section bg-card/30">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Our Journey"
                            title="Key"
                            titleHighlight="Milestones"
                            description="Key moments in our growth story."
                        />
                    </ScrollReveal>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-nova-purple/60 via-electric-blue/40 to-transparent" />

                            <div className="space-y-6">
                                {milestones.map((milestone, index) => (
                                    <ScrollReveal key={index} delay={index * 0.1}>
                                        <div className="flex gap-6 relative pl-1">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center z-10 shadow-lg shadow-nova-purple/25">
                                                <milestone.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="card-pro flex-1 p-5 rounded-xl">
                                                <span className="text-nova-purple font-mono text-xs font-bold">{milestone.year}</span>
                                                <h3 className="text-base font-bold mt-1 mb-1">{milestone.title}</h3>
                                                <p className="text-muted-foreground text-sm">{milestone.description}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-nova-purple via-[hsl(240,70%,55%)] to-electric-blue" />
                            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.15),transparent_55%)]" />

                            <div className="relative z-10 p-10 md:p-16 text-center">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 heading-pro">
                                    Ready to Work With Us?
                                </h2>
                                <p className="text-white/75 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                                    Let's discuss how we can help you scale your content and achieve your goals.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/contact">
                                        <Button size="lg" className="bg-white text-nova-purple hover:bg-white/92 border-0 shadow-xl shadow-black/20 px-8 font-bold">
                                            Get in Touch
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/services">
                                        <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8">
                                            View Our Services
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
