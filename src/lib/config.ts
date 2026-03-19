// Site Configuration
export const siteConfig = {
    name: 'NovaMint Networks',
    description: 'Premium AI Automation, Video Editing, and Content Creation Services',
    url: 'https://novamintnetworks.in',
    ogImage: '/og-image.png',

    // Contact Info
    email: 'hello@novamintnetworks.in',
    phone: '+91 XXXXXXXXXX',
    whatsapp: '+91 XXXXXXXXXX',

    // Social Links
    social: {
        instagram: 'https://instagram.com/novamintnetworks',
        youtube: 'https://youtube.com/@novamintnetworks',
        twitter: 'https://twitter.com/novamintnet',
        linkedin: 'https://linkedin.com/company/novamintnetworks',
    },

    // Navigation
    mainNav: [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
        { title: 'Services', href: '/services' },
        { title: 'Products', href: '/products' },
        { title: 'Automations', href: '/automations' },
        { title: 'Portfolio', href: '/portfolio' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' },
    ],

    // Footer Navigation
    footerNav: {
        services: [
            { title: 'Video Editing', href: '/services/video-editing' },
            { title: 'Social Media Management', href: '/services/social-media-management' },
            { title: 'AI Content Creation', href: '/services/ai-content-creation' },
            { title: 'YouTube Automation', href: '/services/youtube-automation' },
        ],
        products: [
            { title: 'Reels Bundles', href: '/products?category=reels' },
            { title: 'Mega Bundles', href: '/products?category=mega' },
            { title: 'AI Automations', href: '/automations' },
            { title: 'Courses', href: '/products?category=courses' },
        ],
        company: [
            { title: 'About Us', href: '/about' },
            { title: 'Portfolio', href: '/portfolio' },
            { title: 'Testimonials', href: '/testimonials' },
            { title: 'Careers', href: '/careers' },
        ],
        support: [
            { title: 'Contact', href: '/contact' },
            { title: 'FAQ', href: '/faq' },
            { title: 'Terms of Service', href: '/terms' },
            { title: 'Privacy Policy', href: '/privacy' },
        ],
    },
};

export type SiteConfig = typeof siteConfig;
