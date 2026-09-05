import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/ratelimit';

interface BriefRequestBody {
    niche: string;
    goal: string;
    volume: string;
    bottleneck: string;
    brandName: string;
    workEmail: string;
    handle?: string;
}

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
        const rateLimit = await checkRateLimit(`brief:${ip}`, 6, 300);
        if (!rateLimit.success) {
            return NextResponse.json(
                { error: 'Too many brief generations. Please wait a few minutes before trying again.' },
                { status: 429 }
            );
        }

        const body: BriefRequestBody = await request.json();
        const { niche, goal, volume, bottleneck, brandName, workEmail, handle } = body;

        if (!niche || !goal || !workEmail) {
            return NextResponse.json(
                { error: 'Niche, growth objective, and work email are required' },
                { status: 400 }
            );
        }

        // 1. Check for live Groq API Key
        let generatedPlan = null;
        if (process.env.GROQ_API_KEY) {
            try {
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: 'llama-3.3-70b-versatile',
                        messages: [
                            {
                                role: 'system',
                                content:
                                    'You are the Principal AI Systems Architect at NovaMint Networks. Based on the client parameters, generate a high-status, high-ROI custom agency proposal. Return STRICT JSON with keys: title, summary, coreArchitecture, deliverables (array of 4 strings), hoursSavedPerMonth (number), estimatedAnnualSavings (string in INR), recommendedRetainer, nextSteps.',
                            },
                            {
                                role: 'user',
                                content: `Client: ${brandName || 'Brand'}, Niche: ${niche}, Primary Goal: ${goal}, Monthly Volume: ${volume}, Biggest Bottleneck: ${bottleneck}`,
                            },
                        ],
                        response_format: { type: 'json_object' },
                        max_tokens: 1024,
                        temperature: 0.7,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const content = data.choices?.[0]?.message?.content;
                    if (content) {
                        generatedPlan = JSON.parse(content);
                    }
                }
            } catch (llmErr) {
                console.warn('Groq LLM call failed, using deterministic strategic engine:', llmErr);
            }
        }

        // 2. Deterministic High-Fidelity Strategic Engine Fallback
        if (!generatedPlan) {
            const nicheMap: Record<string, { label: string; system: string; tier: string }> = {
                ecom: {
                    label: 'E-Commerce & D2C Brands',
                    system: 'Autonomous Product Video Generation + Meta Reels Conversion Funnel',
                    tier: 'Growth Retainer (30 UGC & 3D AI Reels/mo)',
                },
                saas: {
                    label: 'B2B SaaS & Tech Ventures',
                    system: 'Interactive Demo-to-Reels Repurposing + Automated Lead Qualification Bot',
                    tier: 'Enterprise Automation Pod (n8n + Omnichannel Reels)',
                },
                creator: {
                    label: 'High-Ticket Creator Empire',
                    system: 'Voice-Cloned Cinematic Long-to-Shorts Pipeline + YouTube Shorts Repurposing',
                    tier: 'Viral Creator Retainer (45 Polished Shorts/mo)',
                },
                realestate: {
                    label: 'Luxury Real Estate & Finance',
                    system: 'Property Tour Drone Simulation + WhatsApp Instant Lead Qualification Bot',
                    tier: 'Elite Media Pod (20 Cinematic Tours + Lead Automation)',
                },
                agency: {
                    label: 'Digital Marketing & Growth Agencies',
                    system: 'White-Label AI Video Production Cluster + Automated Client Reporting Pipeline',
                    tier: 'Agency Partner Retainer (Unlimited Batch Processing)',
                },
            };

            const selectedNiche = nicheMap[niche] || nicheMap.ecom;
            const hoursSaved = volume === 'enterprise' ? 160 : volume === '100' ? 120 : volume === '30' ? 75 : 35;
            const savingsInLakhs = (hoursSaved * 2500 * 12) / 100000;

            generatedPlan = {
                title: `Autonomous Production Blueprint for ${brandName || 'Your Brand'}`,
                summary: `Custom operational architecture engineered to eliminate ${bottleneck.replace('_', ' ')} and achieve 10x output in ${selectedNiche.label}.`,
                coreArchitecture: selectedNiche.system,
                deliverables: [
                    `Proprietary viral script generation & hook testing pipeline`,
                    `AI voice-cloning & cinematic motion graphics rendering pod`,
                    `Automated multi-platform scheduling (Instagram, YouTube, LinkedIn, TikTok)`,
                    `Instant inbound lead qualification workflow via n8n & CRM webhook sync`,
                ],
                hoursSavedPerMonth: hoursSaved,
                estimatedAnnualSavings: `₹${savingsInLakhs.toFixed(1)} Lakhs / year`,
                recommendedRetainer: selectedNiche.tier,
                nextSteps: 'Schedule a 20-minute 1-on-1 strategy call with our Technical Director to review workflow architecture and deploy pilot batch.',
            };
        }

        // 3. Persist lead in Supabase for agency followup
        try {
            const supabase = createAdminClient();
            await supabase.from('contact_submissions').insert({
                name: brandName || workEmail.split('@')[0],
                email: workEmail,
                subject: `AI Scope Brief Generated: ${brandName || workEmail}`,
                message: `[AI BRIEF GENERATED]\nNiche: ${niche}\nGoal: ${goal}\nVolume: ${volume}\nBottleneck: ${bottleneck}\nHandle: ${handle || 'N/A'}\nPlan: ${generatedPlan.title}\nRetainer: ${generatedPlan.recommendedRetainer}`,
            });
        } catch (dbErr) {
            console.error('Failed to log brief to contact_submissions:', dbErr);
            // Don't fail the response if lead table has minor schema variance
        }

        return NextResponse.json({
            success: true,
            plan: generatedPlan,
        });
    } catch (error) {
        console.error('AI brief generation error:', error);
        return NextResponse.json(
            { error: 'Internal server error while formulating brief' },
            { status: 500 }
        );
    }
}
