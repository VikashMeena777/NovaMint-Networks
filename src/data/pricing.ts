// ── Pricing Data ──
// Service plans and automation pricing for the Pricing page.

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface ServicePlan {
  name: string;
  description: string;
  price: number;
  period: string;
  popular: boolean;
  gradient: string;
  features: PlanFeature[];
  cta: string;
  href: string;
}

export const servicePlans: ServicePlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for creators just getting started',
    price: 2999,
    period: 'month',
    popular: false,
    gradient: 'from-electric-blue to-cyan',
    features: [
      { name: '5 Reels/Shorts per month', included: true },
      { name: 'Basic video editing', included: true },
      { name: '2 Thumbnail designs', included: true },
      { name: 'Caption writing', included: true },
      { name: 'WhatsApp support', included: true },
      { name: 'Social media management', included: false },
      { name: 'AI automation setup', included: false },
      { name: 'Priority delivery', included: false },
    ],
    cta: 'Get Started',
    href: '/contact?plan=starter',
  },
  {
    name: 'Growth',
    description: 'For serious creators ready to scale fast',
    price: 5999,
    period: 'month',
    popular: true,
    gradient: 'from-nova-purple to-electric-blue',
    features: [
      { name: '15 Reels/Shorts per month', included: true },
      { name: 'Advanced video editing', included: true },
      { name: '5 Thumbnail designs', included: true },
      { name: 'Caption + hashtag strategy', included: true },
      { name: 'Priority WhatsApp support', included: true },
      { name: 'Basic social management', included: true },
      { name: 'Analytics reports', included: true },
      { name: 'AI automation setup', included: false },
    ],
    cta: 'Most Popular',
    href: '/contact?plan=growth',
  },
  {
    name: 'Pro',
    description: 'Complete solution for professionals',
    price: 9999,
    period: 'month',
    popular: false,
    gradient: 'from-hot-pink to-gold',
    features: [
      { name: '30 Reels/Shorts per month', included: true },
      { name: 'Premium video editing', included: true },
      { name: 'Unlimited thumbnails', included: true },
      { name: 'Content strategy', included: true },
      { name: 'Dedicated manager', included: true },
      { name: 'Full social management', included: true },
      { name: '1 AI automation setup', included: true },
      { name: 'Priority delivery (24h)', included: true },
    ],
    cta: 'Go Pro',
    href: '/contact?plan=pro',
  },
];

export interface AutomationPricingItem {
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  gradient: string;
  href: string;
}

export const automationPricing: AutomationPricingItem[] = [
  {
    name: 'Instagram Auto Poster',
    price: 199,
    originalPrice: 299,
    features: ['Auto posting', 'Scheduling', 'Caption AI', 'Analytics'],
    gradient: 'from-nova-purple to-electric-blue',
    href: '/products?id=instagram-automation',
  },
  {
    name: 'YouTube Automation',
    price: 499,
    originalPrice: 699,
    features: ['Full channel automation', 'AI scripts', 'Thumbnails', 'Upload scheduling'],
    gradient: 'from-electric-blue to-cyan',
    href: '/products?id=youtube-automation',
  },
  {
    name: 'Content Repurposer',
    price: 299,
    originalPrice: 399,
    features: ['Multi-platform', 'Auto resize', 'Batch processing', '10+ formats'],
    gradient: 'from-cyan to-mint-green',
    href: '/products?id=content-repurposer',
  },
  {
    name: 'Lead Generator',
    price: 399,
    originalPrice: 499,
    features: ['Auto capture', 'Lead scoring', 'Email sequences', 'CRM integration'],
    gradient: 'from-hot-pink to-gold',
    href: '/products?id=lead-generator',
  },
];

/** Short FAQ list shown on the Pricing page footer. */
export const pricingFaqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods including UPI, credit/debit cards, net banking, wallets, and international cards via Cashfree.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the next billing cycle.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "Due to the nature of digital services, we don't offer refunds. However, we provide unlimited revisions until you're satisfied.",
  },
  {
    question: "What's the turnaround time?",
    answer:
      'Standard delivery is 2–3 days. Pro plan members get priority 24-hour delivery on most projects.',
  },
  {
    question: 'Can I get custom pricing?',
    answer:
      'Absolutely! For enterprise needs or custom requirements, contact us for a tailored quote.',
  },
];
