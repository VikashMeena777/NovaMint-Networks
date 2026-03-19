// ── AI Automations Data ──
// One-time and subscription automation products for the AI Automations page.

export interface OneTimeAutomation {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  icon: string; // Lucide icon name — map at the component level
  features: string[];
  popular: boolean;
  tag: string | null;
}

export const oneTimeAutomations: OneTimeAutomation[] = [
  {
    id: 'drive-to-reels',
    name: 'DriveToReels Scheduler',
    description:
      'Smart video distribution from Google Drive. Multi-platform scheduling with auto-captions and strategic hashtags.',
    price: 99,
    originalPrice: 149,
    icon: 'Calendar',
    features: [
      'Google Drive integration',
      'Multi-platform scheduling (IG + YT)',
      'Auto-caption generation',
      'Strategic hashtag application',
      'Time-zone optimized posting',
      '30-day setup support',
    ],
    popular: false,
    tag: 'Entry Level',
  },
  {
    id: 'ai-trendradar',
    name: 'AI TrendRadar',
    description:
      'Content intelligence system for AI tools content. Daily trending discovery and organized idea database.',
    price: 199,
    originalPrice: 299,
    icon: 'Sparkles',
    features: [
      'Daily trending AI tool discovery',
      'Organized idea database (Google Sheets)',
      'Content angle suggestions',
      'Competitive analysis insights',
      'Video walkthrough tutorials',
      '30-day setup support',
    ],
    popular: false,
    tag: null,
  },
  {
    id: 'storyshorts-engine',
    name: 'StoryShorts AI Engine',
    description:
      'Viral story automation for short-form video creation. AI voiceover, gameplay backgrounds, and multi-platform scheduling.',
    price: 249,
    originalPrice: 399,
    icon: 'Youtube',
    features: [
      'Curated trending story discovery',
      'AI voiceover generation',
      'Gameplay background integration',
      'Professional subtitle styling',
      'Multi-platform scheduling (YT + IG)',
      '30-day setup support',
    ],
    popular: true,
    tag: 'Best Seller',
  },
  {
    id: 'cineclips-creator',
    name: 'CineClips Creator Pro',
    description:
      'Movie/series clip production pipeline. Scene extraction, short-form optimization, and automated upload scheduling.',
    price: 399,
    originalPrice: 599,
    icon: 'FileText',
    features: [
      'Scene identification & extraction',
      'Short-form optimization (9:16)',
      'Quality enhancement',
      'Automated upload scheduling',
      'Video walkthrough tutorials',
      '30-day setup support',
    ],
    popular: false,
    tag: null,
  },
  {
    id: 'memefactory-pro',
    name: 'MemeFactory Pro',
    description:
      'Meme page acceleration system. Trend-aligned sourcing, custom branding, and direct platform integration.',
    price: 499,
    originalPrice: 749,
    icon: 'Instagram',
    features: [
      'Trend-aligned content sourcing',
      'Custom branding overlay',
      'Automated formatting & optimization',
      'Direct platform integration',
      'Video walkthrough tutorials',
      '30-day setup support',
    ],
    popular: true,
    tag: 'High Growth',
  },
];

export interface SubscriptionAutomation {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: string; // Lucide icon name
  features: string[];
  popular: boolean;
  tag: string | null;
}

export const subscriptionAutomations: SubscriptionAutomation[] = [
  {
    id: 'managed-starter',
    name: 'Starter Plan',
    description:
      'Perfect for beginners. We host, run, and maintain 1 automation system for you. Zero technical hassle.',
    monthlyPrice: 149,
    yearlyPrice: 1499,
    icon: 'Zap',
    features: [
      '1 automation system (hosted)',
      'Cloud hosting & maintenance',
      'Regular updates & bug fixes',
      '24/7 system monitoring',
      'Performance reporting',
      'Email support',
    ],
    popular: false,
    tag: 'Entry Level',
  },
  {
    id: 'managed-growth',
    name: 'Growth Plan',
    description:
      'For creators scaling 1-2 pages. We manage up to 3 automation systems with priority support.',
    monthlyPrice: 399,
    yearlyPrice: 3999,
    icon: 'Bot',
    features: [
      'Up to 3 automation systems',
      'Cloud hosting & maintenance',
      'Regular updates & feature upgrades',
      '24/7 system monitoring',
      'Performance reporting',
      'Priority support',
    ],
    popular: true,
    tag: 'Most Popular',
  },
  {
    id: 'managed-empire',
    name: 'Empire Plan',
    description:
      'For multi-page operators & agencies. All 5 premium systems fully managed with priority support.',
    monthlyPrice: 599,
    yearlyPrice: 5999,
    icon: 'Sparkles',
    features: [
      'All 5 automation systems',
      'Cloud hosting & maintenance',
      'Priority updates & custom features',
      '24/7 system monitoring',
      'Detailed performance reporting',
      'Priority support + strategy calls',
    ],
    popular: true,
    tag: 'Best Value',
  },
];
