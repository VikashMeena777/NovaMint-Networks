'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Package,
    Sparkles,
    Zap,
    BookOpen,
    Crown,
    Star,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Grid3X3,
    List,
    ChevronDown,
    ShoppingCart
} from 'lucide-react';
import { ScrollReveal, SlideUp } from '@/components/animations';
import { Button, Badge } from '@/components/ui';
import { useCart } from '@/context/CartContext';

// Product Categories
const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'reels', name: 'Reels Bundles', icon: Sparkles, count: 47 },
    { id: 'mega', name: 'Mega Bundles', icon: Crown, count: 24 },
    { id: 'courses', name: 'Courses', icon: BookOpen, count: 5 },
];

// Reels Bundle Categories (47 items)
const reelsBundles = [
    { id: 1, slug: 'fitness-gym-reels', name: 'Fitness & Gym', description: 'Workout motivation, gym tips, and fitness journey reels', count: '50+', price: 99 },
    { id: 2, slug: 'motivational-reels', name: 'Motivational', description: 'Inspiring quotes, success stories, and mindset content', count: '50+', popular: true, price: 99 },
    { id: 3, slug: 'luxury-lifestyle-reels', name: 'Luxury Lifestyle', description: 'Premium lifestyle, cars, travel, and success aesthetic', count: '50+', bestseller: true, price: 99 },
    { id: 4, slug: 'nature-travel-reels', name: 'Nature & Travel', description: 'Stunning landscapes, travel destinations, and nature beauty', count: '50+', price: 99 },
    { id: 5, slug: 'sanatan-dharm-reels', name: 'Sanatan Dharm', description: 'Spiritual content, mantras, temple visuals, and dharmic wisdom', count: '50+', popular: true, price: 99 },
    { id: 6, slug: 'tech-gadgets-reels', name: 'Tech & Gadgets', description: 'Latest gadgets, tech reviews, and futuristic content', count: '50+', price: 99 },
    { id: 7, slug: 'food-cooking-reels', name: 'Food & Cooking', description: 'Recipes, food photography, and cooking tutorials', count: '50+', price: 99 },
    { id: 8, slug: 'fashion-style-reels', name: 'Fashion & Style', description: 'Outfit ideas, fashion trends, and styling tips', count: '50+', price: 99 },
    { id: 9, slug: 'business-finance-reels', name: 'Business & Finance', description: 'Money tips, investing, and entrepreneurship', count: '50+', price: 99 },
    { id: 10, slug: 'gaming-reels', name: 'Gaming', description: 'Gaming clips, highlights, and gaming culture', count: '50+', price: 99 },
    { id: 11, slug: 'cars-automobiles-reels', name: 'Cars & Automobiles', description: 'Supercars, car reviews, and automotive content', count: '50+', bestseller: true, price: 99 },
    { id: 12, slug: 'comedy-entertainment-reels', name: 'Comedy & Entertainment', description: 'Funny clips, memes, and entertainment content', count: '50+', price: 99 },
];

// Mega Bundles (24 items)
const megaBundles = [
    { id: 1, slug: 'ultimate-motivation-pack', name: 'Ultimate Motivation Pack', pieces: '5,000+', description: 'Massive collection of motivational quotes, success stories, and mindset content', price: 149, popular: true },
    { id: 2, slug: 'luxury-empire-bundle', name: 'Luxury Empire Bundle', pieces: '3,000+', description: 'Cars, jets, mansions, watches, and ultimate luxury lifestyle content', price: 149, bestseller: true },
    { id: 3, slug: 'fitness-mega-collection', name: 'Fitness Mega Collection', pieces: '2,500+', description: 'Complete gym and fitness content library for fitness pages', price: 149 },
    { id: 4, slug: 'spiritual-wisdom-pack', name: 'Spiritual Wisdom Pack', pieces: '4,000+', description: 'Comprehensive Sanatan Dharm, meditation, and spiritual content', price: 149, popular: true },
    { id: 5, slug: 'complete-nature-bundle', name: 'Complete Nature Bundle', pieces: '2,000+', description: 'Mountains, oceans, forests, and stunning natural landscapes', price: 149 },
    { id: 6, slug: 'business-mastery-pack', name: 'Business Mastery Pack', pieces: '3,500+', description: 'Entrepreneurship, money mindset, and business content', price: 149 },
];

// Courses
const courses = [
    { id: 1, name: 'Complete n8n Automation Mastery', description: 'Master workflow automation from zero to expert', status: 'coming-soon' },
    { id: 2, name: 'Social Media Growth Blueprint', description: 'Proven strategies to grow on Instagram, YouTube, and TikTok', status: 'coming-soon' },
    { id: 3, name: 'AI Content Creation Course', description: 'Create viral content using AI tools and automation', status: 'coming-soon' },
    { id: 4, name: 'Faceless YouTube Mastery', description: 'Build and monetize faceless YouTube channels', status: 'coming-soon' },
    { id: 5, name: 'Digital Product Business', description: 'Launch and scale your digital product empire', status: 'coming-soon' },
];

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { addItem } = useCart();

    const handleAddToCart = (product: { slug: string; name: string; price: number }) => {
        addItem({
            id: product.slug,
            name: product.name,
            price: product.price,
            type: 'one-time'
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-12 pb-8">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-bg-card/50" />
                    <motion.div
                        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-electric-blue/10 blur-[50px]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 15, repeat: Infinity }}
                    />
                </div>

                <div className="container relative z-10">
                    <div className="max-w-4xl">
                        <SlideUp>
                            <Badge variant="primary" className="mb-4">Digital Products</Badge>
                        </SlideUp>

                        <SlideUp delay={0.1}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                                Premium Content
                                <br />
                                <span className="gradient-text">Ready to Use</span>
                            </h1>
                        </SlideUp>

                        <SlideUp delay={0.2}>
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                                Viral-ready reels bundles, powerful AI automations, and expert courses.
                                All with resell rights included.
                            </p>
                        </SlideUp>

                        {/* Search */}
                        <SlideUp delay={0.3}>
                            <div className="relative max-w-xl">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-card/80 border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-nova-purple text-lg"
                                />
                            </div>
                        </SlideUp>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="sticky top-20 z-40 py-6 bg-background border-b border-border/30">
                <div className="container">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
                  ${selectedCategory === category.id
                                        ? 'bg-nova-purple text-white'
                                        : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }
                `}
                            >
                                <category.icon className="w-5 h-5" />
                                {category.name}
                                {category.count && (
                                    <span className={`text-base px-2 py-0.5 rounded-full ${selectedCategory === category.id
                                        ? 'bg-white/20'
                                        : 'bg-muted'
                                        }`}>
                                        {category.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reels Bundles Section */}
            <AnimatePresence mode="wait">
                {(selectedCategory === 'all' || selectedCategory === 'reels') && (
                    <motion.section
                        key="reels"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-24"
                    >
                        <div className="container">
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-4">
                                    <h2 className="text-3xl md:text-4xl font-bold">Reels Bundles</h2>
                                    <Badge variant="success">47 Categories</Badge>
                                </div>
                                <p className="text-muted-foreground text-lg max-w-2xl">
                                    50+ viral-ready reels per bundle. Full resell rights included.
                                </p>
                                <div className="flex items-baseline gap-3 mt-4">
                                    <span className="text-4xl font-bold gradient-text">₹99</span>
                                    <span className="text-muted-foreground">per bundle</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reelsBundles.map((bundle, index) => (
                                    <ScrollReveal key={bundle.id} delay={index * 0.05}>
                                        <motion.div
                                            className="group p-8 rounded-2xl bg-card border border-border/30 hover:border-nova-purple/30 transition-all"
                                            whileHover={{ y: -5 }}
                                        >
                                            {(bundle.popular || bundle.bestseller) && (
                                                <Badge
                                                    variant={bundle.bestseller ? 'premium' : 'success'}
                                                    className="mb-4"
                                                >
                                                    {bundle.bestseller ? '🔥 Best Seller' : '⭐ Popular'}
                                                </Badge>
                                            )}
                                            <h3 className="text-xl font-bold mb-2">{bundle.name}</h3>
                                            <p className="text-muted-foreground text-base mb-4">{bundle.description}</p>
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-nova-purple font-semibold">{bundle.count} reels</span>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" className="gap-1" onClick={() => handleAddToCart({ slug: bundle.slug, name: bundle.name, price: bundle.price })}>
                                                        <ShoppingCart className="w-4 h-4" />
                                                        Add
                                                    </Button>
                                                    <Button size="sm" onClick={() => handleAddToCart({ slug: bundle.slug, name: bundle.name, price: bundle.price })}>Buy</Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </ScrollReveal>
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Button variant="secondary" size="lg">
                                    View All 47 Bundles
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Mega Bundles Section */}
            <AnimatePresence mode="wait">
                {(selectedCategory === 'all' || selectedCategory === 'mega') && (
                    <motion.section
                        key="mega"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-24 bg-card/30"
                    >
                        <div className="container">
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-4">
                                    <h2 className="text-3xl md:text-4xl font-bold">Mega Bundles</h2>
                                    <Badge variant="premium">
                                        <Crown className="w-3 h-3 mr-1" />
                                        Best Value
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground text-lg max-w-2xl">
                                    Massive collections with 2,000 to 30,000+ pieces. Maximum value per rupee.
                                </p>
                                <div className="flex items-baseline gap-3 mt-4">
                                    <span className="text-4xl font-bold gradient-text">₹149</span>
                                    <span className="text-muted-foreground">per mega bundle</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {megaBundles.map((bundle, index) => (
                                    <ScrollReveal key={bundle.id} delay={index * 0.1}>
                                        <motion.div
                                            className="group p-8 rounded-3xl bg-background border border-border/30 hover:border-gold/30 transition-all"
                                            whileHover={{ y: -8 }}
                                        >
                                            {(bundle.popular || bundle.bestseller) && (
                                                <Badge
                                                    variant={bundle.bestseller ? 'premium' : 'primary'}
                                                    className="mb-4"
                                                >
                                                    {bundle.bestseller ? '👑 Best Seller' : '🌟 Popular'}
                                                </Badge>
                                            )}
                                            <h3 className="text-xl font-bold mb-2">{bundle.name}</h3>
                                            <p className="text-muted-foreground text-base mb-4">{bundle.description}</p>
                                            <div className="mb-6">
                                                <span className="text-3xl font-bold gradient-text">{bundle.pieces}</span>
                                                <span className="text-muted-foreground ml-2">pieces</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleAddToCart(bundle)}>
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Add to Cart
                                                </Button>
                                                <Button className="flex-1" onClick={() => handleAddToCart(bundle)}>
                                                    Buy ₹{bundle.price}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* AI Automations Promo Card */}
            <section className="py-16">
                <div className="container">
                    <ScrollReveal>
                        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <Badge variant="primary" className="mb-4">
                                        <Zap className="w-4 h-4" />
                                        AI-Powered
                                    </Badge>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Looking for AI Automations?</h2>
                                    <p className="text-lg text-muted-foreground max-w-xl">
                                        Explore our powerful automation solutions. One-time purchases or monthly subscriptions available.
                                    </p>
                                </div>
                                <Link href="/ai-automations">
                                    <Button size="lg" className="gap-2">
                                        View AI Automations
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Courses Section */}
            <AnimatePresence mode="wait">
                {(selectedCategory === 'all' || selectedCategory === 'courses') && (
                    <motion.section
                        key="courses"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="py-24 bg-card/30"
                    >
                        <div className="container">
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-4">
                                    <h2 className="text-3xl md:text-4xl font-bold">Courses</h2>
                                    <Badge variant="warning">Coming Soon</Badge>
                                </div>
                                <p className="text-muted-foreground text-lg max-w-2xl">
                                    Expert-led courses to master social media, automation, and digital business.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map((course, index) => (
                                    <ScrollReveal key={course.id} delay={index * 0.1}>
                                        <motion.div
                                            className="group p-8 rounded-3xl bg-background border border-border/30 opacity-75 transition-all"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6">
                                                <BookOpen className="w-7 h-7 text-muted-foreground" />
                                            </div>
                                            <Badge variant="warning" className="mb-4">Coming Soon</Badge>
                                            <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                                            <p className="text-muted-foreground text-base mb-6">{course.description}</p>
                                            <Button variant="secondary" className="w-full" disabled>
                                                Notify Me
                                            </Button>
                                        </motion.div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* CTA */}
            <section className="py-32">
                <div className="container">
                    <ScrollReveal>
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Need a Custom Bundle?
                            </h2>
                            <p className="text-muted-foreground text-lg mb-10">
                                Looking for something specific? We can create custom bundles
                                tailored to your exact niche and requirements.
                            </p>
                            <Link href="/contact">
                                <Button size="lg">
                                    Request Custom Bundle
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
