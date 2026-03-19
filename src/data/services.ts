// ── Services Data ──
// All service categories and items for the Services page.
// Icon names are strings here; map them to Lucide icons at the component level.

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}

export interface ServiceCategory {
  category: string;
  label: string;
  gradient: string;
  items: ServiceItem[];
}

export const services: ServiceCategory[] = [
  {
    category: 'Creative',
    label: 'Content That Captivates',
    gradient: 'from-nova-purple to-electric-blue',
    items: [
      {
        icon: 'Video',
        title: 'Premium Video Editing',
        description:
          'Stunning reels, shorts, and videos that captivate audiences and drive engagement. Professional transitions, effects, and color grading included.',
        features: ['Cinematic editing', 'Motion graphics', 'Color grading', 'Sound design'],
        price: 'From ₹499',
      },
      {
        icon: 'Image',
        title: 'Thumbnail Design',
        description:
          'Click-worthy thumbnails that boost your CTR. We study what works and create designs that demand attention across platforms.',
        features: ['A/B testing designs', 'Brand consistency', 'Platform optimized', 'Fast delivery'],
        price: 'From ₹199',
      },
      {
        icon: 'Palette',
        title: 'Graphic Design',
        description:
          'Social media graphics, carousel posts, stories, and visual content that strengthens your brand identity across all channels.',
        features: ['Social media kits', 'Carousel designs', 'Story templates', 'Brand assets'],
        price: 'From ₹299',
      },
      {
        icon: 'Sparkles',
        title: 'Logo & Branding',
        description:
          'Complete brand identity packages including logo design, color palette, typography, and professional brand guidelines.',
        features: ['Logo design', 'Brand guidelines', 'Color palette', 'Typography'],
        price: 'From ₹2,999',
      },
    ],
  },
  {
    category: 'Marketing',
    label: 'Strategies That Scale',
    gradient: 'from-electric-blue to-cyan',
    items: [
      {
        icon: 'Users',
        title: 'Social Media Management',
        description:
          'Complete management of your social channels. We handle content creation, scheduling, engagement, and growth — end to end.',
        features: ['Content calendar', 'Daily posting', 'Community management', 'Analytics'],
        price: 'From ₹4,999/mo',
      },
      {
        icon: 'TrendingUp',
        title: 'Instagram Growth',
        description:
          'Organic growth strategies that build a genuine, engaged audience on Instagram. No bots, no fake followers — just real results.',
        features: ['Hashtag strategy', 'Content optimization', 'Engagement tactics', 'Analytics'],
        price: 'From ₹2,999/mo',
      },
      {
        icon: 'FileText',
        title: 'Content Strategy',
        description:
          'Data-driven content plans that align with your goals and resonate deeply with your target audience on every platform.',
        features: ['Audience research', 'Content calendar', 'Trend analysis', 'Performance tracking'],
        price: 'From ₹1,999',
      },
      {
        icon: 'Megaphone',
        title: 'Paid Ads Management',
        description:
          'Meta and Google ads that deliver ROI. We create, optimize, and scale campaigns for maximum reach and conversions.',
        features: ['Campaign setup', 'A/B testing', 'Budget optimization', 'Reporting'],
        price: 'From ₹4,999/mo',
      },
      {
        icon: 'Mail',
        title: 'Email Marketing',
        description:
          'Automated email sequences and campaigns that nurture leads and convert subscribers into loyal paying customers.',
        features: ['Email automation', 'Campaign design', 'List management', 'Analytics'],
        price: 'From ₹1,499/mo',
      },
    ],
  },
  {
    category: 'Tech & Automation',
    label: 'Systems That Work 24/7',
    gradient: 'from-hot-pink to-gold',
    items: [
      {
        icon: 'Bot',
        title: 'AI Automation Setup',
        description:
          'Custom n8n workflows that automate your entire content and business workflow. Set up once, benefit forever — 24/7.',
        features: ['Custom workflows', 'API integrations', 'Training included', '30-day support'],
        price: 'From ₹4,999',
      },
      {
        icon: 'Play',
        title: 'YouTube Automation',
        description:
          'Complete faceless YouTube channel automation. AI scripts, auto-editing, and scheduled uploads — fully on autopilot.',
        features: ['AI scriptwriting', 'Auto-editing', 'Thumbnail generation', 'SEO optimization'],
        price: 'From ₹9,999',
      },
      {
        icon: 'Target',
        title: 'Lead Generation',
        description:
          'Automated lead capture and nurturing systems that work 24/7 to grow your business while you sleep.',
        features: ['Lead capture forms', 'Auto-scoring', 'Email sequences', 'CRM integration'],
        price: 'From ₹3,999',
      },
      {
        icon: 'Globe',
        title: 'Website Development',
        description:
          'Modern, responsive websites built with Next.js. Fast, SEO-optimized, and conversion-focused for maximum impact.',
        features: ['Responsive design', 'SEO optimized', 'Fast loading', 'CMS integration'],
        price: 'From ₹9,999',
      },
      {
        icon: 'BookOpen',
        title: 'Course Creation',
        description:
          'End-to-end course production including curriculum design, video production, platform setup, and marketing materials.',
        features: ['Curriculum design', 'Video production', 'Platform setup', 'Marketing materials'],
        price: 'From ₹14,999',
      },
    ],
  },
];
