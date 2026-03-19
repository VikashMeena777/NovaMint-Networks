// ── FAQ Data ──
// All FAQ categories and questions used on the FAQ and Contact pages.

export interface FAQCategory {
  id: string;
  name: string;
  icon: string; // Lucide icon name — map at the component level
}

export const faqCategories: FAQCategory[] = [
  { id: 'all', name: 'All Questions', icon: 'HelpCircle' },
  { id: 'products', name: 'Products', icon: 'Package' },
  { id: 'payments', name: 'Payments', icon: 'CreditCard' },
  { id: 'services', name: 'Services', icon: 'Zap' },
  { id: 'support', name: 'Support', icon: 'HeadphonesIcon' },
];

export interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

/** Full FAQ list (FAQ page). */
export const faqs: FAQItem[] = [
  {
    id: 1,
    category: 'products',
    question: 'What are Reels Bundles?',
    answer:
      'Reels Bundles are collections of ready-to-post short videos designed for Instagram Reels, YouTube Shorts, and TikTok. Each bundle contains 50+ high-quality viral-ready content from specific categories like fitness, motivation, luxury lifestyle, etc. All bundles come with full resell rights, meaning you can use them for your own pages or resell them to earn profit.',
  },
  {
    id: 2,
    category: 'products',
    question: 'What is the difference between Reels Bundles (₹99) and Mega Bundles (₹149)?',
    answer:
      'Reels Bundles at ₹99 contain 50+ videos per bundle from a single category. Mega Bundles at ₹149 are massive collections containing 250 to 30,000+ videos with significantly more value per rupee. Mega Bundles are ideal for creators who want maximum content at the lowest cost per video.',
  },
  {
    id: 3,
    category: 'products',
    question: 'Do I get resell rights with the bundles?',
    answer:
      'Yes! All our reels bundles and mega bundles come with full resell rights. You can use the content for your own social media accounts, or resell the bundles to others and keep 100% of the profit. This makes it a great opportunity to start a digital product business.',
  },
  {
    id: 4,
    category: 'products',
    question: 'How do I download my purchased products?',
    answer:
      'After successful payment, you will receive an instant download link via email and on the confirmation page. All products are delivered as Google Drive links for easy access. Download links are valid for 30 days, and you can request a new link anytime via WhatsApp support.',
  },
  {
    id: 5,
    category: 'products',
    question: 'What AI Automation Systems do you offer?',
    answer:
      'We offer 5 main AI automation systems: Instagram Auto Poster, YouTube Channel Automation, Content Repurposer Bot, AI Lead Generator, and Podcast Clipper Automation. Each system is built on n8n and comes with setup documentation, training, and support.',
  },
  {
    id: 6,
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods through Cashfree including: UPI (Google Pay, PhonePe, Paytm, etc.), Credit/Debit Cards (Visa, Mastercard, Rupay), Net Banking, Wallets, and International Cards. All transactions are 100% secure with bank-grade encryption.',
  },
  {
    id: 7,
    category: 'payments',
    question: 'Is my payment information secure?',
    answer:
      "Absolutely. We use Cashfree, India's leading payment gateway, which is PCI DSS compliant. We never store your card details on our servers. All transactions are encrypted with 256-bit SSL security.",
  },
  {
    id: 8,
    category: 'payments',
    question: 'Do you offer refunds?',
    answer:
      "Due to the digital nature of our products and services, we generally don't offer refunds once the product has been delivered. However, if there's a genuine issue with your order (wrong product, corrupted files, etc.), please contact us within 24 hours and we'll resolve it promptly.",
  },
  {
    id: 9,
    category: 'payments',
    question: 'Can I get an invoice for my purchase?',
    answer:
      'Yes, invoices are automatically generated and sent to your email after every purchase. If you need a custom invoice with your business details (GST number, company name), just WhatsApp us with your order ID.',
  },
  {
    id: 10,
    category: 'services',
    question: 'What services do you offer?',
    answer:
      'We offer 17 professional services including: Video Editing, Thumbnail Design, Social Media Management, Instagram Growth, AI Automation Setup, YouTube Automation, Content Strategy, Graphic Design, Branding & Logo Design, Course Creation, Website Building, Paid Ads Management, and more. Visit our Services page for complete details.',
  },
  {
    id: 11,
    category: 'services',
    question: 'How long does it take to complete a project?',
    answer:
      'Turnaround times vary by project: Simple video edits: 1-2 days, Thumbnail designs: 24 hours, Social media management: Ongoing monthly, AI automation setup: 3-5 days, Website development: 1-2 weeks. Rush delivery is available for urgent projects.',
  },
  {
    id: 12,
    category: 'services',
    question: 'Do you offer revisions?',
    answer:
      "Yes! All our services include unlimited revisions until you're completely satisfied. We believe in delivering quality work that meets your expectations. Just provide clear feedback and we'll make the necessary changes.",
  },
  {
    id: 13,
    category: 'services',
    question: 'Can I request custom work?',
    answer:
      "Absolutely! We love custom projects. Whether you need a unique automation workflow, special video editing style, or custom design work, just contact us with your requirements. We'll provide a tailored quote within 24 hours.",
  },
  {
    id: 14,
    category: 'services',
    question: 'Do you offer monthly retainer packages?',
    answer:
      'Yes, we offer Starter (₹2999/mo), Growth (₹5999/mo), and Pro (₹9999/mo) packages for ongoing content creation needs. These include a set number of deliverables, priority support, and better rates compared to one-off projects.',
  },
  {
    id: 15,
    category: 'support',
    question: 'How can I contact support?',
    answer:
      "You can reach us via: WhatsApp (fastest response, usually within minutes), Email (response within 24 hours), or the contact form on our website. We're available from 10 AM to 10 PM IST, 7 days a week.",
  },
  {
    id: 16,
    category: 'support',
    question: 'What is your response time?',
    answer:
      'WhatsApp: Usually within 5-30 minutes during business hours. Email: Within 2-4 hours during business hours, up to 24 hours maximum. For urgent matters, WhatsApp is always the fastest way to reach us.',
  },
  {
    id: 17,
    category: 'support',
    question: 'Do you offer training for automation systems?',
    answer:
      'Yes! Every AI automation system purchase includes: Video tutorials for setup, Documentation, One-on-one setup call (30 mins), 30 days of support for questions, and Free updates for 6 months.',
  },
  {
    id: 18,
    category: 'support',
    question: 'What if I face issues after purchase?',
    answer:
      "We're here to help! Just reach out via WhatsApp or email with your order ID and describe the issue. For products, we'll send new links or fix any issues. For services, we'll make revisions until you're satisfied.",
  },
];

/** Short FAQ list shown on the Contact page. */
export const contactFaqs = [
  {
    question: 'How long does it take to complete a project?',
    answer:
      'Turnaround time varies by project. Simple edits take 1-2 days, while complex automation setups can take 3-7 days.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "Due to the digital nature of our products, we don't offer refunds. However, we provide unlimited revisions until you're satisfied.",
  },
  {
    question: 'Can I request custom work?',
    answer:
      "Absolutely! We love custom projects. Contact us with your requirements and we'll provide a tailored quote.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major payment methods including UPI, credit/debit cards, net banking, and wallets via Cashfree.',
  },
];
