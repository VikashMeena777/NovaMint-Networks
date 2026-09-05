'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingCart, User as UserIcon, Zap, ArrowUpRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'AI Automations', href: '/ai-automations' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'All Digital Bundles', href: '/products' },
      { label: 'Reels Bundles (₹99)', href: '/products?category=reels' },
      { label: 'Mega Creator Bundles', href: '/products?category=mega' },
      { label: 'Creator Academy', href: '/products?category=courses' },
    ],
  },
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-auto">
        <nav
          className={cn(
            'flex items-center justify-between h-16 sm:h-18 px-4 sm:px-6 rounded-2xl transition-all duration-300 border',
            isScrolled
              ? 'bg-[#06070a]/90 backdrop-blur-2xl border-white/[0.12] shadow-2xl shadow-black/60'
              : 'bg-[#08090C]/75 backdrop-blur-xl border-white/[0.08] shadow-xl shadow-black/30'
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-accent flex items-center justify-center shadow-lg shadow-primary-950/50"
              whileHover={{ scale: 1.06, rotate: 4 }}
              whileTap={{ scale: 0.94 }}
            >
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.div>
            <div className="flex items-baseline tracking-tight">
              <span className="font-display font-extrabold text-xl text-white">Nova</span>
              <span className="font-display font-extrabold text-xl text-primary-400">Mint</span>
              <span className="ml-1.5 hidden md:inline-block text-[10px] font-mono uppercase tracking-widest text-neutral-500 border border-white/[0.08] px-1.5 py-0.5 rounded-md">
                NETWORKS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.children && item.children.some(c => c.href === pathname));

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'relative flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200',
                      isActive
                        ? 'text-white bg-white/[0.07] border border-white/[0.1]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse mr-1" />
                    )}
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-3 h-3 transition-transform duration-200 text-neutral-500',
                          activeDropdown === item.label && 'rotate-180 text-white'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-[#090a0f]/95 backdrop-blur-2xl p-2 shadow-2xl border border-white/[0.1] shadow-black/80 z-50"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <span>{child.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-[10px] font-bold font-mono rounded-full flex items-center justify-center shadow-lg shadow-primary-950/60"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Auth / Dashboard */}
            {user ? (
              <Link href="/dashboard" className="hidden sm:flex">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-primary-500/40 transition-all">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-primary-500 to-accent flex items-center justify-center text-[11px] font-bold text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-xs font-medium text-neutral-300">Dashboard</span>
                </div>
              </Link>
            ) : (
              <Link href="/login" className="hidden sm:flex">
                <span className="px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5" />
                  Login
                </span>
              </Link>
            )}

            {/* Strategy Call Primary CTA */}
            <Link href="/contact" className="hidden md:flex">
              <span className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all shadow-lg shadow-white/10 active:scale-[0.98] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                Book Strategy Call
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06] transition-all cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden mt-2 p-4 rounded-2xl bg-[#08090C]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl shadow-black/80 pointer-events-auto"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                        pathname === item.href
                          ? 'text-white bg-primary-500/15 border border-primary-500/30'
                          : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                      )}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <div className="ml-3 my-1 pl-3 border-l border-white/[0.08] space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-3 border-t border-white/[0.08] space-y-2">
                {user ? (
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] border border-white/[0.12] text-center font-semibold text-sm text-white">
                      Go to Dashboard
                    </div>
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-center font-semibold text-sm text-neutral-200">
                      Client Login
                    </div>
                  </Link>
                )}

                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-center font-semibold text-sm text-white shadow-lg shadow-primary-950/50">
                    Book Free Consultation
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
