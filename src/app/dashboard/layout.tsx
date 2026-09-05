'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    CreditCard,
    User,
    Settings,
    LogOut,
    ArrowLeft,
    ExternalLink,
    Sparkles,
    Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface DashboardLayoutProps {
    children: ReactNode;
}

const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Orders & Downloads', href: '/dashboard/orders', icon: Package },
    { name: 'Billing & Invoices', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const { user, signOut, loading } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
            toast.success('Signed out successfully');
        } catch {
            toast.error('Failed to sign out');
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white">
            {/* Top Bar for Mobile & Desktop Context */}
            <div className="border-b border-white/[0.06] bg-[#08090C]/80 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                            <span className="hidden sm:inline">EXIT TO MAIN SITE</span>
                            <span className="sm:hidden">EXIT</span>
                        </Link>
                        <span className="text-white/20">/</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-mono uppercase text-primary-300 tracking-wider">
                                CLIENT PORTAL
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <div className="text-xs font-semibold text-white">
                                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Client'}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500 truncate max-w-[180px]">
                                {user?.email || 'Logged in'}
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-xs font-bold text-white border border-white/20">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Sidebar Navigation */}
                    <aside className="lg:col-span-3">
                        <div className="rounded-2xl border border-white/[0.08] bg-[#08090C]/80 backdrop-blur-xl p-4 sticky top-24 space-y-6">
                            {/* Portal Branding */}
                            <div className="px-3 pt-2 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/15 bg-black/60 shadow-md shadow-primary-950/40 shrink-0">
                                    <Image
                                        src="/images/novamint-logo.jpg"
                                        alt="NovaMint Networks"
                                        width={36}
                                        height={36}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                                        Client Workspace
                                    </div>
                                    <div className="text-sm font-bold font-display text-white">
                                        NovaMint Hub
                                    </div>
                                </div>
                            </div>

                            {/* Nav Links */}
                            <nav className="space-y-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                                                isActive
                                                    ? 'bg-primary-500/15 border border-primary-500/30 text-white shadow-sm'
                                                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                                            }`}
                                        >
                                            <Icon className={`w-4 h-4 ${isActive ? 'text-primary-400' : 'text-neutral-500'}`} />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Divider & Actions */}
                            <div className="pt-4 border-t border-white/[0.06] space-y-2">
                                <Link
                                    href="/products"
                                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-all"
                                >
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Digital Catalog</span>
                                    </span>
                                    <ExternalLink className="w-3 h-3 text-neutral-500" />
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Workspace Body */}
                    <main className="lg:col-span-9 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
