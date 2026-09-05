'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
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
    const [hasSession, setHasSession] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const supabase = getSupabaseClient();

        // 1. Check if PKCE code parameter exists in URL and exchange it
        const code = searchParams.get('code');
        if (code) {
            supabase.auth.exchangeCodeForSession(code).then((res: any) => {
                if (res.error) {
                    console.error('Session exchange error:', res.error);
                } else if (res.data?.session) {
                    setHasSession(true);
                }
            });
        }

        // 2. Check if active session or recovery session already exists
        supabase.auth.getSession().then((res: any) => {
            if (res.data?.session) {
                setHasSession(true);
            }
        });

        // 3. Listen for auth state transitions (PASSWORD_RECOVERY event)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: any) => {
            if (event === 'PASSWORD_RECOVERY' || session) {
                setHasSession(true);
            }
        });

        return () => {
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
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) {
                toast.error(error.message || 'Failed to update password');
            } else {
                setIsSuccess(true);
                toast.success('Your password has been successfully updated!');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
        } catch {
            toast.error('An unexpected error occurred while resetting your password');
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <SpotlightCard className="p-8 sm:p-10 bg-[#08090C]/90 border-white/[0.08] shadow-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold font-display text-white mb-2">Password Updated</h2>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                    Your account security credentials have been successfully refreshed. Redirecting you to sign in...
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
                    <span>Credential Reset</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight mb-2">
                    Set New Password
                </h1>
                <p className="text-xs text-neutral-400">
                    Create a strong, unique password for your NovaMint Networks account.
                </p>
            </div>

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
