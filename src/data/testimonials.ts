// ── Testimonials Data ──
// All testimonials and related stats used across the site.

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  metrics: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'Content Creator',
    company: 'Self',
    avatar: '/avatars/rahul.jpg',
    content:
      'NovaMint completely transformed my content workflow. I went from posting 2 reels a week to 5 reels a day with their automation systems. My engagement has skyrocketed!',
    rating: 5,
    metrics: '300% more engagement',
    featured: true,
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Instagram Influencer',
    company: 'Fashion & Lifestyle',
    avatar: '/avatars/priya.jpg',
    content:
      "The reels bundles are absolutely amazing quality. I've been using them for my theme page and the engagement has increased by 300%. Best purchase I've made for my content business.",
    rating: 5,
    metrics: '50K+ new followers',
    featured: true,
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Agency Owner',
    company: 'Digital Marketing Agency',
    avatar: '/avatars/amit.jpg',
    content:
      'Best investment for my agency. The AI automation systems save us 20+ hours every week. Vikash and team are incredibly responsive and the quality of work is outstanding.',
    rating: 5,
    metrics: '20+ hours saved/week',
    featured: true,
  },
  {
    id: 4,
    name: 'Sneha Verma',
    role: 'YouTuber',
    company: 'Tech Reviews',
    avatar: '/avatars/sneha.jpg',
    content:
      'Their YouTube automation setup is a game-changer. I was struggling to post consistently, but now my faceless channel runs on autopilot. Already monetized within 3 months!',
    rating: 5,
    metrics: 'Monetized in 3 months',
  },
  {
    id: 5,
    name: 'Karan Singh',
    role: 'Fitness Influencer',
    company: 'FitLife Academy',
    avatar: '/avatars/karan.jpg',
    content:
      'The gym and fitness reels bundle has been perfect for my page. High-quality motivational content that my audience loves. Plus the resell rights let me earn extra income!',
    rating: 5,
    metrics: '5x content output',
  },
  {
    id: 6,
    name: 'Neha Gupta',
    role: 'Entrepreneur',
    company: 'E-commerce Store',
    avatar: '/avatars/neha.jpg',
    content:
      "The social media management service has been incredible. My store's Instagram went from 2K to 15K followers organically. The content strategy they provided was spot on.",
    rating: 5,
    metrics: '0 to 15K followers',
  },
  {
    id: 7,
    name: 'Vikram Joshi',
    role: 'Podcast Host',
    company: 'Business Talks',
    avatar: '/avatars/vikram.jpg',
    content:
      'The podcast clipper automation is brilliant. It automatically creates shorts from my full episodes with captions and everything. Saves me hours of manual work every week.',
    rating: 5,
    metrics: '50+ clips/week',
  },
  {
    id: 8,
    name: 'Anjali Reddy',
    role: 'Freelancer',
    company: 'Video Editor',
    avatar: '/avatars/anjali.jpg',
    content:
      "I resell the reels bundles to my clients and the profit margin is amazing. NovaMint's bundles have become a significant revenue stream for my freelance business.",
    rating: 5,
    metrics: '₹50K+ extra income',
  },
  {
    id: 9,
    name: 'Ravi Krishnan',
    role: 'Spiritual Content Creator',
    company: 'Dharma Digital',
    avatar: '/avatars/ravi.jpg',
    content:
      'The Sanatan Dharm reels bundle is exactly what I was looking for. Beautiful, respectful content that resonates with my audience. The AI-generated visuals are stunning.',
    rating: 5,
    metrics: '100K+ views/reel',
  },
];

/** Stats shown on the Testimonials page */
export const testimonialPageStats = [
  { value: '100+', label: 'Happy Clients' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Satisfaction Rate' },
];

/**
 * Compact testimonials used on the homepage
 * (subset with slightly different copy, kept in sync with IDs 1-3 above).
 */
export interface HomeTestimonial {
  quote: string;
  name: string;
  title: string;
  initials: string;
  rating: number;
}

export const homeTestimonials: HomeTestimonial[] = [
  {
    quote:
      "NovaMint completely transformed how we create content. Our engagement went up 300% and we're now reaching more people than ever before.",
    name: 'Rahul Kumar',
    title: 'Content Creator • 50K+ Followers',
    initials: 'RK',
    rating: 5,
  },
  {
    quote:
      'The AI automation setup saved me 20+ hours every single week. I can now focus on creating while NovaMint handles everything else.',
    name: 'Priya Sharma',
    title: 'Instagram Influencer • 80K Followers',
    initials: 'PS',
    rating: 5,
  },
  {
    quote:
      'Best investment I made for my YouTube channel. The video editing quality is outstanding and delivery is always on time.',
    name: 'Arjun Singh',
    title: 'YouTube Creator • 120K Subscribers',
    initials: 'AS',
    rating: 5,
  },
];
