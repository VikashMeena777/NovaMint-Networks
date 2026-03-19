// ── Homepage Data ──
// Data arrays used by the homepage sections.

export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export const heroStats: HeroStat[] = [
  { value: 50, suffix: '+', label: 'Digital Products' },
  { value: 17, suffix: '', label: 'Services' },
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 500, suffix: '+', label: 'Content Pieces' },
];

export const trustedPlatforms = [
  'YouTube',
  'Instagram',
  'TikTok',
  'Snapchat',
  'LinkedIn',
  'Twitter/X',
  'Facebook',
];

export interface ImpactStat {
  icon: string; // Lucide icon name
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
}

export const impactStats: ImpactStat[] = [
  {
    icon: 'Briefcase',
    value: 50,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successful deliveries',
    color: 'from-nova-purple to-electric-blue',
  },
  {
    icon: 'Users',
    value: 100,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Creators served globally',
    color: 'from-electric-blue to-cyan',
  },
  {
    icon: 'Clock',
    value: 1000,
    suffix: '+',
    label: 'Hours Saved',
    description: 'Through automation',
    color: 'from-cyan to-mint-green',
  },
  {
    icon: 'Award',
    value: 99,
    suffix: '%',
    label: 'Satisfaction Rate',
    description: 'Client happiness',
    color: 'from-hot-pink to-gold',
  },
];

export interface HomeServiceCard {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  price: string;
  href: string;
  gradient: string;
  tag: string;
}

export const homeServices: HomeServiceCard[] = [
  {
    icon: 'Video',
    title: 'Video Editing',
    description:
      'Professional video editing for reels, shorts, and long-form content with cinematic effects.',
    price: '₹599+',
    href: '/services',
    gradient: 'from-nova-purple to-electric-blue',
    tag: 'Most Popular',
  },
  {
    icon: 'Bot',
    title: 'AI Automation',
    description:
      'Custom AI automation systems to streamline your entire content creation workflow effortlessly.',
    price: '₹1,999+',
    href: '/ai-automations',
    gradient: 'from-electric-blue to-cyan',
    tag: 'Trending',
  },
  {
    icon: 'TrendingUp',
    title: 'Social Media',
    description:
      'Full-service social media management to grow your audience organically and drive engagement.',
    price: '₹4,999/mo',
    href: '/services',
    gradient: 'from-hot-pink to-gold',
    tag: 'Premium',
  },
  {
    icon: 'Globe',
    title: 'Website Building',
    description:
      'Modern, fast, and conversion-optimized websites built with the latest technologies.',
    price: '₹9,999+',
    href: '/services',
    gradient: 'from-mint-green to-electric-blue',
    tag: 'New',
  },
];

export interface WhyUsFeature {
  icon: string;
  title: string;
  desc: string;
  gradient: string;
}

export const whyUsFeatures: WhyUsFeature[] = [
  { icon: 'Shield', title: 'Secure', desc: 'Your data & assets are always protected', gradient: 'from-nova-purple to-electric-blue' },
  { icon: 'Zap', title: 'Fast', desc: '24–48 hour delivery guaranteed', gradient: 'from-electric-blue to-cyan' },
  { icon: 'Award', title: 'Quality', desc: 'Premium work, unlimited revisions', gradient: 'from-cyan to-mint-green' },
  { icon: 'Users', title: 'Support', desc: '7-day week availability for you', gradient: 'from-hot-pink to-gold' },
];

export const whyUsBenefits = [
  'Trusted by 100+ creators, agencies, and brands',
  'Average 300% engagement increase for clients',
  'Expert team with proven results and experience',
  'Dedicated support available 7 days a week',
];
