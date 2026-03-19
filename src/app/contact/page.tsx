'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MessageCircle,
    MapPin,
    Send,
    Clock,
    CheckCircle2,
    ArrowRight,
    Instagram,
    Youtube,
    Twitter,
    Linkedin
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Card, Badge, SectionHeading, Input, Textarea } from '@/components/ui';
import { siteConfig } from '@/lib/config';

// Contact Methods
const contactMethods = [
    {
        icon: MessageCircle,
        title: 'WhatsApp',
        description: 'Quick responses, usually within minutes',
        value: siteConfig.whatsapp,
        action: `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`,
        actionLabel: 'Chat Now',
        color: 'bg-green-500/20 text-green-500',
    },
    {
        icon: Mail,
        title: 'Email',
        description: 'For detailed inquiries and proposals',
        value: siteConfig.email,
        action: `mailto:${siteConfig.email}`,
        actionLabel: 'Send Email',
        color: 'bg-nova-purple/20 text-nova-purple',
    },
    {
        icon: Phone,
        title: 'Phone',
        description: 'Available during business hours',
        value: siteConfig.phone,
        action: `tel:${siteConfig.phone}`,
        actionLabel: 'Call Now',
        color: 'bg-electric-blue/20 text-electric-blue',
    },
];

// FAQ Items
const faqs = [
    {
        question: 'How long does it take to complete a project?',
        answer: 'Turnaround time varies by project. Simple edits take 1-2 days, while complex automation setups can take 3-7 days.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'Due to the digital nature of our products, we don\'t offer refunds. However, we provide unlimited revisions until you\'re satisfied.',
    },
    {
        question: 'Can I request custom work?',
        answer: 'Absolutely! We love custom projects. Contact us with your requirements and we\'ll provide a tailored quote.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and wallets via Cashfree.',
    },
];

// Service Types
const serviceTypes = [
    'Video Editing',
    'Social Media Management',
    'AI Automation',
    'Graphic Design',
    'Content Creation',
    'Other',
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.service,
                    message: formData.message
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="section pt-8">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <SlideUp>
                            <Badge variant="primary" className="mb-2">Contact Us</Badge>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                Let's Create Something{' '}
                                <span className="gradient-text">Amazing Together</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Have a project in mind? Want to discuss a custom solution?
                                We're here to help you scale your content empire.
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-12">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-6">
                        {contactMethods.map((method, index) => (
                            <ScrollReveal key={method.title} delay={index * 0.1}>
                                <Card className="text-center h-full">
                                    <div className={`w-14 h-14 rounded-xl ${method.color} flex items-center justify-center mx-auto mb-4`}>
                                        <method.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                                    <p className="text-muted-foreground text-base mb-2">{method.description}</p>
                                    <p className="font-medium mb-4">{method.value}</p>
                                    <a href={method.action} target="_blank" rel="noopener noreferrer">
                                        <Button variant="secondary" className="w-full">
                                            {method.actionLabel}
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </a>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <ScrollReveal>
                            <Card className="p-8">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-mint-green/20 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-8 h-8 text-mint-green" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                        <p className="text-muted-foreground mb-6">
                                            We've received your message and will get back to you within 24 hours.
                                        </p>
                                        <Button onClick={() => setIsSubmitted(false)}>
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid md:grid-cols-2 gap-5">
                                                <Input
                                                    label="Your Name"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                />
                                                <Input
                                                    label="Email Address"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-5">
                                                <Input
                                                    label="Phone Number"
                                                    placeholder="+91 XXXXXXXXXX"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                                <div>
                                                    <label className="block text-base font-medium text-foreground mb-2">
                                                        Service Interested In
                                                    </label>
                                                    <select
                                                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-nova-purple focus:ring-2 focus:ring-nova-purple/20"
                                                        value={formData.service}
                                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                        required
                                                    >
                                                        <option value="">Select a service</option>
                                                        {serviceTypes.map((service) => (
                                                            <option key={service} value={service}>{service}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <Textarea
                                                label="Your Message"
                                                placeholder="Tell us about your project or requirements..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required
                                            />

                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full"
                                                isLoading={isSubmitting}
                                            >
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </Card>
                        </ScrollReveal>

                        {/* Additional Info */}
                        <div className="space-y-8">
                            <ScrollReveal delay={0.1}>
                                <Card>
                                    <h3 className="text-xl font-semibold mb-4">Response Time</h3>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-nova-purple/20 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-nova-purple" />
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">
                                                We typically respond within <strong className="text-foreground">2-4 hours</strong> during
                                                business hours (10 AM - 10 PM IST). For urgent inquiries,
                                                WhatsApp is the fastest way to reach us.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <Card>
                                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Stay updated with our latest work, tips, and offers on social media.
                                    </p>
                                    <div className="flex gap-3">
                                        {[
                                            { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
                                            { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
                                            { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
                                            { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
                                        ].map((social) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-nova-purple hover:border-nova-purple transition-colors"
                                                aria-label={social.label}
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </Card>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <Card>
                                    <h3 className="text-xl font-semibold mb-4">Location</h3>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-mint-green/20 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-mint-green" />
                                        </div>
                                        <div>
                                            <p className="font-medium">India</p>
                                            <p className="text-muted-foreground">
                                                We work remotely and serve clients globally.
                                                No matter where you are, we can help you scale.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section bg-card/50">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="FAQ"
                            title="Frequently Asked Questions"
                            description="Quick answers to common questions."
                        />
                    </ScrollReveal>

                    <div className="max-w-3xl mx-auto">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <ScrollReveal key={index} delay={index * 0.1}>
                                    <Card>
                                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>

                        <ScrollReveal delay={0.4}>
                            <div className="text-center mt-8">
                                <Link href="/faq">
                                    <Button variant="secondary">
                                        View All FAQs
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
