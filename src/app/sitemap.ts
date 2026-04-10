import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://novamintnetworks.in';

    const routes = [
        '',
        '/about',
        '/services',
        '/products',
        '/ai-automations',
        '/portfolio',
        '/testimonials',
        '/pricing',
        '/faq',
        '/contact',
        '/login',
        '/register',
        '/privacy',
        '/terms',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : route === '/privacy' || route === '/terms' ? 'yearly' : 'weekly',
        priority: route === '' ? 1 : route === '/privacy' || route === '/terms' ? 0.3 : 0.8,
    }));
}
