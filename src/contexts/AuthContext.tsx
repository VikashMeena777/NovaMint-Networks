'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, fullName: string) => Promise<{ data?: any; error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ data?: any; error: AuthError | null }>;
    signInWithGoogle: () => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = getSupabaseClient();

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data.session as Session | null;
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getInitialSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, newSession: Session | null) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const signUp = async (email: string, password: string, fullName: string) => {
        const origin = typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

        const { data, error } = await supabase.auth.signUp({
            email: email.trim().toLowerCase(),
            password,
            options: {
                data: {
                    full_name: fullName.trim(),
                },
                emailRedirectTo: `${origin}/api/auth/callback?next=/dashboard`,
            },
        });
        return { data, error };
    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password,
        });
        if (!error) {
            router.refresh();
        }
        return { data, error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const signInWithGoogle = async () => {
        const origin = typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/api/auth/callback`,
            },
        });
        return { error };
    };

    const resetPassword = async (email: string) => {
        const origin = typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

        const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
            redirectTo: `${origin}/api/auth/callback?next=/reset-password`,
        });
        return { error };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                signUp,
                signIn,
                signInWithGoogle,
                signOut,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
