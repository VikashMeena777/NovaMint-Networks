'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Save, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [saving, setSaving] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (user) {
            setFullName(user.user_metadata?.full_name || '');
            setPhone(user.user_metadata?.phone || '');
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        const supabase = getSupabaseClient();

        try {
            // Update Supabase Auth user metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName.trim(),
                    phone: phone.trim(),
                },
            });

            if (authError) throw authError;

            // Also sync to public.profiles table if exists
            try {
                await supabase
                    .from('profiles')
                    .upsert({
                        id: user.id,
                        full_name: fullName.trim(),
                        phone: phone.trim(),
                        updated_at: new Date().toISOString(),
                    });
            } catch {
                // Table might not exist or be read-only; auth metadata is primary
            }

            toast.success('Profile credentials updated successfully');
        } catch (error: any) {
            console.error('Profile update error:', error);
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-2xl"
        >
            <div className="pb-4 border-b border-white/[0.06]">
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">
                    Client Profile
                </h1>
                <p className="text-xs text-neutral-400">
                    Manage your personal information, contact credentials, and communication preferences.
                </p>
            </div>

            <SpotlightCard className="p-6 sm:p-8 bg-[#08090C]/80 border-white/[0.08]">
                {/* Avatar Banner */}
                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/[0.06]">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent flex items-center justify-center text-white text-2xl font-bold font-display shadow-lg shadow-primary-500/20 border border-white/20">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-lg text-white font-display">
                                {fullName || user?.email?.split('@')[0] || 'Client'}
                            </h2>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                Verified
                            </span>
                        </div>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">{user?.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-5">
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
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600"
                                placeholder="Your full name"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Registered Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.06] bg-black/20 text-neutral-400 text-sm cursor-not-allowed font-mono"
                            />
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1.5 font-mono">
                            Email is permanently bound to your Supabase security session.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            Phone / WhatsApp Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-black/50 text-white text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-neutral-600"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-3 px-6 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Syncing to Supabase...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Save Profile Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </SpotlightCard>
        </motion.div>
    );
}
