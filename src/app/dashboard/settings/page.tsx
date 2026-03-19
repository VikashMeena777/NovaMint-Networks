'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Trash2, ArrowLeft, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button, Card } from '@/components/ui';

export default function SettingsPage() {
    const { user, signOut } = useAuth();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);

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

                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-muted-foreground mb-8">
                        Manage your account preferences
                    </p>

                    <div className="space-y-6">
                        {/* Notifications */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Bell className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold">Notifications</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive order updates and receipts
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setEmailNotifications(!emailNotifications)}
                                        className={`w-11 h-6 rounded-full transition-colors relative ${
                                            emailNotifications ? 'bg-primary' : 'bg-muted'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                                emailNotifications ? 'translate-x-[22px]' : 'translate-x-0.5'
                                            }`}
                                        />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Marketing Emails</p>
                                        <p className="text-sm text-muted-foreground">
                                            New products, offers, and updates
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setMarketingEmails(!marketingEmails)}
                                        className={`w-11 h-6 rounded-full transition-colors relative ${
                                            marketingEmails ? 'bg-primary' : 'bg-muted'
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                                marketingEmails ? 'translate-x-[22px]' : 'translate-x-0.5'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </Card>

                        {/* Security */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold">Security</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Change Password</p>
                                        <p className="text-sm text-muted-foreground">
                                            Update your account password
                                        </p>
                                    </div>
                                    <Link href="/forgot-password">
                                        <Button variant="outline" size="sm">
                                            Reset
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Connected Account</p>
                                        <p className="text-sm text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full font-medium">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Account Actions */}
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Settings className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold">Account</h2>
                            </div>
                            <div className="space-y-3">
                                <Button variant="outline" onClick={signOut} className="w-full justify-start gap-2">
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2 text-red-500 border-red-500/30 hover:bg-red-500/10"
                                    disabled
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Account
                                    <span className="ml-auto text-xs text-muted-foreground">Contact support</span>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
