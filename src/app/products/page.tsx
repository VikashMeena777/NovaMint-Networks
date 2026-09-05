'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Package,
  Sparkles,
  Crown,
  BookOpen,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Download
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { useCart } from '@/contexts/CartContext';
import { reelsBundles, megaBundles, courses } from '@/data/products';
import { toast } from 'sonner';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = (product: { slug: string; name: string; price: number }, openDrawer = false) => {
    addItem({
      id: product.slug,
      name: product.name,
      price: product.price,
      type: 'one-time',
    });
    toast.success(`Added "${product.name}" to cart`);
    if (openDrawer) {
      setIsOpen(true);
    }
  };

  // Filtered products
  const filteredReels = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return reelsBundles;
    return reelsBundles.filter(
      (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredMega = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return megaBundles;
    return megaBundles.filter(
      (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return courses;
    return courses.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalResults =
    (selectedCategory === 'all' || selectedCategory === 'reels' ? filteredReels.length : 0) +
    (selectedCategory === 'all' || selectedCategory === 'mega' ? filteredMega.length : 0) +
    (selectedCategory === 'all' || selectedCategory === 'courses' ? filteredCourses.length : 0);

  const categories = [
    { id: 'all', name: 'All Digital Assets', icon: Package, count: reelsBundles.length + megaBundles.length + courses.length },
    { id: 'reels', name: 'Reels Bundles (₹99)', icon: Sparkles, count: reelsBundles.length },
    { id: 'mega', name: 'Mega Bundles (₹149)', icon: Crown, count: megaBundles.length },
    { id: 'courses', name: 'Creator Academy', icon: BookOpen, count: courses.length },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-primary-500/30">
      {/* Hero Header */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-mono text-primary-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            READY-TO-POST VIRAL CONTENT VAULT
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
            High-Retention Short Form.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent">
              Commercial Resell Rights.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Instant digital access to curated viral reels, audio-engineered sound tracks, and mega creator collections. Download immediately after checkout.
          </p>

          {/* Search Input */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-4.5 h-4.5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by niche, topic, or keyword (e.g. gym, luxury, finance)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/80 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#06070a]/90 backdrop-blur-xl border-b border-white/[0.08] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {totalResults === 0 ? (
          <div className="text-center py-20 bg-[#08090C]/60 rounded-2xl border border-white/[0.08] max-w-md mx-auto p-8">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] text-neutral-500 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No digital products found</h3>
            <p className="text-xs text-neutral-400 mb-6">
              We couldn&apos;t find any assets matching &quot;{searchQuery}&quot;. Try a broader search term.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Reels Bundles Section */}
            {(selectedCategory === 'all' || selectedCategory === 'reels') && filteredReels.length > 0 && (
              <div>
                <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
                      ₹99 STARTER PACKS
                    </span>
                    <h2 className="text-2xl font-bold font-display text-white mt-0.5">
                      Reels Bundles (50+ Videos / Bundle)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {filteredReels.length} collections
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredReels.map((bundle) => (
                    <SpotlightCard
                      key={bundle.slug}
                      className="p-6 flex flex-col justify-between bg-[#08090C]/80 border-white/[0.08]"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-primary-500/15 text-primary-300 border border-primary-500/30">
                            {bundle.count} REELS
                          </span>
                          {bundle.bestseller && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                              ★ BESTSELLER
                            </span>
                          )}
                          {bundle.popular && !bundle.bestseller && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              POPULAR
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold font-display text-white tracking-tight">
                          {bundle.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[36px]">
                          {bundle.description}
                        </p>

                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold font-mono text-emerald-400">
                            ₹{bundle.price}
                          </span>
                          <span className="text-xs font-mono text-neutral-500">/ one-time download</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart({ slug: bundle.slug, name: bundle.name, price: bundle.price }, false)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-neutral-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>

                        <button
                          onClick={() => handleAddToCart({ slug: bundle.slug, name: bundle.name, price: bundle.price }, true)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-semibold text-xs shadow-md shadow-primary-950/50 hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Buy Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            )}

            {/* Mega Bundles Section */}
            {(selectedCategory === 'all' || selectedCategory === 'mega') && filteredMega.length > 0 && (
              <div>
                <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                      MAXIMUM VAULT VALUE
                    </span>
                    <h2 className="text-2xl font-bold font-display text-white mt-0.5">
                      Mega Bundles (2,500 to 5,000+ Clips)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {filteredMega.length} mega packs
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMega.map((bundle) => (
                    <SpotlightCard
                      key={bundle.slug}
                      className="p-6 flex flex-col justify-between bg-[#08090C]/80 border-white/[0.08]"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-accent/15 text-accent border border-accent/30">
                            {bundle.pieces} CLIPS
                          </span>
                          {bundle.bestseller && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                              ★ BESTSELLER
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold font-display text-white tracking-tight">
                          {bundle.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[36px]">
                          {bundle.description}
                        </p>

                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold font-mono text-emerald-400">
                            ₹{bundle.price}
                          </span>
                          <span className="text-xs font-mono text-neutral-500">/ mega vault</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart({ slug: bundle.slug, name: bundle.name, price: bundle.price }, false)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-neutral-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>

                        <button
                          onClick={() => handleAddToCart({ slug: bundle.slug, name: bundle.name, price: bundle.price }, true)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-semibold text-xs shadow-md shadow-primary-950/50 hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Buy Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section */}
            {(selectedCategory === 'all' || selectedCategory === 'courses') && filteredCourses.length > 0 && (
              <div>
                <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400">
                      KNOWLEDGE BASE
                    </span>
                    <h2 className="text-2xl font-bold font-display text-white mt-0.5">
                      Creator Masterclasses
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-neutral-500">
                    {filteredCourses.length} academy courses
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <SpotlightCard
                      key={course.id}
                      className="p-6 flex flex-col justify-between bg-[#08090C]/80 border-white/[0.08]"
                    >
                      <div>
                        <div className="mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-white/[0.06] text-neutral-300 border border-white/[0.1]">
                            {course.status === 'coming-soon' ? 'Q2 DROP' : 'AVAILABLE'}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-display text-white tracking-tight">
                          {course.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.06]">
                        <Link
                          href="/contact"
                          className="w-full py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-neutral-200 transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Get Priority Access Notification</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
