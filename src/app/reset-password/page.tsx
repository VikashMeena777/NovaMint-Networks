'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [verifyingSession, setVerifyingSession] = useState(true);
    const [hasSession, setHasSession] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        let mounted = true;
        const supabase = getSupabaseClient();

        // 1. If code exists in query params (direct arrival), exchange it immediately
        const code = searchParams.get('code');
        if (code) {
            supabase.auth.exchangeCodeForSession(code).then((res: any) => {
                if (mounted) {
                    if (res.data?.session) {
                        setHasSession(true);
                        setVerifyingSession(false);
                    }
                }
            });
        }

        // 2. Check current session (from cookie or browser storage)
        supabase.auth.getSession().then((res: any) => {
            if (mounted) {
                if (res.data?.session) {
                    setHasSession(true);
                    setVerifyingSession(false);
                }
            }
        });

        // 3. Listen to auth state transitions (PASSWORD_RECOVERY or TOKEN_REFRESHED)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
            if (mounted) {
                if (event === 'PASSWORD_RECOVERY' || session) {
                    setHasSession(true);
                    setVerifyingSession(false);
                }
            }
        });

        // 4. Verification timeout safeguard (2.5 seconds)
        const timer = setTimeout(() => {
            if (mounted) {
                setVerifyingSession(false);
            }
        }, 2500);

        return () => {
            mounted = false;
            clearTimeout(timer);
            subscription.unsubscribe();
        };
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters in length');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('New passwords do not match. Please verify.');
            return;
        }

        setLoading(true);
        const supabase = getSupabaseClient();

        try {
            const { data: { session } } = await supabase.auth.getSession();

            // Call dedicated server endpoint that handles both SSR session & Admin API fallback for OAuth accounts
            const response = await fetch('/api/auth/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
                },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();

            if (!response.ok || result.error) {
                // Fallback attempt: client-side updateUser
                const { error: clientError } = await supabase.auth.updateUser({
                    password,
                });

                if (clientError) {
                    throw new Error(result.error || clientError.message || 'Failed to update credentials.');
                }
            }

            setIsSuccess(true);
            toast.success('Your password has been successfully updated! You can now log in.');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: any) {
            console.error('Password reset error:', err);
            toast.error(err.message || 'Failed to reset password. Please request a fresh reset link.');
        } finally {
            setLoading(false);
        }
    };

    if (verifyingSession) {
        return (
            <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl flex flex-col items-center justify-center min-h-[300px] text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-400 mb-4" />
                <p className="text-sm font-semibold text-white mb-1">Verifying Recovery Link...</p>
                <p className="text-xs text-neutral-400">Authenticating secure cryptographic session tokens</p>
            </SpotlightCard>
        );
    }

    if (isSuccess) {
        return (
            <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold font-display text-white mb-2">Password Updated</h2>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                    Your account password has been updated. You can now use this password with your email to sign in anytime.
                </p>
                <Link href="/login">
                    <button
                        type="button"
                        className="w-full py-3 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    >
                        <span>Proceed to Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </Link>
            </SpotlightCard>
        );
    }

    return (
        <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-mono text-primary-300 uppercase tracking-widest mb-3">
                    <KeyRound className="w-3 h-3" />
                    <span>Credential Security</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-2">
                    Set New Password
                </h1>
                <p className="text-xs text-neutral-400">
                    Create a strong password to enable email & password sign-in for your account.
                </p>
            </div>

            {!hasSession && (
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-semibold block mb-0.5">Session Not Detected</span>
                        <span>
                            If you opened this page directly, you need to click the password reset link sent to your email to establish an active recovery session.
                        </span>
                        <div className="mt-2.5">
                            <Link
                                href="/forgot-password"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-mono transition-colors"
                            >
                                Request Fresh Reset Link →
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-11 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600 font-mono text-xs"
                            placeholder="At least 6 characters"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-11 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600 font-mono text-xs"
                            placeholder="Repeat new password"
                            required
                            minLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Protected by end-to-end Supabase cryptographic session</span>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-bold text-xs hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary-950/60 mt-4"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Updating Credentials...</span>
                        </>
                    ) : (
                        <>
                            <span>Update Password</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
                <Link
                    href="/login"
                    className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                >
                    ← Back to Sign In
                </Link>
            </div>
        </SpotlightCard>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 relative">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
            >
                <Suspense
                    fallback={
                        <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl flex items-center justify-center min-h-[300px]">
                            <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
                        </SpotlightCard>
                    }
                >
                    <ResetPasswordForm />
                </Suspense>
            </motion.div>
        </div>
    );
}
