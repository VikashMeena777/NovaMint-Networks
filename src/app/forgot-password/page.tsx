'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card } from '@/components/ui';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await resetPassword(email);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <Card className="p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                        <p className="text-muted-foreground mb-6">
                            We've sent a password reset link to <strong>{email}</strong>.
                            Please check your email and follow the instructions.
                        </p>
                        <Link href="/login">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="w-5 h-5" />
                                Back to Login
                            </Button>
                        </Link>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
                        <p className="text-muted-foreground">
                            Enter your email and we'll send you a reset link
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Send Reset Link'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
