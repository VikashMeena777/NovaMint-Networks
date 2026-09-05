'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { toast } from 'sonner';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { signUp, signInWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { error } = await signUp(email, password, fullName);

            if (error) {
                toast.error(error.message);
            } else {
                setSuccess(true);
                toast.success('Confirmation email dispatched');
            }
        } catch {
            toast.error('Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setGoogleLoading(true);
        try {
            const { error } = await signInWithGoogle();
            if (error) {
                toast.error(error.message);
            }
        } catch {
            toast.error('Failed to initiate Google registration');
        } finally {
            setGoogleLoading(false);
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
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                            <Check className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold font-display text-white mb-2">Check Your Inbox</h1>
                        <p className="text-xs text-neutral-400 mb-8 leading-relaxed">
                            We've dispatched a cryptographic verification link to <strong className="text-white font-mono">{email}</strong>.
                            Click the link to activate your client portal workspace.
                        </p>
                        <Link href="/login">
                            <button className="w-full py-3 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer">
                                Proceed to Sign In
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
                            <Sparkles className="w-3 h-3" />
                            <span>Client Registration</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-2">
                            Create Account
                        </h1>
                        <p className="text-xs text-neutral-400">
                            Access premium automations, invoice history, and creative assets.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600 font-mono text-xs"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                Email Address
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

                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                Password (min 6 characters)
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600 font-mono text-xs"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600 font-mono text-xs"
                                    placeholder="••••••••"
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
                                    <span>Registering Account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Client Account</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/[0.06]" />
                        </div>
                        <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-wider">
                            <span className="bg-[#08090C] px-3 text-neutral-500">or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={googleLoading}
                        className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-200 text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {googleLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Sign up with Google</span>
                            </>
                        )}
                    </button>

                    <div className="mt-6 text-center text-xs text-neutral-400">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold underline">
                            Sign in
                        </Link>
                    </div>
                </SpotlightCard>
            </motion.div>
        </div>
    );
}
