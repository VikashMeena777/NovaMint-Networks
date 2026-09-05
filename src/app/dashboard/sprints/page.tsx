'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Flame,
    Zap,
    CheckCircle2,
    Clock,
    AlertCircle,
    Play,
    Pause,
    Volume2,
    Search,
    Filter,
    Calendar,
    ChevronRight,
    Sparkles,
    Video,
    Bot,
    Wand2,
    Eye,
    Send,
    Check,
    RotateCcw,
    Plus,
    ExternalLink,
    MessageSquare,
    Copy,
    BarChart3,
    Activity,
    SlidersHorizontal,
    LayoutGrid,
    List,
    X,
    TrendingUp,
    ShieldCheck,
    FileText
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { toast } from 'sonner';

// ==========================================
// TYPES & CONTRACTS
// ==========================================

export type SprintStage =
    | 'scripting'
    | 'ai_generation'
    | 'motion_polish'
    | 'client_review'
    | 'scheduled_live';

export type Platform = 'instagram' | 'youtube' | 'tiktok' | 'linkedin';

export interface ReelItem {
    id: string;
    code: string; // e.g. "REL-023"
    title: string;
    hook: string;
    stage: SprintStage;
    month: string;
    targetDate: string;
    durationSeconds: number;
    platforms: Platform[];
    aiModel: string;
    voiceClone: string;
    assignedLead: string;
    reviewStatus: 'pending' | 'approved' | 'revision_requested';
    clientFeedback?: string;
    liveUrl?: string;
    previewThumbnail: string;
    viewsCount?: string;
    likesCount?: string;
    scriptSnippet: string;
}

// ==========================================
// MOCK RETAINER SPRINT DATA
// ==========================================

const INITIAL_REELS: ReelItem[] = [
    // Column 1: Scripting & Ideation
    {
        id: 'reel-26',
        code: 'REL-026',
        title: '3 AI Tools That Replace a $100k Agency Team',
        hook: '"If you are still paying $5,000/mo for basic video editing, you are being robbed in plain daylight..."',
        stage: 'scripting',
        month: 'September 2026',
        targetDate: 'Sep 12, 2026',
        durationSeconds: 44,
        platforms: ['instagram', 'youtube', 'tiktok'],
        aiModel: 'Claude 3.7 Sonnet Script Engine',
        voiceClone: 'NovaMint Executive Male (ElevenLabs v2.5)',
        assignedLead: 'Alex Rivers',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: '[Hook - 0:00-0:03]: Fast zoom into camera with glitch typography overlay: "STOP PAYING AGENCIES $5K/MO". [Body - 0:03-0:30]: Rapid breakdown of n8n autonomous scraping, Midjourney asset pipeline, and HeyGen rendering. [CTA - 0:30-0:44]: Comment "SCALE" for our private prompt workflow.',
    },
    {
        id: 'reel-27',
        code: 'REL-027',
        title: 'The Secret Retention Hook Formula Used by 10M+ Creators',
        hook: '"Here is why 92% of viewers swipe away in the first 1.2 seconds, and how 1 sound effect fixes it..."',
        stage: 'scripting',
        month: 'September 2026',
        targetDate: 'Sep 14, 2026',
        durationSeconds: 38,
        platforms: ['instagram', 'tiktok', 'linkedin'],
        aiModel: 'NovaMint Viral Hook Architect v4',
        voiceClone: 'Studio Clarity Female (ElevenLabs)',
        assignedLead: 'Tara Chen',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: '[Hook]: Visual drop with custom sound design. [Analysis]: Compare flat intro vs pattern interrupt. [Takeaway]: The 3-layer sensory trigger rule.',
    },
    {
        id: 'reel-28',
        code: 'REL-028',
        title: 'Behind The Scenes: How We Generated 1.4M Views with $0 Ad Spend',
        hook: '"We turned a 40-minute podcast into 22 hyper-optimized reels using autonomous AI agents. Here is the exact pipeline..."',
        stage: 'scripting',
        month: 'September 2026',
        targetDate: 'Sep 16, 2026',
        durationSeconds: 52,
        platforms: ['youtube', 'linkedin', 'instagram'],
        aiModel: 'DeepSeek R1 Narrative Synthesizer',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Vikram S.',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: '[0:00]: Split screen showing raw audio vs viral finished reel. [0:15]: n8n webhook routing clips to Whisper and subtitle engines.',
    },

    // Column 2: AI Generation & Avatars
    {
        id: 'reel-23',
        code: 'REL-023',
        title: 'HeyGen 3.0 Ultra-Realistic Founder Clone Demo',
        hook: '"This entire video was generated in 9 minutes while I was asleep in Zurich. Look at my lips..."',
        stage: 'ai_generation',
        month: 'September 2026',
        targetDate: 'Sep 09, 2026',
        durationSeconds: 41,
        platforms: ['instagram', 'youtube', 'tiktok'],
        aiModel: 'HeyGen 3.0 Enterprise Avatar + Kling AI',
        voiceClone: 'Custom 48kHz Neural Voice Clone',
        assignedLead: 'AI Render Engine #04',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Macro zoom on lips and micro-expressions. Proof of zero uncanny-valley artifacting.',
    },
    {
        id: 'reel-24',
        code: 'REL-024',
        title: 'Sora 2 vs Kling AI: Real World B-Roll Faceoff',
        hook: '"We gave both models the exact same cyberpunk city prompt. One blew our minds, the other looked like 2012 CGI..."',
        stage: 'ai_generation',
        month: 'September 2026',
        targetDate: 'Sep 10, 2026',
        durationSeconds: 46,
        platforms: ['youtube', 'tiktok', 'instagram'],
        aiModel: 'Kling 1.5 HD Video Generator',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'AI Render Engine #02',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Side-by-side rendering benchmark with frame rate and physics comparison.',
    },
    {
        id: 'reel-25',
        code: 'REL-025',
        title: 'The $0 Micro-SaaS Tech Stack in 2026',
        hook: '"You can launch a cash-flowing SaaS application with Supabase, Cashfree, and Groq without paying a single dollar upfront..."',
        stage: 'ai_generation',
        month: 'September 2026',
        targetDate: 'Sep 11, 2026',
        durationSeconds: 39,
        platforms: ['instagram', 'linkedin'],
        aiModel: 'Midjourney v6.1 Motion + ElevenLabs',
        voiceClone: 'Studio Clarity Female',
        assignedLead: 'AI Render Engine #01',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Displaying clean UI architecture diagrams with glowing animated connection lines.',
    },

    // Column 3: Human Motion & Polish
    {
        id: 'reel-19',
        code: 'REL-019',
        title: 'Why Your SaaS Landing Page Isn’t Converting Paid Trials',
        hook: '"Stop hiding your pricing. Here is the 1 UX change that boosted our client’s checkout by 318%..."',
        stage: 'motion_polish',
        month: 'September 2026',
        targetDate: 'Sep 07, 2026',
        durationSeconds: 47,
        platforms: ['linkedin', 'instagram', 'youtube'],
        aiModel: 'Claude 3.7 + Motion Graphics Pipeline',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Marcus Vance (Senior Motion Designer)',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Smooth kinetic typography, 3D cursor interaction zooms, dynamic Cashfree checkout mockups.',
    },
    {
        id: 'reel-20',
        code: 'REL-020',
        title: '7 Micro-Animations That Make Web Apps Feel 10x More Expensive',
        hook: '"Apple and Linear spent millions perfecting these 7 micro-transitions. Here is how to copy them in 5 lines of CSS..."',
        stage: 'motion_polish',
        month: 'September 2026',
        targetDate: 'Sep 08, 2026',
        durationSeconds: 35,
        platforms: ['instagram', 'tiktok'],
        aiModel: 'Synthesia + After Effects 2026',
        voiceClone: 'Studio Clarity Female',
        assignedLead: 'Elena Rostova',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'High-speed UI transitions with tactile audio sound design.',
    },
    {
        id: 'reel-21',
        code: 'REL-021',
        title: 'Autonomous Voice AI Agents Replacing Cold Call Centers',
        hook: '"Listen to this phone call between our AI agent and an angry customer. It took 45 seconds to close the deal..."',
        stage: 'motion_polish',
        month: 'September 2026',
        targetDate: 'Sep 08, 2026',
        durationSeconds: 58,
        platforms: ['youtube', 'linkedin'],
        aiModel: 'Twilio + LiveKit + DeepSeek R1',
        voiceClone: 'Conversational Neural Voice',
        assignedLead: 'Marcus Vance',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Audio waveform visualizations with synchronized transcript highlighting.',
    },
    {
        id: 'reel-22',
        code: 'REL-022',
        title: 'Building a High-Volume n8n Webhook Architecture',
        hook: '"How we process 500,000 daily webhook events without paying AWS Enterprise fees..."',
        stage: 'motion_polish',
        month: 'September 2026',
        targetDate: 'Sep 09, 2026',
        durationSeconds: 43,
        platforms: ['youtube', 'instagram', 'linkedin'],
        aiModel: 'Midjourney + After Effects',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Elena Rostova',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Isometric server rack motion graphics and animated load balancer flow.',
    },

    // Column 4: Client Review (ACTION REQUIRED)
    {
        id: 'reel-15',
        code: 'REL-015',
        title: 'How to Automate Your Entire Content Machine with n8n',
        hook: '"I run 5 media brands with ZERO full-time employees. Here is the n8n diagram that runs my life..."',
        stage: 'client_review',
        month: 'September 2026',
        targetDate: 'Sep 05, 2026',
        durationSeconds: 48,
        platforms: ['instagram', 'youtube', 'tiktok', 'linkedin'],
        aiModel: 'HeyGen 3.0 Avatar + ElevenLabs',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Alex Rivers',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: '[Hook]: Fast camera pull back revealing 4 monitors with n8n workflows executing. [Section 1]: RSS trigger -> Groq summarizer -> ElevenLabs voice synthesis -> Remotion render. [Section 2]: Multi-platform auto-posting through verified APIs. [CTA]: Tap link in bio for the raw n8n JSON file.',
    },
    {
        id: 'reel-16',
        code: 'REL-016',
        title: 'The Truth About DeepSeek R1 & Open-Source LLMs',
        hook: '"Everyone is panicking about AI models being commoditized. Here is what smart founders are doing right now..."',
        stage: 'client_review',
        month: 'September 2026',
        targetDate: 'Sep 06, 2026',
        durationSeconds: 54,
        platforms: ['youtube', 'linkedin', 'instagram'],
        aiModel: 'Midjourney v6.1 + Kling HD',
        voiceClone: 'Studio Clarity Female',
        assignedLead: 'Tara Chen',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Benchmark charts showing open-source vs proprietary intelligence costs over time. Dynamic comparison matrix.',
    },
    {
        id: 'reel-17',
        code: 'REL-017',
        title: '5 Chrome Extensions Every Creator Needs in 2026',
        hook: '"Delete these 4 outdated extensions and replace them with these 5 AI copilot tools today..."',
        stage: 'client_review',
        month: 'September 2026',
        targetDate: 'Sep 06, 2026',
        durationSeconds: 38,
        platforms: ['instagram', 'tiktok'],
        aiModel: 'HeyGen 3.0 Avatar',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Vikram S.',
        reviewStatus: 'revision_requested',
        clientFeedback: 'Please make the title transition slower at 0:12, and increase the volume of the background beat by 10%.',
        previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Fast-paced tool showcases with spotlight magnifiers on Chrome browser tabs.',
    },
    {
        id: 'reel-18',
        code: 'REL-018',
        title: 'The $0 Tech Stack for High-Ticket B2B Sales',
        hook: '"If your sales team is still manually typing outbound emails, your competitors are eating your lunch..."',
        stage: 'client_review',
        month: 'September 2026',
        targetDate: 'Sep 07, 2026',
        durationSeconds: 44,
        platforms: ['linkedin', 'instagram', 'youtube'],
        aiModel: 'ElevenLabs + After Effects Custom',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Marcus Vance',
        reviewStatus: 'pending',
        previewThumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'High-contrast black & emerald visualizer displaying automated enrichment pipeline.',
    },

    // Column 5: Scheduled & Live (DELIVERED & RUNNING)
    {
        id: 'reel-09',
        code: 'REL-009',
        title: 'Building an AI Voice Agent in 10 Minutes',
        hook: '"We built a voice AI bot that can book dentist appointments without sounding like a robot..."',
        stage: 'scheduled_live',
        month: 'September 2026',
        targetDate: 'Sep 01, 2026',
        durationSeconds: 51,
        platforms: ['instagram', 'youtube', 'tiktok'],
        aiModel: 'LiveKit + ElevenLabs',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Alex Rivers',
        reviewStatus: 'approved',
        liveUrl: 'https://instagram.com/novamint.ai',
        viewsCount: '48.2K',
        likesCount: '3.4K',
        previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Live telephone call recording with sound visualizer overlay.',
    },
    {
        id: 'reel-10',
        code: 'REL-010',
        title: 'Stop Building Wrappers, Build Deep Workflows',
        hook: '"Why 95% of GPT wrappers will go bankrupt before December, and what you should build instead..."',
        stage: 'scheduled_live',
        month: 'September 2026',
        targetDate: 'Sep 02, 2026',
        durationSeconds: 42,
        platforms: ['linkedin', 'youtube', 'instagram'],
        aiModel: 'Midjourney v6.1 + After Effects',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Tara Chen',
        reviewStatus: 'approved',
        liveUrl: 'https://youtube.com/shorts/novamint',
        viewsCount: '89.5K',
        likesCount: '6.1K',
        previewThumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Architectural breakdown of moat defense in generative AI systems.',
    },
    {
        id: 'reel-11',
        code: 'REL-011',
        title: 'Why 90% of Startups Fail at Organic Video',
        hook: '"The mistake is trying to be interesting. In 2026, the algorithm only rewards hyper-specific tactical utility..."',
        stage: 'scheduled_live',
        month: 'September 2026',
        targetDate: 'Sep 03, 2026',
        durationSeconds: 36,
        platforms: ['instagram', 'tiktok'],
        aiModel: 'HeyGen 3.0 Avatar',
        voiceClone: 'Studio Clarity Female',
        assignedLead: 'Vikram S.',
        reviewStatus: 'approved',
        liveUrl: 'https://tiktok.com/@novamint',
        viewsCount: '32.1K',
        likesCount: '2.2K',
        previewThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: '3 case studies of viral B2B organic TikTok strategies.',
    },
    {
        id: 'reel-12',
        code: 'REL-012',
        title: 'The Autonomous Social Agency Tech Stack',
        hook: '"How 3 people run a 7-figure content distribution machine with n8n, Groq, and custom Discord bots..."',
        stage: 'scheduled_live',
        month: 'September 2026',
        targetDate: 'Sep 04, 2026',
        durationSeconds: 59,
        platforms: ['youtube', 'linkedin', 'instagram'],
        aiModel: 'Claude 3.7 + Kling HD',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Marcus Vance',
        reviewStatus: 'approved',
        liveUrl: 'https://linkedin.com/company/novamint',
        viewsCount: '114.7K',
        likesCount: '8.9K',
        previewThumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Complete blueprint schematic of autonomous media distribution node tree.',
    },
    {
        id: 'reel-13',
        code: 'REL-013',
        title: 'Top 3 Cashfree UPI Conversion Hacks for India',
        hook: '"Indian consumers drop off at checkout if they see card inputs first. Here is the 1-tap UPI flow that converted 82%..."',
        stage: 'scheduled_live',
        month: 'September 2026',
        targetDate: 'Sep 05, 2026 (Live in 14h)',
        durationSeconds: 40,
        platforms: ['instagram', 'youtube'],
        aiModel: 'After Effects + ElevenLabs',
        voiceClone: 'Studio Clarity Female',
        assignedLead: 'Alex Rivers',
        reviewStatus: 'approved',
        liveUrl: 'https://instagram.com/novamint.ai',
        viewsCount: 'Scheduled (Next Drop)',
        previewThumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Mobile screen recording of instantaneous UPI intent payment flow.',
    },
    {
        id: 'reel-14',
        code: 'REL-014',
        title: 'From Zero to 10k MRR with Automated Micro-SaaS',
        hook: '"You do not need VC funding or 10 developers to build a business that makes ₹8,00,000 every month..."',
        stage: 'scheduled_live',
        month: 'September 2026',
        targetDate: 'Sep 06, 2026 (Queued)',
        durationSeconds: 45,
        platforms: ['linkedin', 'instagram'],
        aiModel: 'HeyGen 3.0 Avatar',
        voiceClone: 'NovaMint Executive Male',
        assignedLead: 'Elena Rostova',
        reviewStatus: 'approved',
        liveUrl: 'https://linkedin.com/company/novamint',
        viewsCount: 'Queued for Drop',
        previewThumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
        scriptSnippet: 'Financial dashboard breakdown of MRR breakdown and low server costs.',
    },
];

// 5 Kanban Columns configuration
const STAGE_COLUMNS: { id: SprintStage; title: string; icon: any; color: string; badgeColor: string; description: string }[] = [
    {
        id: 'scripting',
        title: 'Scripting & Ideation',
        icon: FileText,
        color: 'from-blue-500/20 to-transparent',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        description: 'Viral hooks, narrative structures & retention scripts',
    },
    {
        id: 'ai_generation',
        title: 'AI Generation & Avatars',
        icon: Bot,
        color: 'from-purple-500/20 to-transparent',
        badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        description: 'Neural voice clones, HeyGen 3.0 & Kling 1.5 HD synthesis',
    },
    {
        id: 'motion_polish',
        title: 'Human Motion & Polish',
        icon: Wand2,
        color: 'from-amber-500/20 to-transparent',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        description: 'Sound design, kinetic typography & 9:16 retention edits',
    },
    {
        id: 'client_review',
        title: 'Client Review',
        icon: Eye,
        color: 'from-cyan-500/20 to-transparent',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        description: 'Sign-off pending · Interactive 1-click approvals',
    },
    {
        id: 'scheduled_live',
        title: 'Scheduled & Live',
        icon: Zap,
        color: 'from-emerald-500/20 to-transparent',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        description: 'Auto-published across YouTube, IG, TikTok & LinkedIn',
    },
];

export default function RetainerSprintsPage() {
    // State management
    const [reels, setReels] = useState<ReelItem[]>(INITIAL_REELS);
    const [selectedMonth, setSelectedMonth] = useState<string>('September 2026');
    const [selectedStage, setSelectedStage] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

    // Review Modal State
    const [reviewModalReel, setReviewModalReel] = useState<ReelItem | null>(null);
    const [feedbackText, setFeedbackText] = useState<string>('');
    const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(false);
    const [playbackProgress, setPlaybackProgress] = useState<number>(0);

    // New Idea Modal State
    const [showNewIdeaModal, setShowNewIdeaModal] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState('');
    const [newHook, setNewHook] = useState('');
    const [newAudience, setNewAudience] = useState('');

    // Dynamic Live Countdown State (Calculates time until next content drop at 09:30 AM tomorrow)
    const [countdown, setCountdown] = useState({ hours: 14, minutes: 22, seconds: 8 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                }
                if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                }
                if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return { hours: 23, minutes: 59, seconds: 59 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulated Video Playback Tracker
    useEffect(() => {
        let interval: any = null;
        if (isPlayingSimulation) {
            interval = setInterval(() => {
                setPlaybackProgress((prev) => {
                    if (prev >= 100) {
                        setIsPlayingSimulation(false);
                        return 0;
                    }
                    return prev + 2;
                });
            }, 300);
        }
        return () => clearInterval(interval);
    }, [isPlayingSimulation]);

    // Metrics Calculations
    const totalProduced = reels.length; // 22 reels
    const monthlyQuota = 30;
    const progressPercent = Math.round((totalProduced / monthlyQuota) * 100);

    // Filtering
    const filteredReels = useMemo(() => {
        return reels.filter((reel) => {
            const matchesMonth = selectedMonth === 'all' || reel.month === selectedMonth;
            const matchesStage = selectedStage === 'all' || reel.stage === selectedStage;
            const matchesSearch =
                searchQuery === '' ||
                reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                reel.hook.toLowerCase().includes(searchQuery.toLowerCase()) ||
                reel.code.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesMonth && matchesStage && matchesSearch;
        });
    }, [reels, selectedMonth, selectedStage, searchQuery]);

    // Stage counts
    const stageCounts = useMemo(() => {
        const counts: Record<string, number> = {
            scripting: 0,
            ai_generation: 0,
            motion_polish: 0,
            client_review: 0,
            scheduled_live: 0,
        };
        reels.forEach((r) => {
            if (counts[r.stage] !== undefined) counts[r.stage]++;
        });
        return counts;
    }, [reels]);

    // Actions
    const handleOpenReview = (reel: ReelItem) => {
        setReviewModalReel(reel);
        setFeedbackText(reel.clientFeedback || '');
        setPlaybackProgress(0);
        setIsPlayingSimulation(false);
    };

    const handleApproveReel = (reelId: string) => {
        setReels((prev) =>
            prev.map((r) =>
                r.id === reelId
                    ? {
                          ...r,
                          stage: 'scheduled_live',
                          reviewStatus: 'approved',
                          liveUrl: 'https://instagram.com/novamint.ai',
                      }
                    : r
            )
        );
        toast.success('Reel Approved!', {
            description: 'Item dispatched to automated omnichannel publishing queue.',
        });
        setReviewModalReel(null);
    };

    const handleRequestRevision = (reelId: string) => {
        if (!feedbackText.trim()) {
            toast.error('Please specify feedback notes for the production team.');
            return;
        }

        setReels((prev) =>
            prev.map((r) =>
                r.id === reelId
                    ? {
                          ...r,
                          stage: 'motion_polish',
                          reviewStatus: 'revision_requested',
                          clientFeedback: feedbackText,
                      }
                    : r
            )
        );
        toast.info('Revision Brief Dispatched!', {
            description: 'Creative team notified. Adjustments will be delivered in <12 hours.',
        });
        setReviewModalReel(null);
    };

    const handleCreateNewIdea = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newHook.trim()) {
            toast.error('Title and Hook are required');
            return;
        }

        const newReel: ReelItem = {
            id: `reel-${Date.now()}`,
            code: `REL-${String(reels.length + 1).padStart(3, '0')}`,
            title: newTitle,
            hook: `"${newHook}"`,
            stage: 'scripting',
            month: 'September 2026',
            targetDate: 'Sep 18, 2026',
            durationSeconds: 45,
            platforms: ['instagram', 'youtube', 'tiktok'],
            aiModel: 'Claude 3.7 Sonnet Script Engine',
            voiceClone: 'NovaMint Executive Male',
            assignedLead: 'Alex Rivers',
            reviewStatus: 'pending',
            previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
            scriptSnippet: `Target Angle: ${newAudience || 'High-growth founder retention'}. Fast visual hook with pattern interrupt typography.`,
        };

        setReels((prev) => [newReel, ...prev]);
        setShowNewIdeaModal(false);
        setNewTitle('');
        setNewHook('');
        setNewAudience('');
        toast.success('Reel Hook Submitted!', {
            description: 'Added to Scripting & Ideation column for AI script breakdown.',
        });
    };

    const renderPlatformBadge = (platform: Platform) => {
        switch (platform) {
            case 'instagram':
                return (
                    <span key={platform} className="px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[9px] font-mono uppercase">
                        IG REELS
                    </span>
                );
            case 'youtube':
                return (
                    <span key={platform} className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-mono uppercase">
                        YT SHORTS
                    </span>
                );
            case 'tiktok':
                return (
                    <span key={platform} className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-mono uppercase">
                        TIKTOK
                    </span>
                );
            case 'linkedin':
                return (
                    <span key={platform} className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono uppercase">
                        LINKEDIN
                    </span>
                );
        }
    };

    return (
        <div className="space-y-8 min-h-screen text-white">

            {/* ============================================================ */}
            {/* 1. TOP HEADER & RETAINER TIER TELEMETRY HUD                  */}
            {/* ============================================================ */}
            <SpotlightCard className="p-6 sm:p-8 bg-gradient-to-r from-[#0a0614] via-[#08090C] to-[#04090c] border-white/[0.08] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                    {/* Top Tier Identity Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                        <div>
                            <div className="flex flex-wrap items-center gap-2.5 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-[10px] font-mono text-primary-300 font-bold uppercase tracking-widest">
                                    <Flame className="w-3.5 h-3.5 text-primary-400 animate-pulse" />
                                    <span>Pillar 2 · Client Sprint Portal</span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                    Active Retainer
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white">
                                Viral Growth Sprint — 30 Reels/mo + 2 Automations
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                                Real-time production telemetry for your dedicated AI creator studio. Inspect pipeline stages, review video edits, and monitor automated social distribution.
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={() => setShowNewIdeaModal(true)}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold transition-all shadow-lg shadow-white/5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Submit Hook / Brief</span>
                            </button>
                        </div>
                    </div>

                    {/* Telemetry Progress & Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Card 1: Monthly Reels Quota */}
                        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] backdrop-blur-md space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-neutral-400 uppercase tracking-wider">Production Quota</span>
                                <span className="text-primary-400 font-bold">{progressPercent}%</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold font-display text-white">22/30</span>
                                <span className="text-xs text-neutral-400 font-mono">Reels Produced</span>
                            </div>
                            {/* Animated progress bar */}
                            <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent"
                                />
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                                <span>8 slots remaining</span>
                                <span className="text-emerald-400">+4 ahead of schedule</span>
                            </div>
                        </div>

                        {/* Card 2: Active Automations */}
                        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] backdrop-blur-md space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-neutral-400 uppercase tracking-wider">AI Workflows</span>
                                <span className="text-emerald-400 font-bold">100% HEALTH</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold font-display text-emerald-400">2/2</span>
                                <span className="text-xs text-neutral-400 font-mono">Workflows Active</span>
                            </div>
                            <div className="space-y-1.5 text-[11px] font-mono text-neutral-300">
                                <div className="flex items-center gap-2 truncate">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span className="truncate">Omnichannel Auto-Publisher (n8n)</span>
                                </div>
                                <div className="flex items-center gap-2 truncate">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                    <span className="truncate">Lead Scraper & CRM Sync</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Sprint Cycle Timeline */}
                        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] backdrop-blur-md space-y-3">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-neutral-400 uppercase tracking-wider">Sprint Cycle</span>
                                <span className="text-neutral-400">12 Days Left</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold font-display text-white">Day 18</span>
                                <span className="text-xs text-neutral-400 font-mono">of 30 Days</span>
                            </div>
                            {/* Cycle progress bar */}
                            <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '60%' }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                                />
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                                <span>Cycle: Sep 01 - Sep 30</span>
                                <span className="text-primary-300">Auto-renews Oct 01</span>
                            </div>
                        </div>

                        {/* Card 4: Next Content Drop Countdown */}
                        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 backdrop-blur-md space-y-2.5">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Next Drop T-Minus
                                </span>
                                <span className="text-emerald-400 text-[10px]">REL-013</span>
                            </div>
                            <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-white">
                                {String(countdown.hours).padStart(2, '0')}:
                                {String(countdown.minutes).padStart(2, '0')}:
                                {String(countdown.seconds).padStart(2, '0')}
                            </div>
                            <div className="text-[11px] font-mono text-neutral-400 truncate">
                                Target: <span className="text-white">Sep 05, 09:30 AM IST</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                                <span className="truncate">Top 3 Cashfree UPI Conversion Hacks</span>
                            </div>
                        </div>

                    </div>
                </div>
            </SpotlightCard>

            {/* ============================================================ */}
            {/* 2. FILTER & SEARCH CONTROL BAR                                */}
            {/* ============================================================ */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#08090C]/80 border border-white/[0.08] backdrop-blur-xl">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by reel title, hook, or code (e.g. REL-015)..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/50 border border-white/[0.08] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors font-mono"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Month selector */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="bg-black/60 border border-white/[0.08] text-neutral-300 text-xs rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary-500/50"
                        >
                            <option value="September 2026">September 2026 (Active Sprint)</option>
                            <option value="August 2026">August 2026 (Archived - 30/30)</option>
                            <option value="all">All Months</option>
                        </select>
                    </div>

                    {/* Stage quick-filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-neutral-400" />
                        <select
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value)}
                            className="bg-black/60 border border-white/[0.08] text-neutral-300 text-xs rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-primary-500/50"
                        >
                            <option value="all">All Stages ({reels.length})</option>
                            <option value="scripting">📝 Scripting ({stageCounts.scripting})</option>
                            <option value="ai_generation">⚡ AI Generation ({stageCounts.ai_generation})</option>
                            <option value="motion_polish">🎬 Motion Polish ({stageCounts.motion_polish})</option>
                            <option value="client_review">👁️ Client Review ({stageCounts.client_review})</option>
                            <option value="scheduled_live">🚀 Scheduled & Live ({stageCounts.scheduled_live})</option>
                        </select>
                    </div>

                    {/* View Switcher */}
                    <div className="flex items-center rounded-xl bg-black/60 border border-white/[0.08] p-1">
                        <button
                            onClick={() => setViewMode('kanban')}
                            className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                                viewMode === 'kanban' ? 'bg-white/10 text-white shadow' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                            title="Kanban Board View"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                                viewMode === 'list' ? 'bg-white/10 text-white shadow' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                            title="List / Table View"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ============================================================ */}
            {/* 3. KANBAN BOARD (5 PRODUCTION STAGES)                         */}
            {/* ============================================================ */}
            {viewMode === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-start overflow-x-auto pb-6">
                    {STAGE_COLUMNS.map((col) => {
                        const colItems = filteredReels.filter((r) => r.stage === col.id);
                        const ColIcon = col.icon;
                        const isReviewColumn = col.id === 'client_review';

                        return (
                            <div
                                key={col.id}
                                className={`rounded-2xl border bg-[#08090C]/80 backdrop-blur-xl flex flex-col min-w-[280px] transition-all duration-300 ${
                                    isReviewColumn
                                        ? 'border-cyan-500/30 shadow-lg shadow-cyan-950/20'
                                        : 'border-white/[0.08]'
                                }`}
                            >
                                {/* Column Header */}
                                <div className={`p-4 border-b border-white/[0.06] bg-gradient-to-b ${col.color}`}>
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <div className="flex items-center gap-2">
                                            <ColIcon className="w-4 h-4 text-white" />
                                            <h3 className="text-xs font-bold font-display uppercase tracking-wider text-white">
                                                {col.title}
                                            </h3>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${col.badgeColor}`}>
                                            {colItems.length}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-neutral-400 line-clamp-1">
                                        {col.description}
                                    </p>
                                </div>

                                {/* Column Content Cards */}
                                <div className="p-3 space-y-3 min-h-[420px] flex flex-col">
                                    {colItems.length === 0 ? (
                                        <div className="h-40 rounded-xl border border-dashed border-white/[0.08] flex flex-col items-center justify-center p-4 text-center text-neutral-500">
                                            <p className="text-xs font-mono">No reels in this stage</p>
                                        </div>
                                    ) : (
                                        colItems.map((reel) => (
                                            <motion.div
                                                key={reel.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`p-3.5 rounded-xl border bg-black/60 transition-all duration-200 group hover:border-white/20 relative ${
                                                    reel.reviewStatus === 'revision_requested'
                                                        ? 'border-amber-500/40 bg-amber-950/10'
                                                        : reel.stage === 'client_review'
                                                        ? 'border-cyan-500/30 hover:border-cyan-400/60'
                                                        : 'border-white/[0.06]'
                                                }`}
                                            >
                                                {/* Card Header: Code & Date */}
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <span className="text-[10px] font-mono text-primary-400 font-bold tracking-wider">
                                                        {reel.code}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                                                        <Clock className="w-3 h-3 text-neutral-500" />
                                                        <span>{reel.durationSeconds}s</span>
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-xs font-bold text-white leading-snug mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                                                    {reel.title}
                                                </h4>

                                                {/* Hook Preview */}
                                                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] mb-3">
                                                    <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                                                        Viral Hook (0:00 - 0:03)
                                                    </div>
                                                    <p className="text-[11px] text-neutral-300 italic line-clamp-2 leading-relaxed">
                                                        {reel.hook}
                                                    </p>
                                                </div>

                                                {/* Specific stage-dependent badges */}
                                                <div className="space-y-2 mb-3">
                                                    {/* AI model or Editor Lead */}
                                                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                                                        <span className="truncate text-neutral-500">{reel.assignedLead}</span>
                                                        <span className="truncate text-primary-400/80">{reel.targetDate}</span>
                                                    </div>

                                                    {/* Platforms */}
                                                    <div className="flex flex-wrap gap-1">
                                                        {reel.platforms.map((p) => renderPlatformBadge(p))}
                                                    </div>
                                                </div>

                                                {/* Column Actions */}
                                                {reel.stage === 'client_review' && (
                                                    <div className="pt-2 border-t border-white/[0.08]">
                                                        {reel.reviewStatus === 'revision_requested' ? (
                                                            <div className="space-y-2">
                                                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                                                    <AlertCircle className="w-3 h-3" />
                                                                    Revision Underway
                                                                </span>
                                                                <button
                                                                    onClick={() => handleOpenReview(reel)}
                                                                    className="w-full py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-bold font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                                                >
                                                                    <Eye className="w-3 h-3" />
                                                                    <span>Inspect Brief</span>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleOpenReview(reel)}
                                                                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-primary-500 text-white text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20 hover:opacity-90"
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                                <span>Review & Sign-Off</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                )}

                                                {reel.stage === 'scheduled_live' && (
                                                    <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
                                                        <div className="flex items-center gap-1 text-emerald-400">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            <span>{reel.viewsCount ? `${reel.viewsCount} views` : 'Scheduled'}</span>
                                                        </div>
                                                        {reel.liveUrl && (
                                                            <a
                                                                href={reel.liveUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                                                            >
                                                                <span>Preview</span>
                                                                <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Linear Table / List View */
                <SpotlightCard className="p-6 bg-[#08090C]/80 border-white/[0.08] overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-neutral-400 text-[10px] uppercase">
                                <th className="pb-3 px-3">Code</th>
                                <th className="pb-3 px-3">Reel Title & Hook</th>
                                <th className="pb-3 px-3">Stage</th>
                                <th className="pb-3 px-3">Platforms</th>
                                <th className="pb-3 px-3">Target Date</th>
                                <th className="pb-3 px-3">Assigned Lead</th>
                                <th className="pb-3 px-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {filteredReels.map((reel) => (
                                <tr key={reel.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3.5 px-3 text-primary-400 font-bold">{reel.code}</td>
                                    <td className="py-3.5 px-3 max-w-sm">
                                        <div className="font-semibold text-white truncate font-sans text-xs">{reel.title}</div>
                                        <div className="text-[11px] text-neutral-400 italic truncate mt-0.5">{reel.hook}</div>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                                            {reel.stage.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <div className="flex gap-1">
                                            {reel.platforms.map((p) => renderPlatformBadge(p))}
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-3 text-neutral-400">{reel.targetDate}</td>
                                    <td className="py-3.5 px-3 text-neutral-400">{reel.assignedLead}</td>
                                    <td className="py-3.5 px-3 text-right">
                                        {reel.stage === 'client_review' ? (
                                            <button
                                                onClick={() => handleOpenReview(reel)}
                                                className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[11px] font-bold transition-colors cursor-pointer"
                                            >
                                                Review Reel
                                            </button>
                                        ) : reel.stage === 'scheduled_live' && reel.liveUrl ? (
                                            <a
                                                href={reel.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-neutral-400 hover:text-white inline-flex items-center gap-1"
                                            >
                                                <span>Live</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            <span className="text-neutral-600">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </SpotlightCard>
            )}

            {/* ============================================================ */}
            {/* 4. INTERACTIVE CLIENT REVIEW MODAL DIALOG                     */}
            {/* ============================================================ */}
            <AnimatePresence>
                {reviewModalReel && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            className="w-full max-w-4xl bg-[#08090C] border border-white/[0.15] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                        <Eye className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-cyan-400 font-bold">{reviewModalReel.code}</span>
                                            <span className="text-white/20">·</span>
                                            <span className="text-xs font-mono text-neutral-400">Client Quality Review</span>
                                        </div>
                                        <h3 className="text-sm sm:text-base font-bold text-white font-display line-clamp-1">
                                            {reviewModalReel.title}
                                        </h3>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setReviewModalReel(null)}
                                    className="p-2 rounded-lg bg-white/[0.04] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Body: Two Columns (Video Player Simulation + Creative Breakdown & Feedback) */}
                            <div className="grid md:grid-cols-12 gap-6 p-6 overflow-y-auto">

                                {/* Left: 9:16 Video Player Simulation */}
                                <div className="md:col-span-5 flex flex-col items-center">
                                    <div className="w-full max-w-[260px] aspect-[9/16] rounded-2xl bg-black border border-white/20 relative overflow-hidden shadow-2xl flex flex-col justify-between p-4 group">
                                        {/* Background Thumbnail preview */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-75 transition-opacity"
                                            style={{ backgroundImage: `url(${reviewModalReel.previewThumbnail})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

                                        {/* Player HUD Header */}
                                        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/80">
                                            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                                                4K · 60FPS
                                            </span>
                                            <span className="px-2 py-0.5 rounded bg-red-500/80 text-white font-bold animate-pulse">
                                                DRAFT v2
                                            </span>
                                        </div>

                                        {/* Center Play Button */}
                                        <div className="relative z-10 self-center">
                                            <button
                                                onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                                                className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                                            >
                                                {isPlayingSimulation ? (
                                                    <Pause className="w-6 h-6 fill-black" />
                                                ) : (
                                                    <Play className="w-6 h-6 fill-black translate-x-0.5" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Player HUD Footer */}
                                        <div className="relative z-10 space-y-2">
                                            <p className="text-[11px] text-white font-medium line-clamp-2 drop-shadow">
                                                {reviewModalReel.hook}
                                            </p>
                                            {/* Progress scrub bar */}
                                            <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-400 transition-all duration-200"
                                                    style={{ width: `${playbackProgress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between text-[9px] font-mono text-white/70">
                                                <span>0:{String(Math.floor((reviewModalReel.durationSeconds * playbackProgress) / 100)).padStart(2, '0')}</span>
                                                <span>0:{reviewModalReel.durationSeconds}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-mono text-neutral-500 mt-2 text-center">
                                        Click Play to preview AI Avatar lip-sync & motion graphics pacing
                                    </p>
                                </div>

                                {/* Right: Creative Spec & Feedback Form */}
                                <div className="md:col-span-7 space-y-5">
                                    {/* Script & Narrative Blueprint */}
                                    <div>
                                        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                                            Script & Creative Blueprint
                                        </h4>
                                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] space-y-2 text-xs">
                                            <div>
                                                <span className="text-neutral-500 font-mono text-[10px]">VERIFIED HOOK:</span>
                                                <p className="text-white font-medium italic mt-0.5">{reviewModalReel.hook}</p>
                                            </div>
                                            <div>
                                                <span className="text-neutral-500 font-mono text-[10px]">AUDIO SYNTHESIS:</span>
                                                <p className="text-neutral-300 font-mono text-[11px] mt-0.5">{reviewModalReel.voiceClone}</p>
                                            </div>
                                            <div>
                                                <span className="text-neutral-500 font-mono text-[10px]">SCENE BREAKDOWN:</span>
                                                <p className="text-neutral-400 leading-relaxed text-[11px] mt-0.5">
                                                    {reviewModalReel.scriptSnippet}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feedback Area */}
                                    <div className="space-y-2">
                                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                                            Director Revision Notes (Optional)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={feedbackText}
                                            onChange={(e) => setFeedbackText(e.target.value)}
                                            placeholder="Specify adjustments for our video editors and AI prompt engineers (e.g., sound volume, pacing, typography, voice tone)..."
                                            className="w-full p-3 rounded-xl bg-black/50 border border-white/[0.1] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors resize-none"
                                        />
                                        {/* Quick modification pills */}
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {[
                                                'Faster intro pacing',
                                                'Boost background track +10%',
                                                'Enlarge kinetic subtitles',
                                                'Tone down camera zoom',
                                            ].map((pill) => (
                                                <button
                                                    key={pill}
                                                    type="button"
                                                    onClick={() => setFeedbackText((prev) => (prev ? `${prev}, ${pill}` : pill))}
                                                    className="px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                                                >
                                                    + {pill}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                                        <button
                                            onClick={() => handleRequestRevision(reviewModalReel.id)}
                                            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <RotateCcw className="w-3.5 h-3.5" />
                                            <span>Request Revision</span>
                                        </button>

                                        <button
                                            onClick={() => handleApproveReel(reviewModalReel.id)}
                                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black hover:opacity-95 text-xs font-extrabold font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <Check className="w-4 h-4 stroke-[3]" />
                                            <span>Approve & Schedule Drop</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ============================================================ */}
            {/* 5. NEW IDEA / HOOK SUBMISSION MODAL                          */}
            {/* ============================================================ */}
            <AnimatePresence>
                {showNewIdeaModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            className="w-full max-w-lg bg-[#08090C] border border-white/[0.15] rounded-2xl shadow-2xl p-6 space-y-5"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-base font-bold text-white font-display">
                                        Propose New Reel Hook
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowNewIdeaModal(false)}
                                    className="p-1.5 rounded-lg bg-white/[0.04] text-neutral-400 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateNewIdea} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                                        Working Title / Premise *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="e.g., Why 99% of Startups Pick the Wrong Database"
                                        className="w-full p-2.5 rounded-xl bg-black/50 border border-white/[0.1] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 font-sans"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                                        Raw Hook or Angle *
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={newHook}
                                        onChange={(e) => setNewHook(e.target.value)}
                                        placeholder="What's the opening sentence that makes people stop scrolling?"
                                        className="w-full p-2.5 rounded-xl bg-black/50 border border-white/[0.1] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 font-mono resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                                        Target Audience / Reference URL (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={newAudience}
                                        onChange={(e) => setNewAudience(e.target.value)}
                                        placeholder="e.g. B2B Founders, or link to competitor reel reference"
                                        className="w-full p-2.5 rounded-xl bg-black/50 border border-white/[0.1] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 font-mono"
                                    />
                                </div>

                                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewIdeaModal(false)}
                                        className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold font-mono transition-all shadow cursor-pointer"
                                    >
                                        Dispatch to Ideation Queue
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
