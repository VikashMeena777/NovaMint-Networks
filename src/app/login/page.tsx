'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { toast } from 'sonner';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const { signIn, signInWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await signIn(email, password);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success('Authenticated successfully');
                router.push(redirectTo);
            }
        } catch {
            toast.error('An unexpected error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            const { error } = await signInWithGoogle();
            if (error) {
                toast.error(error.message);
            }
        } catch {
            toast.error('Failed to initiate Google sign-in');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-3">
                    <Shield className="w-3 h-3" />
                    <span>Client Portal Access</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-2">
                    Welcome Back
                </h1>
                <p className="text-xs text-neutral-400">
                    Sign in to access your digital downloads and dashboard.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                            Password
                        </label>
                        <Link href="/forgot-password" className="text-[11px] text-primary-400 hover:text-primary-300 transition-colors">
                            Forgot password?
                        </Link>
                    </div>
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 mt-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Authenticating...</span>
                        </>
                    ) : (
                        <>
                            <span>Sign In to Portal</span>
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
                onClick={handleGoogleSignIn}
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
                        <span>Continue with Google</span>
                    </>
                )}
            </button>

            <div className="mt-6 text-center text-xs text-neutral-400">
                Don't have an account yet?{' '}
                <Link href="/register" className="text-primary-400 hover:text-primary-300 font-semibold underline">
                    Create one
                </Link>
            </div>
        </SpotlightCard>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Suspense
                    fallback={
                        <div className="min-h-[400px] flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
                        </div>
                    }
                >
                    <LoginForm />
                </Suspense>
            </motion.div>
        </div>
    );
}
