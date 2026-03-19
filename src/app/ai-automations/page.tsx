'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    Bot,
    Zap,
    Clock,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Youtube,
    Instagram,
    MessageCircle,
    Mail,
    Database,
    FileText,
    Calendar,
    ShoppingCart,
    CreditCard,
    RefreshCw
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Card, Badge, SectionHeading } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import { BookNowModal } from '@/components/booking/BookNowModal';

// One-time purchase automations
const oneTimeAutomations = [
    {
        id: 'drive-to-reels',
        name: 'DriveToReels Scheduler',
        description: 'Smart video distribution from Google Drive. Multi-platform scheduling with auto-captions and strategic hashtags.',
        price: 99,
        originalPrice: 149,
        icon: Calendar,
        features: [
            'Google Drive integration',
            'Multi-platform scheduling (IG + YT)',
            'Auto-caption generation',
            'Strategic hashtag application',
            'Time-zone optimized posting',
            '30-day setup support'
        ],
        popular: false,
        tag: 'Entry Level'
    },
    {
        id: 'ai-trendradar',
        name: 'AI TrendRadar',
        description: 'Content intelligence system for AI tools content. Daily trending discovery and organized idea database.',
        price: 199,
        originalPrice: 299,
        icon: Sparkles,
        features: [
            'Daily trending AI tool discovery',
            'Organized idea database (Google Sheets)',
            'Content angle suggestions',
            'Competitive analysis insights',
            'Video walkthrough tutorials',
            '30-day setup support'
        ],
        popular: false,
        tag: null
    },
    {
        id: 'storyshorts-engine',
        name: 'StoryShorts AI Engine',
        description: 'Viral story automation for short-form video creation. AI voiceover, gameplay backgrounds, and multi-platform scheduling.',
        price: 249,
        originalPrice: 399,
        icon: Youtube,
        features: [
            'Curated trending story discovery',
            'AI voiceover generation',
            'Gameplay background integration',
            'Professional subtitle styling',
            'Multi-platform scheduling (YT + IG)',
            '30-day setup support'
        ],
        popular: true,
        tag: 'Best Seller'
    },
    {
        id: 'cineclips-creator',
        name: 'CineClips Creator Pro',
        description: 'Movie/series clip production pipeline. Scene extraction, short-form optimization, and automated upload scheduling.',
        price: 399,
        originalPrice: 599,
        icon: FileText,
        features: [
            'Scene identification & extraction',
            'Short-form optimization (9:16)',
            'Quality enhancement',
            'Automated upload scheduling',
            'Video walkthrough tutorials',
            '30-day setup support'
        ],
        popular: false,
        tag: null
    },
    {
        id: 'memefactory-pro',
        name: 'MemeFactory Pro',
        description: 'Meme page acceleration system. Trend-aligned sourcing, custom branding, and direct platform integration.',
        price: 499,
        originalPrice: 749,
        icon: Instagram,
        features: [
            'Trend-aligned content sourcing',
            'Custom branding overlay',
            'Automated formatting & optimization',
            'Direct platform integration',
            'Video walkthrough tutorials',
            '30-day setup support'
        ],
        popular: true,
        tag: 'High Growth'
    },
];

// Monthly subscription automations (Managed Service)
const subscriptionAutomations = [
    {
        id: 'managed-starter',
        name: 'Starter Plan',
        description: 'Perfect for beginners. We host, run, and maintain 1 automation system for you. Zero technical hassle.',
        monthlyPrice: 149,
        yearlyPrice: 1499,
        icon: Zap,
        features: [
            '1 automation system (hosted)',
            'Cloud hosting & maintenance',
            'Regular updates & bug fixes',
            '24/7 system monitoring',
            'Performance reporting',
            'Email support'
        ],
        popular: false,
        tag: 'Entry Level'
    },
    {
        id: 'managed-growth',
        name: 'Growth Plan',
        description: 'For creators scaling 1-2 pages. We manage up to 3 automation systems with priority support.',
        monthlyPrice: 399,
        yearlyPrice: 3999,
        icon: Bot,
        features: [
            'Up to 3 automation systems',
            'Cloud hosting & maintenance',
            'Regular updates & feature upgrades',
            '24/7 system monitoring',
            'Performance reporting',
            'Priority support'
        ],
        popular: true,
        tag: 'Most Popular'
    },
    {
        id: 'managed-empire',
        name: 'Empire Plan',
        description: 'For multi-page operators & agencies. All 5 premium systems fully managed with priority support.',
        monthlyPrice: 599,
        yearlyPrice: 5999,
        icon: Sparkles,
        features: [
            'All 5 automation systems',
            'Cloud hosting & maintenance',
            'Priority updates & custom features',
            '24/7 system monitoring',
            'Detailed performance reporting',
            'Priority support + strategy calls'
        ],
        popular: true,
        tag: 'Best Value'
    },
];

export default function AIAutomationsPage() {
    const [activeTab, setActiveTab] = useState<'one-time' | 'subscription'>('one-time');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const { addItem } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');

    const handleBookNow = (serviceName: string) => {
        setSelectedService(serviceName);
        setIsModalOpen(true);
    };

    const handleAddOneTimeToCart = (automation: typeof oneTimeAutomations[0]) => {
        addItem({
            id: automation.id,
            name: automation.name,
            price: automation.price,
            originalPrice: automation.originalPrice,
            type: 'one-time'
        });
    };

    const handleAddSubscriptionToCart = (automation: typeof subscriptionAutomations[0]) => {
        addItem({
            id: `${automation.id}-${billingCycle}`,
            name: automation.name,
            price: billingCycle === 'monthly' ? automation.monthlyPrice : Math.round(automation.yearlyPrice / 12),
            type: 'subscription',
            billingCycle: billingCycle
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-12 pb-8">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-bg-card/50" />
                    <div
                        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[50px]"
                    />
                </div>
                <div className="container relative z-10">
                    <div className="max-w-4xl">
                        <SlideUp>
                            <Badge variant="primary" className="mb-4">
                                <Bot className="w-4 h-4" />
                                AI-Powered Automations
                            </Badge>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
                                Automate Your Business with{' '}
                                <span className="gradient-text">AI Power</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                                Choose how you want to automate: Get files and configs to set up yourself,
                                or let us manage everything for you with monthly subscriptions.
                            </p>
                        </SlideUp>

                        {/* Stats */}
                        <SlideUp delay={0.3}>
                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">500+</div>
                                        <div className="text-base text-muted-foreground">Automations Deployed</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-mint-green/20 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-mint-green" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">10,000+</div>
                                        <div className="text-base text-muted-foreground">Hours Saved Monthly</div>
                                    </div>
                                </div>
                            </div>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Category Tabs - sits lower on load; sticks under navbar on scroll */}
            <section className="py-4 mt-32 md:mt-40 border-y border-border/50 bg-background sticky top-16 md:top-20 z-30">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            variant={activeTab === 'one-time' ? 'primary' : 'outline'}
                            onClick={() => setActiveTab('one-time')}
                            className="text-base gap-2"
                        >
                            <CreditCard className="w-5 h-5" />
                            One-Time Purchase
                        </Button>
                        <Button
                            variant={activeTab === 'subscription' ? 'primary' : 'outline'}
                            onClick={() => setActiveTab('subscription')}
                            className="text-base gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Monthly Subscription
                        </Button>
                    </div>
                </div>
            </section>

            {/* One-Time Purchase Section */}
            {activeTab === 'one-time' && (
                <section className="section">
                    <div className="container">
                        <ScrollReveal>
                            <SectionHeading
                                badge="One-Time Purchase"
                                title="Buy Once, Set Up Yourself"
                                description="Get all automation files, configs, step-by-step tutorials, and documentation. You set it up once - we don't maintain or update it. Perfect for DIY enthusiasts."
                            />
                        </ScrollReveal>

                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            {oneTimeAutomations.map((automation, index) => (
                                <ScrollReveal key={automation.id} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="relative"
                                    >
                                        <Card className={`h-full p-8 ${automation.popular ? 'border-primary/50 shadow-lg shadow-primary/10' : ''}`}>
                                            {automation.tag && (
                                                <Badge variant="primary" className="absolute -top-3 right-6">
                                                    {automation.tag}
                                                </Badge>
                                            )}

                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                                                    <automation.icon className="w-7 h-7 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-2">{automation.name}</h3>
                                                    <p className="text-base text-muted-foreground">{automation.description}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                {automation.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                                        <span className="text-base">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-3xl font-bold">₹{automation.price.toLocaleString()}</span>
                                                <span className="text-lg text-muted-foreground line-through">₹{automation.originalPrice.toLocaleString()}</span>
                                                <Badge variant="secondary" className="ml-2">
                                                    {Math.round((1 - automation.price / automation.originalPrice) * 100)}% OFF
                                                </Badge>
                                            </div>

                                            <div className="flex gap-3">
                                                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleAddOneTimeToCart(automation)}>
                                                    <ShoppingCart className="w-5 h-5" />
                                                    Add to Cart
                                                </Button>
                                                <Button className="flex-1" onClick={() => handleAddOneTimeToCart(automation)}>
                                                    Buy Now
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Subscription Section */}
            {activeTab === 'subscription' && (
                <section className="section">
                    <div className="container">
                        <ScrollReveal>
                            <SectionHeading
                                badge="Monthly Subscription"
                                title="We Handle Everything"
                                description="Sit back and relax! We host, run, maintain, and update the automations for you. Just pay monthly and focus on growing your page."
                            />
                        </ScrollReveal>

                        {/* Billing Toggle */}
                        <div className="flex justify-center mt-8 mb-12">
                            <div className="inline-flex items-center gap-4 p-2 bg-card rounded-full border border-border">
                                <button
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`px-6 py-3 rounded-full text-base font-medium transition-all ${billingCycle === 'monthly'
                                        ? 'bg-primary text-white'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingCycle('yearly')}
                                    className={`px-6 py-3 rounded-full text-base font-medium transition-all flex items-center gap-2 ${billingCycle === 'yearly'
                                        ? 'bg-primary text-white'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Yearly
                                    <Badge variant="secondary" className="text-xs">Save 17%</Badge>
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {subscriptionAutomations.map((automation, index) => (
                                <ScrollReveal key={automation.id} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="relative"
                                    >
                                        <Card className={`h-full p-8 ${automation.popular ? 'border-primary/50 shadow-lg shadow-primary/10' : ''}`}>
                                            {automation.tag && (
                                                <Badge variant="primary" className="absolute -top-3 right-6">
                                                    {automation.tag}
                                                </Badge>
                                            )}

                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                                                    <automation.icon className="w-7 h-7 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-2">{automation.name}</h3>
                                                    <p className="text-base text-muted-foreground">{automation.description}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                {automation.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                                        <span className="text-base">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-baseline gap-2 mb-6">
                                                <span className="text-3xl font-bold">
                                                    ₹{billingCycle === 'monthly'
                                                        ? automation.monthlyPrice.toLocaleString()
                                                        : Math.round(automation.yearlyPrice / 12).toLocaleString()
                                                    }
                                                </span>
                                                <span className="text-base text-muted-foreground">/month</span>
                                                {billingCycle === 'yearly' && (
                                                    <span className="text-base text-muted-foreground">
                                                        (₹{automation.yearlyPrice.toLocaleString()}/year)
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-auto">
                                                <Button className="w-full gap-2" onClick={() => handleBookNow(automation.name)}>
                                                    <Calendar className="w-5 h-5" />
                                                    Book Now
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us Section */}
            <section className="section bg-card/50">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Why Choose Us"
                            title="Built for Results"
                            description="Our automations are designed by experts and battle-tested by hundreds of businesses."
                        />
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {[
                            {
                                icon: Zap,
                                title: 'Easy to Deploy',
                                description: 'Get started in minutes with our step-by-step setup guides and video tutorials.'
                            },
                            {
                                icon: Clock,
                                title: 'Save 20+ Hours/Week',
                                description: 'Automate repetitive tasks and focus on what matters - growing your business.'
                            },
                            {
                                icon: CheckCircle2,
                                title: 'Proven Results',
                                description: '500+ businesses trust our automations to run their operations smoothly.'
                            }
                        ].map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <Card className="text-center p-8">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                        <item.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-base text-muted-foreground">{item.description}</p>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeading
                            badge="Compare Options"
                            title="Which Plan is Right for You?"
                            description="Choose based on your technical skills and time availability."
                        />
                    </ScrollReveal>

                    <div className="mt-12 overflow-x-auto">
                        <ScrollReveal>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-4 px-6 text-lg font-bold">Feature</th>
                                        <th className="text-center py-4 px-6 text-lg font-bold">
                                            <div className="flex flex-col items-center gap-2">
                                                <CreditCard className="w-6 h-6 text-primary" />
                                                One-Time Purchase
                                            </div>
                                        </th>
                                        <th className="text-center py-4 px-6 text-lg font-bold bg-primary/10 rounded-t-xl">
                                            <div className="flex flex-col items-center gap-2">
                                                <RefreshCw className="w-6 h-6 text-primary" />
                                                Monthly Subscription
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: 'What You Get', oneTime: 'Files, configs, tutorials', monthly: 'Fully managed service' },
                                        { feature: 'Setup', oneTime: 'You set it up yourself', monthly: 'We do everything for you' },
                                        { feature: 'Hosting', oneTime: 'You host on your server', monthly: 'We host it for you' },
                                        { feature: 'Maintenance', oneTime: 'Not included', monthly: 'Included' },
                                        { feature: 'Updates', oneTime: 'Not included', monthly: 'Regular updates included' },
                                        { feature: 'Support', oneTime: 'Setup guide only', monthly: 'Priority 24/7 support' },
                                        { feature: 'Technical Skills Needed', oneTime: 'Basic understanding required', monthly: 'No skills needed' },
                                        { feature: 'Best For', oneTime: 'DIY enthusiasts, developers', monthly: 'Busy creators, agencies' },
                                        { feature: 'Payment', oneTime: 'Pay once', monthly: 'Monthly/Yearly billing' },
                                    ].map((row, index) => (
                                        <tr key={index} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                                            <td className="py-4 px-6 text-base font-medium">{row.feature}</td>
                                            <td className="py-4 px-6 text-center text-base text-muted-foreground">{row.oneTime}</td>
                                            <td className="py-4 px-6 text-center text-base bg-primary/5">{row.monthly}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </ScrollReveal>
                    </div>


                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <Card glass className="text-center p-8 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Need a Custom Automation?
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                                Don't see what you need? We build custom AI automations tailored to your specific business requirements.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/contact">
                                    <Button size="lg">
                                        Request Custom Automation
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/portfolio">
                                    <Button variant="secondary" size="lg">
                                        View Our Work
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </ScrollReveal>
                </div>
            </section>

            {/* Book Now Modal */}
            <BookNowModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceName={selectedService}
            />
        </>
    );
}
