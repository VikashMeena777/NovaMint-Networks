import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const title = searchParams.get('title') || 'NovaMint Networks';
        const subtitle =
            searchParams.get('subtitle') ||
            'Autonomous AI Workflows & Cinematic Viral Content Studio';
        const category = searchParams.get('category') || 'ENTERPRISE AI ARCHITECTURE';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: '#030407',
                        padding: '60px 80px',
                        position: 'relative',
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* Glowing background mesh */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            right: '-100px',
                            width: '500px',
                            height: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(3, 4, 7, 0) 70%)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-80px',
                            left: '200px',
                            width: '450px',
                            height: '450px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(3, 4, 7, 0) 70%)',
                        }}
                    />

                    {/* Top Bar: Brand & Category Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                }}
                            >
                                N
                            </div>
                            <span
                                style={{
                                    fontSize: '26px',
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                NovaMint Networks
                            </span>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 20px',
                                borderRadius: '9999px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#a78bfa',
                                fontSize: '13px',
                                fontWeight: '700',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                            }}
                        >
                            <span
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#10b981',
                                }}
                            />
                            {category}
                        </div>
                    </div>

                    {/* Main Content: Title & Subtitle */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            maxWidth: '960px',
                            zIndex: 10,
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '64px',
                                fontWeight: '900',
                                color: '#ffffff',
                                lineHeight: '1.1',
                                letterSpacing: '-1.5px',
                                margin: 0,
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            style={{
                                fontSize: '24px',
                                color: '#9ca3af',
                                lineHeight: '1.4',
                                margin: 0,
                            }}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* Bottom Metadata & Trust Indicators */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingTop: '24px',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        <div style={{ display: 'flex', gap: '32px' }}>
                            <span style={{ fontSize: '15px', color: '#d1d5db', fontWeight: '600' }}>
                                ⚡ Autonomous n8n Systems
                            </span>
                            <span style={{ fontSize: '15px', color: '#d1d5db', fontWeight: '600' }}>
                                🎬 30+ High-Retention Reels/mo
                            </span>
                            <span style={{ fontSize: '15px', color: '#d1d5db', fontWeight: '600' }}>
                                🛡️ Enterprise SLA Guaranteed
                            </span>
                        </div>

                        <span
                            style={{
                                fontSize: '14px',
                                color: '#a78bfa',
                                fontWeight: '700',
                                letterSpacing: '0.5px',
                            }}
                        >
                            novamintnetworks.com
                        </span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error('OG Image generation error:', e);
        return new Response('Failed to generate OpenGraph image', { status: 500 });
    }
}
