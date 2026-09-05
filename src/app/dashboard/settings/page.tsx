'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, LogOut, KeyRound, MailCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { toast } from 'sonner';

export default function SettingsPage() {
    const { user, signOut, resetPassword } = useAuth();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [sendingReset, setSendingReset] = useState(false);

    const handleToggleNotifications = () => {
        setEmailNotifications(!emailNotifications);
        toast.success(`Email notifications ${!emailNotifications ? 'enabled' : 'disabled'}`);
    };

    const handleToggleMarketing = () => {
        setMarketingEmails(!marketingEmails);
        toast.success(`Marketing telemetry updates ${!marketingEmails ? 'enabled' : 'disabled'}`);
    };

    const handlePasswordReset = async () => {
        if (!user?.email) return;
        setSendingReset(true);
        try {
            const { error } = await resetPassword(user.email);
            if (error) throw error;
            toast.success(`Password reset magic link dispatched to ${user.email}`);
        } catch (error: any) {
            toast.error(error.message || 'Failed to send password reset email');
        } finally {
            setSendingReset(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-2xl"
        >
            <div className="pb-4 border-b border-white/[0.06]">
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">
                    Account Settings
                </h1>
                <p className="text-xs text-neutral-400">
                    Manage your security credentials, notification channels, and portal session.
                </p>
            </div>

            <div className="space-y-6">
                {/* Notifications Card */}
                <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                        <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                            <Bell className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold font-display text-white">
                                Notification Channels
                            </h2>
                            <p className="text-[11px] text-neutral-400">Control automated transaction and marketing dispatches</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center justify-between gap-4">
                            <div className="pr-2">
                                <p className="text-xs font-semibold text-white">Order Confirmations & Invoices</p>
                                <p className="text-[11px] text-neutral-400 mt-0.5">
                                    Instant delivery URLs and GST receipts sent to {user?.email}
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={emailNotifications}
                                onClick={handleToggleNotifications}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                                    emailNotifications ? 'bg-primary-600 shadow-sm shadow-primary-500/40' : 'bg-neutral-800'
                                }`}
                            >
                                <span className="sr-only">Toggle email notifications</span>
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                        emailNotifications ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/[0.04]">
                            <div className="pr-2">
                                <p className="text-xs font-semibold text-white">Asset Drops & Creator Intel</p>
                                <p className="text-[11px] text-neutral-400 mt-0.5">
                                    Weekly breakdowns of trending audio, viral formats, and automation releases
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={marketingEmails}
                                onClick={handleToggleMarketing}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                                    marketingEmails ? 'bg-primary-600 shadow-sm shadow-primary-500/40' : 'bg-neutral-800'
                                }`}
                            >
                                <span className="sr-only">Toggle marketing telemetry updates</span>
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                        marketingEmails ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Security Card */}
                <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Shield className="w-4 h-4" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold font-display text-white">
                                Authentication & Security
                            </h2>
                            <p className="text-[11px] text-neutral-400">Manage credentials and cryptographic session tokens</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold text-white">Account Password</p>
                                <p className="text-[11px] text-neutral-400 mt-0.5">
                                    Send a secure one-click password reset magic link to your registered email
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handlePasswordReset}
                                disabled={sendingReset}
                                className="px-4 py-2.5 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 text-xs font-mono text-primary-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 shrink-0 disabled:opacity-50 shadow-sm"
                            >
                                {sendingReset ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>Dispatching...</span>
                                    </>
                                ) : (
                                    <>
                                        <KeyRound className="w-3.5 h-3.5" />
                                        <span>Reset Password</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/[0.04]">
                            <div>
                                <p className="text-xs font-semibold text-white">Supabase Auth Session</p>
                                <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                                    {user?.email}
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                <MailCheck className="w-3 h-3" />
                                Verified
                            </span>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Session Sign Out */}
                <SpotlightCard className="p-6 bg-[#08090C]/80 border-white/[0.08]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold text-white">Terminate Active Session</p>
                            <p className="text-[11px] text-neutral-400 mt-0.5">
                                Log out of this device. Your downloaded assets and active retainers remain intact.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={signOut}
                            className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-mono transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-sm shadow-red-950/30"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </SpotlightCard>
            </div>
        </motion.div>
    );
}
