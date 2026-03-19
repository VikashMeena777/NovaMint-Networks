// ── Products Data ──
// All reels bundles, mega bundles, and courses on the /products page.
// To edit: change any value below and save. To add: copy a block and change the fields.
// To remove: delete the { … } block (keep surrounding commas correct).

// ────────────────── Types ──────────────────

export interface ReelsBundle {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: string;
  price: number;
  popular?: boolean;
  bestseller?: boolean;
}

export interface MegaBundle {
  id: number;
  slug: string;
  name: string;
  pieces: string;
  description: string;
  price: number;
  popular?: boolean;
  bestseller?: boolean;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  status: 'coming-soon' | 'available';
}

// ────────────────── Reels Bundles (12 items) ──────────────────

export const reelsBundles: ReelsBundle[] = [
  { id: 1,  slug: 'fitness-gym-reels',            name: 'Fitness & Gym',         description: 'Workout motivation, gym tips, and fitness journey reels',              count: '50+', price: 99 },
  { id: 2,  slug: 'motivational-reels',            name: 'Motivational',          description: 'Inspiring quotes, success stories, and mindset content',               count: '50+', price: 99, popular: true },
  { id: 3,  slug: 'luxury-lifestyle-reels',        name: 'Luxury Lifestyle',      description: 'Premium lifestyle, cars, travel, and success aesthetic',               count: '50+', price: 99, bestseller: true },
  { id: 4,  slug: 'nature-travel-reels',           name: 'Nature & Travel',       description: 'Stunning landscapes, travel destinations, and nature beauty',          count: '50+', price: 99 },
  { id: 5,  slug: 'sanatan-dharm-reels',           name: 'Sanatan Dharm',         description: 'Spiritual content, mantras, temple visuals, and dharmic wisdom',       count: '50+', price: 99, popular: true },
  { id: 6,  slug: 'tech-gadgets-reels',            name: 'Tech & Gadgets',        description: 'Latest gadgets, tech reviews, and futuristic content',                 count: '50+', price: 99 },
  { id: 7,  slug: 'food-cooking-reels',            name: 'Food & Cooking',        description: 'Recipes, food photography, and cooking tutorials',                    count: '50+', price: 99 },
  { id: 8,  slug: 'fashion-style-reels',           name: 'Fashion & Style',       description: 'Outfit ideas, fashion trends, and styling tips',                      count: '50+', price: 99 },
  { id: 9,  slug: 'business-finance-reels',        name: 'Business & Finance',    description: 'Money tips, investing, and entrepreneurship',                         count: '50+', price: 99 },
  { id: 10, slug: 'gaming-reels',                  name: 'Gaming',                description: 'Gaming clips, highlights, and gaming culture',                        count: '50+', price: 99 },
  { id: 11, slug: 'cars-automobiles-reels',        name: 'Cars & Automobiles',    description: 'Supercars, car reviews, and automotive content',                      count: '50+', price: 99, bestseller: true },
  { id: 12, slug: 'comedy-entertainment-reels',    name: 'Comedy & Entertainment',description: 'Funny clips, memes, and entertainment content',                      count: '50+', price: 99 },
];

// ────────────────── Mega Bundles (6 items) ──────────────────

export const megaBundles: MegaBundle[] = [
  { id: 1, slug: 'ultimate-motivation-pack',   name: 'Ultimate Motivation Pack',   pieces: '5,000+',  description: 'Massive collection of motivational quotes, success stories, and mindset content', price: 149, popular: true },
  { id: 2, slug: 'luxury-empire-bundle',       name: 'Luxury Empire Bundle',       pieces: '3,000+',  description: 'Cars, jets, mansions, watches, and ultimate luxury lifestyle content',            price: 149, bestseller: true },
  { id: 3, slug: 'fitness-mega-collection',    name: 'Fitness Mega Collection',    pieces: '2,500+',  description: 'Complete gym and fitness content library for fitness pages',                      price: 149 },
  { id: 4, slug: 'spiritual-wisdom-pack',      name: 'Spiritual Wisdom Pack',      pieces: '4,000+',  description: 'Comprehensive Sanatan Dharm, meditation, and spiritual content',                price: 149, popular: true },
  { id: 5, slug: 'complete-nature-bundle',     name: 'Complete Nature Bundle',     pieces: '2,000+',  description: 'Mountains, oceans, forests, and stunning natural landscapes',                    price: 149 },
  { id: 6, slug: 'business-mastery-pack',      name: 'Business Mastery Pack',      pieces: '3,500+',  description: 'Entrepreneurship, money mindset, and business content',                         price: 149 },
];

// ────────────────── Courses ──────────────────

export const courses: Course[] = [
  { id: 1, name: 'Complete n8n Automation Mastery',  description: 'Master workflow automation from zero to expert',                status: 'coming-soon' },
  { id: 2, name: 'Social Media Growth Blueprint',    description: 'Proven strategies to grow on Instagram, YouTube, and TikTok',  status: 'coming-soon' },
  { id: 3, name: 'AI Content Creation Course',       description: 'Create viral content using AI tools and automation',           status: 'coming-soon' },
  { id: 4, name: 'Faceless YouTube Mastery',          description: 'Build and monetize faceless YouTube channels',                status: 'coming-soon' },
  { id: 5, name: 'Digital Product Business',          description: 'Launch and scale your digital product empire',                status: 'coming-soon' },
];
