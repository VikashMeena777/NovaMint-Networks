'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';
import { createClient } from '@/lib/supabase/client';

interface BookNowModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName?: string;
}

export function BookNowModal({ isOpen, onClose, serviceName = '' }: BookNowModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: serviceName
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Update service when serviceName prop changes
    useState(() => {
        setFormData(prev => ({ ...prev, service: serviceName }));
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const supabase = createClient();

            const { error: dbError } = await supabase
                .from('bookings')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    status: 'pending',
                    created_at: new Date().toISOString()
                }]);

            if (dbError) {
                // If table doesn't exist, try contact_submissions
                const { error: contactError } = await supabase
                    .from('contact_submissions')
                    .insert([{
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        subject: `Booking Request: ${formData.service}`,
                        message: `Service requested: ${formData.service}\nPhone: ${formData.phone}`,
                        created_at: new Date().toISOString()
                    }]);

                if (contactError) throw contactError;
            }

            setSubmitted(true);
            setTimeout(() => {
                onClose();
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', service: '' });
            }, 2000);
        } catch (err) {
            setError('Failed to submit booking. Please try again.');
            console.error('Booking error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <h2 className="text-xl font-bold">Book Now</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 bg-mint-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-mint-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">Booking Submitted!</h3>
                                        <p className="text-muted-foreground">We'll contact you shortly.</p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-nova-purple focus:ring-1 focus:ring-nova-purple outline-none transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-nova-purple focus:ring-1 focus:ring-nova-purple outline-none transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-nova-purple focus:ring-1 focus:ring-nova-purple outline-none transition-colors"
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Service *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.service}
                                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-nova-purple focus:ring-1 focus:ring-nova-purple outline-none transition-colors"
                                                placeholder="Service you're interested in"
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-red-500 text-sm">{error}</p>
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                                        </Button>
                                    </>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
