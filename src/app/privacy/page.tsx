'use client';

import Link from 'next/link';
import {
    Shield,
    Eye,
    Lock,
    Database,
    UserCheck,
    Globe,
    Mail,
    Trash2,
    ArrowRight,
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Card, Badge } from '@/components/ui';
import { siteConfig } from '@/lib/config';

const lastUpdated = 'April 10, 2026';

export default function PrivacyPolicyPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-nova-purple/15 blur-[80px]" />
                <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-electric-blue/12 blur-[70px]" />

                <div className="container relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <SlideUp>
                            <div className="flex justify-center mb-5">
                                <Badge variant="primary">Legal</Badge>
                            </div>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-pro">
                                Privacy{' '}
                                <span className="gradient-text">Policy</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Your privacy matters to us. This policy explains how NovaMint Networks
                                collects, uses, and protects your personal information.
                            </p>
                            <p className="text-sm text-muted-foreground/60 mt-4">
                                Last updated: {lastUpdated}
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Quick Summary Cards */}
            <section className="py-12 border-y border-border/50 bg-card/40 backdrop-blur-sm">
                <div className="container">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { icon: Eye, title: 'Transparent', desc: 'We clearly explain what data we collect', gradient: 'from-nova-purple to-electric-blue' },
                            { icon: Lock, title: 'Secure', desc: 'Your data is encrypted and protected', gradient: 'from-electric-blue to-cyan' },
                            { icon: UserCheck, title: 'Your Control', desc: 'You can access, modify, or delete your data', gradient: 'from-cyan to-mint-green' },
                            { icon: Shield, title: 'No Selling', desc: 'We never sell your personal information', gradient: 'from-hot-pink to-gold' },
                        ].map((item) => (
                            <ScrollReveal key={item.title}>
                                <div className="card-pro p-5 text-center rounded-2xl h-full">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                                        <item.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-bold mb-1">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Policy Content */}
            <section className="section">
                <div className="container">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Section 1 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center shadow-md">
                                        <Database className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">1. Information We Collect</h2>
                                </div>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>We collect the following types of information when you use our services:</p>

                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Account Information</h3>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>Name, email address, and phone number when you sign up or contact us</li>
                                            <li>Google account information (name, email, profile picture) when you sign in with Google</li>
                                            <li>Payment and billing information when you purchase services or products</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Usage Data</h3>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>Pages visited, features used, and interactions with our platform</li>
                                            <li>Device type, browser type, IP address, and operating system</li>
                                            <li>Cookies and similar tracking technologies for analytics</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Service-Related Data</h3>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>Content and files you upload for our services (e.g., video editing projects)</li>
                                            <li>Communication history including messages sent via our contact form</li>
                                            <li>Order details and service preferences</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 2 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-cyan flex items-center justify-center shadow-md">
                                        <Eye className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">2. How We Use Your Information</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>We use the information we collect to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>Provide, maintain, and improve our services and products</li>
                                        <li>Process your orders and payments securely</li>
                                        <li>Send you service-related communications (order updates, invoices)</li>
                                        <li>Respond to your inquiries and customer support requests</li>
                                        <li>Personalize your experience and recommend relevant services</li>
                                        <li>Analyze usage patterns to improve our platform</li>
                                        <li>Prevent fraud and ensure the security of our services</li>
                                        <li>Comply with legal obligations</li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 3 — Google Sign-In */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-mint-green flex items-center justify-center shadow-md">
                                        <Globe className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">3. Google Sign-In & OAuth</h2>
                                </div>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>
                                        When you sign in using Google, we access the following information
                                        from your Google account:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li><strong className="text-foreground">Email address</strong> — To identify your account</li>
                                        <li><strong className="text-foreground">Display name</strong> — To personalize your experience</li>
                                        <li><strong className="text-foreground">Profile picture</strong> — To display in your account</li>
                                    </ul>

                                    <div className="p-4 rounded-xl bg-mint-green/10 border border-mint-green/20 mt-4">
                                        <p className="text-sm">
                                            <strong className="text-foreground">Important:</strong> We only use
                                            Google account data for authentication and account identification.
                                            We do <strong className="text-foreground">not</strong> access your
                                            Gmail inbox, Google Drive, contacts, or any other Google services.
                                            We do <strong className="text-foreground">not</strong> store your
                                            Google password.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 4 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-purple to-hot-pink flex items-center justify-center shadow-md">
                                        <Lock className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">4. Data Storage & Security</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>All data is stored securely using industry-standard encryption (AES-256 at rest, TLS in transit)</li>
                                        <li>Our database is hosted on Supabase with Row Level Security (RLS) enabled</li>
                                        <li>We use secure authentication mechanisms and never store passwords in plain text</li>
                                        <li>Payment processing is handled by trusted third-party providers (Cashfree) — we do not store your full card details</li>
                                        <li>We regularly review our security practices and access controls</li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 5 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hot-pink to-gold flex items-center justify-center shadow-md">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">5. Data Sharing</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>
                                        <strong className="text-foreground">We do NOT sell, rent, or trade your personal information</strong> to
                                        any third parties for marketing or advertising purposes.
                                    </p>
                                    <p>We may share data only with:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li><strong className="text-foreground">Service Providers:</strong> Trusted partners who help operate our platform (Supabase, Vercel, Cashfree, Resend) — bound by strict confidentiality agreements</li>
                                        <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                                        <li><strong className="text-foreground">With Your Consent:</strong> When you explicitly authorize sharing</li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 6 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-green to-electric-blue flex items-center justify-center shadow-md">
                                        <UserCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">6. Your Rights</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>You have the right to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li><strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you</li>
                                        <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete data</li>
                                        <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data and account</li>
                                        <li><strong className="text-foreground">Portability:</strong> Request your data in a structured, machine-readable format</li>
                                        <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing emails at any time</li>
                                        <li><strong className="text-foreground">Revoke Google Access:</strong> Disconnect Google sign-in from your account settings, or revoke access at <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-nova-purple hover:underline">Google Account Permissions</a></li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 7 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-hot-pink flex items-center justify-center shadow-md">
                                        <Trash2 className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">7. Data Deletion</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>To delete your data:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>Email us at <a href={`mailto:${siteConfig.email}`} className="text-nova-purple hover:underline">{siteConfig.email}</a> with the subject "Data Deletion Request"</li>
                                        <li>We will process your request within 30 days</li>
                                        <li>Upon deletion, all your personal data, account information, and uploaded content will be permanently removed from our systems</li>
                                        <li>Some data may be retained if required by law (e.g., transaction records for tax purposes)</li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 8 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-nova-purple flex items-center justify-center shadow-md">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">8. Cookies</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>We use cookies and similar technologies to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>Keep you signed in to your account</li>
                                        <li>Remember your preferences and settings</li>
                                        <li>Understand how you use our platform (analytics)</li>
                                        <li>Improve our services based on usage patterns</li>
                                    </ul>
                                    <p>
                                        You can manage cookie preferences through your browser settings.
                                        Disabling cookies may affect some features of our platform.
                                    </p>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 9 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <h2 className="text-xl md:text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update this Privacy Policy from time to time. When we do, we will
                                    update the "Last updated" date at the top of this page. We encourage you
                                    to review this policy periodically. Continued use of our services after
                                    changes constitutes acceptance of the updated policy.
                                </p>
                            </Card>
                        </ScrollReveal>

                        {/* Section 10 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <h2 className="text-xl md:text-2xl font-bold mb-4">10. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    If you have any questions or concerns about this Privacy Policy or how
                                    we handle your data, please contact us:
                                </p>
                                <div className="space-y-2 text-muted-foreground">
                                    <p><strong className="text-foreground">Email:</strong>{' '}
                                        <a href={`mailto:${siteConfig.email}`} className="text-nova-purple hover:underline">{siteConfig.email}</a>
                                    </p>
                                    <p><strong className="text-foreground">Company:</strong> NovaMint Networks</p>
                                    <p><strong className="text-foreground">Location:</strong> India</p>
                                </div>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-nova-purple via-[hsl(240,70%,55%)] to-electric-blue" />
                            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.15),transparent_55%)]" />

                            <div className="relative z-10 p-10 md:p-16 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 heading-pro">
                                    Have Questions?
                                </h2>
                                <p className="text-white/75 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                                    We're committed to protecting your privacy. Reach out anytime.
                                </p>
                                <Link href="/contact">
                                    <Button size="lg" className="!bg-none !bg-white !text-nova-purple hover:!bg-white/92 !border-0 shadow-xl shadow-black/20 px-8 font-bold !shadow-none hover:shadow-xl">
                                        Contact Us
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
