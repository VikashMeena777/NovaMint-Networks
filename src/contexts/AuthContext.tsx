'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError, AuthChangeEvent } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
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
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, newSession: Session | null) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const signUp = async (email: string, password: string, fullName: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });
        return { error };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (!error) {
            router.refresh();
        }
        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
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
