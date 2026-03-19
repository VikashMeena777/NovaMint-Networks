'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Badge } from '@/components/ui';
import { BookNowModal } from '@/components/booking/BookNowModal';
import { services } from '@/data/services';
import { getIcon } from '@/lib/icon-map';

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
                                                {(() => { const Icon = getIcon(service.icon); return <Icon className="w-6 h-6 text-white" />; })()}
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
