'use client';

import Link from 'next/link';
import {
    FileText,
    AlertTriangle,
    CreditCard,
    Scale,
    ShieldCheck,
    Ban,
    RefreshCw,
    Globe,
    ArrowRight,
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Card, Badge } from '@/components/ui';
import { siteConfig } from '@/lib/config';

const lastUpdated = 'April 10, 2026';

export default function TermsOfServicePage() {
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
                                Terms of{' '}
                                <span className="gradient-text">Service</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Please read these terms carefully before using our services.
                                By using NovaMint Networks, you agree to these terms.
                            </p>
                            <p className="text-sm text-muted-foreground/60 mt-4">
                                Last updated: {lastUpdated}
                            </p>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Terms Content */}
            <section className="section">
                <div className="container">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Section 1 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-purple to-electric-blue flex items-center justify-center shadow-md">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">1. Acceptance of Terms</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>
                                        By accessing or using the NovaMint Networks website (<a href="https://novamintnetworks.in" className="text-nova-purple hover:underline">novamintnetworks.in</a>),
                                        purchasing our services, or creating an account, you agree to be bound by these Terms of Service.
                                    </p>
                                    <p>
                                        If you do not agree to these terms, please do not use our services.
                                        These terms apply to all users, including visitors, registered users, and customers.
                                    </p>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 2 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-cyan flex items-center justify-center shadow-md">
                                        <Globe className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">2. Services Provided</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>NovaMint Networks provides the following services:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li><strong className="text-foreground">AI Automation Systems:</strong> Custom n8n workflows, chatbots, and business automation solutions</li>
                                        <li><strong className="text-foreground">Video Editing:</strong> Professional video editing for YouTube, Instagram Reels, and other platforms</li>
                                        <li><strong className="text-foreground">Content Creation:</strong> Social media content, graphic design, and copywriting</li>
                                        <li><strong className="text-foreground">Digital Products:</strong> Pre-built automation templates, content bundles, and courses</li>
                                        <li><strong className="text-foreground">Social Media Management:</strong> Complete management of social media accounts</li>
                                    </ul>
                                    <p>
                                        Service scope, deliverables, and timelines are specified in individual service agreements
                                        or product descriptions at the time of purchase.
                                    </p>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 3 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-mint-green flex items-center justify-center shadow-md">
                                        <ShieldCheck className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">3. User Accounts</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>When creating an account, you agree to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>Provide accurate and complete information during registration</li>
                                        <li>Keep your account credentials secure and confidential</li>
                                        <li>Notify us immediately of any unauthorized access to your account</li>
                                        <li>Be responsible for all activities that occur under your account</li>
                                        <li>Not share your account with others or create multiple accounts</li>
                                    </ul>
                                    <p>
                                        We reserve the right to suspend or terminate accounts that violate these terms
                                        or engage in fraudulent activity.
                                    </p>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 4 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-purple to-hot-pink flex items-center justify-center shadow-md">
                                        <CreditCard className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">4. Payments & Pricing</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>All prices are listed in Indian Rupees (INR) unless otherwise stated</li>
                                        <li>Payments are processed securely through Cashfree — we do not store your card details</li>
                                        <li>Custom service quotes are valid for 7 days from the date of issue</li>
                                        <li>A 50% advance payment is required for custom services before work begins</li>
                                        <li>Digital products are delivered instantly upon successful payment</li>
                                        <li>Subscription services are billed on a recurring basis as specified at checkout</li>
                                        <li>Prices may change at any time; existing orders will not be affected</li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 5 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hot-pink to-gold flex items-center justify-center shadow-md">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">5. Refund & Cancellation Policy</h2>
                                </div>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Digital Products</h3>
                                        <p>
                                            Due to the digital nature of our products (templates, bundles, courses),
                                            all sales are <strong className="text-foreground">final and non-refundable</strong> once
                                            the product has been delivered or accessed.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Custom Services</h3>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>You may cancel before work begins for a full refund of the advance payment</li>
                                            <li>Once work has started, cancellation fees may apply based on work completed</li>
                                            <li>Revisions are included as specified in the service agreement (typically 2-3 rounds)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Subscriptions</h3>
                                        <p>
                                            You may cancel your subscription at any time. Access continues until
                                            the end of the current billing period. No partial refunds for unused time.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 6 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mint-green to-electric-blue flex items-center justify-center shadow-md">
                                        <Scale className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">6. Intellectual Property</h2>
                                </div>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Our Content</h3>
                                        <p>
                                            All content on the NovaMint Networks website — including text, graphics,
                                            logos, icons, images, and software — is owned by NovaMint Networks and
                                            protected by intellectual property laws. You may not copy, reproduce,
                                            or distribute our content without written permission.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Client Deliverables</h3>
                                        <p>
                                            Upon full payment, you receive full rights to the deliverables created
                                            for your project. We may retain the right to showcase completed work
                                            in our portfolio unless otherwise agreed.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-foreground font-semibold mb-2">Digital Products</h3>
                                        <p>
                                            Purchased digital products are licensed for your personal or business use only.
                                            You may not resell, redistribute, or share purchased products without authorization.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 7 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-hot-pink flex items-center justify-center shadow-md">
                                        <Ban className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">7. Prohibited Activities</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>When using our services, you agree NOT to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>Use our services for any illegal, harmful, or fraudulent purpose</li>
                                        <li>Attempt to hack, exploit, or access unauthorized parts of our platform</li>
                                        <li>Upload malicious code, viruses, or harmful content</li>
                                        <li>Impersonate another person or entity</li>
                                        <li>Scrape, crawl, or extract data from our website without permission</li>
                                        <li>Resell or redistribute purchased digital products</li>
                                        <li>Use our services in a way that violates any applicable laws or regulations</li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 8 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-nova-purple flex items-center justify-center shadow-md">
                                        <AlertTriangle className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold">8. Limitation of Liability</h2>
                                </div>
                                <div className="space-y-3 text-muted-foreground leading-relaxed">
                                    <p>
                                        NovaMint Networks is provided "as is" without warranties of any kind.
                                        To the maximum extent permitted by law:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-2">
                                        <li>We are not liable for any indirect, incidental, or consequential damages arising from use of our services</li>
                                        <li>Our total liability shall not exceed the amount paid by you for the specific service in question</li>
                                        <li>We do not guarantee uninterrupted or error-free service availability</li>
                                        <li>Results from our services (e.g., increased engagement, views) are not guaranteed and depend on many external factors</li>
                                    </ul>
                                </div>
                            </Card>
                        </ScrollReveal>

                        {/* Section 9 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <h2 className="text-xl md:text-2xl font-bold mb-4">9. Governing Law</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms of Service are governed by and construed in accordance with the laws
                                    of India. Any disputes arising from these terms shall be subject to the exclusive
                                    jurisdiction of the courts in India.
                                </p>
                            </Card>
                        </ScrollReveal>

                        {/* Section 10 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <h2 className="text-xl md:text-2xl font-bold mb-4">10. Changes to These Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We reserve the right to update these Terms of Service at any time. Changes will
                                    be posted on this page with an updated date. Continued use of our services after
                                    changes constitutes acceptance of the new terms. We recommend reviewing this page
                                    periodically.
                                </p>
                            </Card>
                        </ScrollReveal>

                        {/* Section 11 */}
                        <ScrollReveal>
                            <Card className="p-6 md:p-8">
                                <h2 className="text-xl md:text-2xl font-bold mb-4">11. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <div className="space-y-2 text-muted-foreground">
                                    <p><strong className="text-foreground">Email:</strong>{' '}
                                        <a href={`mailto:${siteConfig.email}`} className="text-nova-purple hover:underline">{siteConfig.email}</a>
                                    </p>
                                    <p><strong className="text-foreground">Company:</strong> NovaMint Networks</p>
                                    <p><strong className="text-foreground">Website:</strong>{' '}
                                        <a href="https://novamintnetworks.in" className="text-nova-purple hover:underline">novamintnetworks.in</a>
                                    </p>
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
                                    Ready to Get Started?
                                </h2>
                                <p className="text-white/75 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                                    Let's build something amazing together. View our services or get in touch.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/services">
                                        <Button size="lg" className="!bg-none !bg-white !text-nova-purple hover:!bg-white/92 !border-0 shadow-xl shadow-black/20 px-8 font-bold !shadow-none hover:shadow-xl">
                                            View Services
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button variant="outline" size="lg" className="!border-white/40 !text-white hover:!bg-white/10 hover:!border-white/60 px-8 !shadow-none">
                                            Contact Us
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
