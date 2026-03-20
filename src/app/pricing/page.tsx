'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Check, X, Zap, Star, ArrowRight,
    Crown, Sparkles, MessageCircle, HelpCircle
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Badge, SectionHeading, Price } from '@/components/ui';

import { servicePlans, automationPricing, pricingFaqs as faqs } from '@/data/pricing';

export default function PricingPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-nova-purple/12 blur-[80px]" />

                <div className="container relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <SlideUp>
                            <div className="flex justify-center mb-5">
                                <Badge variant="primary">Pricing</Badge>
                            </div>
                        </SlideUp>
                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 heading-pro">
                                Simple, Transparent{' '}
                                <span className="gradient-text">Pricing</span>
                            </h1>
                        </SlideUp>
                        <SlideUp delay={0.2}>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Choose the plan that fits your needs. All plans include quality work
                                and dedicated support. No hidden fees, ever.
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Service Plans */}
            <section className="py-12 md:py-20">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Monthly Plans"
                            title="Service"
                            titleHighlight="Packages"
                            description="Ongoing support for consistent, high-quality content creation."
                        />
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
                        {servicePlans.map((plan, index) => (
                            <ScrollReveal key={plan.name} delay={index * 0.1}>
                                <div className={`relative h-full card-pro rounded-2xl p-7 md:p-8 flex flex-col ${plan.popular ? 'border-nova-purple/50 shadow-xl shadow-nova-purple/15' : ''}`}>
                                    {plan.popular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                            <Badge variant="premium" className="shadow-lg shadow-nova-purple/25">
                                                <Star className="w-3 h-3 mr-1" />
                                                Most Popular
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Icon + Name */}
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-5 shadow-md`}>
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                                    </div>

                                    <Price amount={plan.price} period={plan.period} size="lg" className="mb-6" />

                                    <div className="space-y-3 mb-7 flex-1">
                                        {plan.features.map((feature) => (
                                            <div
                                                key={feature.name}
                                                className={`flex items-center gap-3 text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50'}`}
                                            >
                                                {feature.included ? (
                                                    <Check className="w-4 h-4 text-nova-purple flex-shrink-0" />
                                                ) : (
                                                    <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                                                )}
                                                <span className={!feature.included ? 'line-through' : ''}>
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={plan.href}>
                                        <Button
                                            variant={plan.popular ? 'default' : 'secondary'}
                                            className="w-full"
                                        >
                                            {plan.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Automation Products */}
            <section className="py-12 md:py-20 bg-card/30">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="One-Time Purchase"
                            title="AI Automation"
                            titleHighlight="Systems"
                            description="Buy once, use forever. No monthly fees."
                        />
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                        {automationPricing.map((item, index) => (
                            <ScrollReveal key={item.name} delay={index * 0.1}>
                                <div className="card-pro h-full p-6 rounded-2xl flex flex-col">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-md`}>
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-base mb-2">{item.name}</h3>
                                    <Price amount={item.price} originalAmount={item.originalPrice} size="md" className="mb-4" />

                                    <div className="space-y-2 mb-6 flex-1">
                                        {item.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Check className="w-3.5 h-3.5 text-nova-purple flex-shrink-0" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={item.href}>
                                        <Button variant="secondary" className="w-full">
                                            Buy Now
                                        </Button>
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Bundles */}
            <section className="py-12 md:py-20">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Digital Products"
                            title="Content Bundle"
                            titleHighlight="Pricing"
                            description="Ready-to-use viral content with resell rights."
                        />
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <ScrollReveal>
                            <div className="card-pro p-8 text-center rounded-2xl h-full flex flex-col">
                                <Badge variant="success" className="self-center mb-4">47 Categories</Badge>
                                <h3 className="text-2xl font-bold mb-2">Reels Bundles</h3>
                                <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">
                                    50+ viral-ready reels per bundle from various categories
                                </p>
                                <Price amount={99} size="lg" className="mb-1" />
                                <p className="text-sm text-muted-foreground mb-6">per bundle</p>
                                <Link href="/products?category=reels">
                                    <Button className="w-full">
                                        Browse Bundles
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="card-pro p-8 text-center rounded-2xl h-full flex flex-col border-gold/40 shadow-lg shadow-gold/10 relative">
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <Badge variant="premium" className="shadow-lg shadow-nova-purple/25">
                                        <Crown className="w-3 h-3 mr-1" />
                                        Best Value
                                    </Badge>
                                </div>
                                <Badge variant="warning" className="self-center mb-4">24 Mega Collections</Badge>
                                <h3 className="text-2xl font-bold mb-2">Mega Bundles</h3>
                                <p className="text-muted-foreground text-sm mb-5 leading-relaxed flex-1">
                                    500 to 30,000+ reels per bundle — massive collections for power users
                                </p>
                                <Price amount={149} size="lg" className="mb-1" />
                                <p className="text-sm text-muted-foreground mb-6">per mega bundle</p>
                                <Link href="/products?category=mega">
                                    <Button className="w-full">
                                        View Mega Bundles
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 md:py-20 bg-card/30">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="FAQ"
                            title="Common"
                            titleHighlight="Questions"
                            description="Quick answers about pricing and payments."
                        />
                    </ScrollReveal>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <ScrollReveal key={index} delay={index * 0.05}>
                                <div className="card-pro p-6 rounded-xl">
                                    <div className="flex gap-4">
                                        <HelpCircle className="w-5 h-5 text-nova-purple flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="font-bold mb-2">{faq.question}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 md:py-20">
                <div className="container">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-nova-purple via-[hsl(240,70%,55%)] to-electric-blue" />
                            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />

                            <div className="relative z-10 p-10 md:p-16 text-center">
                                <Badge className="mb-5 bg-white/15 !text-white !border-0 !shadow-none">
                                    <MessageCircle className="w-3 h-3 mr-1" />
                                    Need Custom Pricing?
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 heading-pro">
                                    Let's Discuss Your Requirements
                                </h2>
                                <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                                    Every business is unique. Contact us for a custom quote
                                    tailored to your specific needs and budget.
                                </p>
                                <Link href="/contact">
                                    <Button size="lg" className="!bg-none !bg-white/20 !text-white hover:!bg-white/30 !border !border-white/30 px-8 font-bold !shadow-none hover:shadow-xl backdrop-blur-sm">
                                        Get Custom Quote
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
