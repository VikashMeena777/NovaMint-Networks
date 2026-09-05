'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, Check, KeyRound } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await resetPassword(email);
            if (error) {
                toast.error(error.message);
            } else {
                setSuccess(true);
                toast.success('Password reset email dispatched');
            }
        } catch {
            toast.error('Failed to dispatch reset email');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md text-center"
                >
                    <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mx-auto mb-6 text-primary-400">
                            <Check className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold font-display text-white mb-2">Check Your Email</h1>
                        <p className="text-xs text-neutral-400 mb-8 leading-relaxed">
                            We've sent a password reset magic link to <strong className="text-white font-mono">{email}</strong>.
                            Follow the link in your email to choose a new password.
                        </p>
                        <Link href="/login">
                            <button className="w-full py-3 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Sign In</span>
                            </button>
                        </Link>
                    </SpotlightCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-3">
                            <KeyRound className="w-3 h-3" />
                            <span>Security Recovery</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-2">
                            Forgot Password?
                        </h1>
                        <p className="text-xs text-neutral-400">
                            Enter your registered email and we'll dispatch an instant reset magic link.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                Registered Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600 font-mono text-xs"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Sending Reset Link...</span>
                                </>
                            ) : (
                                <span>Send Reset Link</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-xs font-mono text-neutral-400 hover:text-white inline-flex items-center gap-2 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Return to Sign In</span>
                        </Link>
                    </div>
                </SpotlightCard>
            </motion.div>
        </div>
    );
}
