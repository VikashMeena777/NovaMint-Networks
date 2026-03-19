'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Instagram,
    Youtube,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Heart,
    Zap,
} from 'lucide-react';
import { Button, Input } from '@/components/ui';

const footerLinks = {
    products: [
        { label: 'Reels Bundles', href: '/products?category=reels' },
        { label: 'Mega Bundles', href: '/products?category=mega' },
        { label: 'Courses', href: '/products?category=courses' },
        { label: 'AI Automations', href: '/products?category=automation' },
    ],
    services: [
        { label: 'Video Editing', href: '/services' },
        { label: 'Social Media', href: '/services' },
        { label: 'Website Building', href: '/services' },
        { label: 'All Services', href: '/services' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Pricing', href: '/pricing' },
    ],
    support: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
    ],
};

const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/novamintnetworks', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#bc1888]' },
    { icon: Youtube,   href: 'https://youtube.com/@novamintnetworks', label: 'YouTube',   color: 'hover:bg-red-600' },
    { icon: Twitter,   href: 'https://twitter.com/novamintnet', label: 'Twitter',         color: 'hover:bg-sky-500' },
    { icon: Linkedin,  href: 'https://linkedin.com/company/novamintnetworks', label: 'LinkedIn', color: 'hover:bg-blue-600' },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-card/50 border-t border-border/60 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-hero-pattern opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

            <div className="relative section-container">

                {/* Newsletter */}
                <div className="py-12 md:py-16 border-b border-border/50">
                    <div className="max-w-2xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center mb-4"
                        >
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-nova-purple/12 border border-nova-purple/25 text-nova-purple text-xs font-bold tracking-widest uppercase">
                                Newsletter
                            </span>
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 }}
                            className="text-2xl md:text-3xl font-bold mb-3 heading-pro"
                        >
                            Stay Ahead of the{' '}
                            <span className="gradient-text">Creator Economy</span>
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground mb-6 leading-relaxed"
                        >
                            Weekly tips, exclusive deals, and free resources delivered to your inbox.
                        </motion.p>
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1"
                            />
                            <Button className="shrink-0 group">
                                Subscribe
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </motion.form>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center shadow-md shadow-nova-purple/30">
                                <Zap className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                            </div>
                            <div className="flex items-baseline gap-0.5">
                                <span className="font-bold text-xl text-nova-purple tracking-tight">Nova</span>
                                <span className="font-bold text-xl text-foreground tracking-tight">Mint</span>
                                <span className="font-medium text-xl text-muted-foreground tracking-tight"> Networks</span>
                            </div>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
                            Your one-stop destination for premium digital products, creative services,
                            and AI automation solutions for content creators.
                        </p>

                        <div className="space-y-3 text-sm text-muted-foreground mb-6">
                            <a href="mailto:hello@novamintnetworks.in" className="flex items-center gap-2.5 hover:text-nova-purple transition-colors group">
                                <Mail className="w-4 h-4 group-hover:text-nova-purple transition-colors flex-shrink-0" />
                                hello@novamintnetworks.in
                            </a>
                            <a href="tel:+919876543210" className="flex items-center gap-2.5 hover:text-nova-purple transition-colors group">
                                <Phone className="w-4 h-4 group-hover:text-nova-purple transition-colors flex-shrink-0" />
                                +91 98765 43210
                            </a>
                            <div className="flex items-center gap-2.5">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>India (Remote worldwide)</span>
                            </div>
                        </div>

                        <div className="flex gap-2.5">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-9 h-9 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-white hover:border-transparent transition-all duration-200 ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="font-bold text-xs tracking-widest text-muted-foreground uppercase mb-5">Products</h4>
                        <ul className="space-y-3">
                            {footerLinks.products.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-nova-purple transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-xs tracking-widest text-muted-foreground uppercase mb-5">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-nova-purple transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-xs tracking-widest text-muted-foreground uppercase mb-5">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-nova-purple transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-xs tracking-widest text-muted-foreground uppercase mb-5">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-nova-purple transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-5 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-muted-foreground">
                        © {year} NovaMint Networks. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Made with <Heart className="w-3.5 h-3.5 text-hot-pink fill-hot-pink" /> in India
                    </p>
                </div>
            </div>
        </footer>
    );
}
