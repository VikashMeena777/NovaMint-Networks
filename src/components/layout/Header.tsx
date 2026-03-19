'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingCart, User as UserIcon, Zap } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
    { label: 'Home', href: '/' },
    {
        label: 'Products',
        href: '/products',
        children: [
            { label: 'Reels Bundles', href: '/products?category=reels' },
            { label: 'Premium Mega Bundles', href: '/products?category=mega' },
            { label: 'Courses', href: '/products?category=courses' },
        ],
    },
    {
        label: 'Services',
        href: '/services',
        children: [
            { label: 'Video Editing', href: '/services#creative' },
            { label: 'Social Media Management', href: '/services#marketing' },
            { label: 'Website Development', href: '/services#tech' },
            { label: 'All Services', href: '/services' },
        ],
    },
    { label: 'AI Automations', href: '/ai-automations' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const { setIsOpen, totalItems } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-background/80 backdrop-blur-2xl border-b border-border/60 shadow-lg shadow-black/20'
                    : 'bg-transparent'
            )}
        >
            <nav className="section-container">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                        <motion.div
                            className="w-9 h-9 rounded-xl bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center shadow-lg shadow-nova-purple/30"
                            whileHover={{ scale: 1.08, rotate: 6 }}
                            whileTap={{ scale: 0.94 }}
                        >
                            <Zap className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                        </motion.div>
                        <div className="hidden sm:flex items-baseline gap-0.5">
                            <span className="font-display font-bold text-xl text-nova-purple tracking-tight">Nova</span>
                            <span className="font-display font-bold text-xl text-foreground tracking-tight">Mint</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-0.5">
                        {navItems.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 whitespace-nowrap',
                                        pathname === item.href
                                            ? 'text-nova-purple bg-nova-purple/10'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                    )}
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDown
                                            className={cn(
                                                'w-3.5 h-3.5 transition-transform duration-200',
                                                activeDropdown === item.label && 'rotate-180'
                                            )}
                                        />
                                    )}
                                </Link>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {item.children && activeDropdown === item.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.18, ease: 'easeOut' }}
                                            className="absolute top-full left-0 mt-2 w-52 glass rounded-xl p-1.5 shadow-elegant border border-border/60"
                                        >
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-nova-purple/50" />
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Cart */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                            aria-label="Open cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-nova-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>

                        {/* User / Login */}
                        {user ? (
                            <Link href="/dashboard" className="hidden md:flex">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center text-white font-semibold text-sm cursor-pointer shadow-md shadow-nova-purple/30"
                                >
                                    {user.email?.charAt(0).toUpperCase() || 'U'}
                                </motion.div>
                            </Link>
                        ) : (
                            <Link href="/login" className="hidden md:flex">
                                <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
                                    <UserIcon className="w-4 h-4" />
                                    Login
                                </Button>
                            </Link>
                        )}

                        {/* CTA */}
                        <Link href="/contact" className="hidden md:flex">
                            <Button
                                size="sm"
                                className="rounded-lg text-sm font-semibold shadow-md shadow-nova-purple/25 px-4"
                            >
                                Get Started
                            </Button>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <X className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <Menu className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="lg:hidden bg-background/95 backdrop-blur-2xl border-b border-border/60 shadow-2xl shadow-black/30"
                    >
                        <div className="section-container py-5 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.04 + 0.06 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            'block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                                            pathname === item.href
                                                ? 'text-nova-purple bg-nova-purple/10'
                                                : 'text-foreground hover:bg-white/5 hover:text-nova-purple'
                                        )}
                                    >
                                        {item.label}
                                    </Link>

                                    {item.children && (
                                        <div className="ml-4 mt-1 mb-1 space-y-0.5 border-l border-border/50 pl-3">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28 }}
                                className="pt-4 pb-2 space-y-2.5 border-t border-border/60"
                            >
                                {user ? (
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button size="lg" className="w-full rounded-xl text-base font-bold shadow-lg shadow-nova-purple/25">
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="outline" size="lg" className="w-full gap-2 rounded-xl border-border/60 text-base">
                                                <UserIcon className="w-4 h-4" />
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button size="lg" className="w-full rounded-xl text-base font-bold shadow-lg shadow-nova-purple/25">
                                                Get Started Now
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
