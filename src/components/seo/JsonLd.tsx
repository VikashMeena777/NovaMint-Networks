import React from 'react';

interface OrganizationJsonLdProps {
    type?: 'organization';
}

interface ServiceJsonLdProps {
    type: 'service';
    name: string;
    description: string;
    price?: number | string;
}

interface ProductJsonLdProps {
    type: 'product';
    name: string;
    description: string;
    price: number;
    currency?: string;
    sku?: string;
}

interface FaqJsonLdProps {
    type: 'faq';
    questions: Array<{ question: string; answer: string }>;
}

type JsonLdProps =
    | OrganizationJsonLdProps
    | ServiceJsonLdProps
    | ProductJsonLdProps
    | FaqJsonLdProps;

export function JsonLd(props: JsonLdProps) {
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://novamintnetworks.com';

    let schema: any;

    if (!props.type || props.type === 'organization') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'NovaMint Networks',
            alternateName: 'NovaMint Studios',
            url: siteUrl,
            logo: `${siteUrl}/images/novamint-logo.jpg`,
            description:
                'Next-generation AI automation studio & cinematic viral content engine. Scaling creator businesses and modern agencies with autonomous pipelines.',
            sameAs: [
                'https://instagram.com/novamintnetworks',
                'https://twitter.com/novamintnetworks',
                'https://youtube.com/@novamintnetworks',
                'https://linkedin.com/company/novamintnetworks',
            ],
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'support@novamintnetworks.in',
                areaServed: 'Worldwide',
                availableLanguage: ['English', 'Hindi'],
            },
        };
    } else if (props.type === 'service') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: props.name,
            description: props.description,
            provider: {
                '@type': 'Organization',
                name: 'NovaMint Networks',
                url: siteUrl,
            },
            priceRange: props.price ? `₹${props.price}` : '₹₹₹',
            areaServed: 'Worldwide',
        };
    } else if (props.type === 'product') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: props.name,
            description: props.description,
            sku: props.sku || 'NM-DIGITAL',
            brand: {
                '@type': 'Brand',
                name: 'NovaMint Networks',
            },
            offers: {
                '@type': 'Offer',
                price: props.price,
                priceCurrency: props.currency || 'INR',
                availability: 'https://schema.org/InStock',
                url: siteUrl,
            },
        };
    } else if (props.type === 'faq') {
        schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: props.questions.map((q) => ({
                '@type': 'Question',
                name: q.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: q.answer,
                },
            })),
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
