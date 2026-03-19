import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://novamint.in';

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
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
