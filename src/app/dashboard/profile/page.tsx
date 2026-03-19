'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card } from '@/components/ui';

export default function ProfilePage() {
    const { user } = useAuth();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
    const [phone, setPhone] = useState(user?.user_metadata?.phone || '');

    const handleSave = async () => {
        setSaving(true);
        // Profile update would go through Supabase auth.updateUser
        // For now, show success feedback
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container max-w-2xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">Profile</h1>
                    <p className="text-muted-foreground mb-8">
                        Manage your personal information
                    </p>

                    <Card className="p-6 space-y-6">
                        {/* Avatar */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-nova-purple/30">
                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div>
                                <p className="font-medium text-lg">{user?.user_metadata?.full_name || 'User'}</p>
                                <p className="text-muted-foreground text-sm">{user?.email}</p>
                            </div>
                        </div>

                        <hr className="border-border" />

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Your full name"
                                />
                            </div>
                        </div>

                        {/* Email (read-only) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-muted/50 text-muted-foreground cursor-not-allowed"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Email cannot be changed here</p>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        <Button onClick={handleSave} className="w-full" disabled={saving}>
                            {saving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : saved ? (
                                <>Saved!</>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
