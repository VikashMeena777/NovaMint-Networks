'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Sparkles, 
  Share2, 
  Database, 
  ArrowRight,
  Terminal,
  Activity,
  Layers
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

interface WorkflowNode {
  id: string;
  name: string;
  role: string;
  type: 'trigger' | 'ai' | 'engine' | 'distribution' | 'storage';
  icon: React.ElementType;
  color: string;
  status: 'idle' | 'running' | 'completed';
  latency: string;
  payload: Record<string, unknown>;
}

const initialNodes: WorkflowNode[] = [
  {
    id: 'node-trigger',
    name: 'Google Drive Webhook',
    role: 'Raw 4K Footage Ingest',
    type: 'trigger',
    icon: Layers,
    color: '#06B6D4',
    status: 'idle',
    latency: '12ms',
    payload: {
      event: 'file.uploaded',
      source: 'client_raw_vault/episode_42.mov',
      size: '2.4 GB',
      resolution: '3840x2160',
      codec: 'ProRes 422 HQ',
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 'node-ai',
    name: 'Gemini 2.5 Flash + Whisper',
    role: 'Hook Detection & Viral Scoring',
    type: 'ai',
    icon: Sparkles,
    color: '#8B5CF6',
    status: 'idle',
    latency: '420ms',
    payload: {
      transcription_accuracy: '99.4%',
      detected_hooks: [
        { time: '00:03.20', score: 94, hook: 'Most creators fail because they do this...' },
        { time: '04:12.10', score: 98, hook: 'The ₹10L/mo automation secret nobody tells you' }
      ],
      retention_prediction: 'Top 5% quartile'
    }
  },
  {
    id: 'node-engine',
    name: 'Nova Kinetic Cut Engine',
    role: '9:16 Reframing & Auto-Captions',
    type: 'engine',
    icon: Cpu,
    color: '#EC4899',
    status: 'idle',
    latency: '1.2s',
    payload: {
      aspect_ratio: '9:16',
      subtitles: 'Dynamic kinetic word-by-word with emoji highlights',
      audio_mastering: 'Loudness normalized to -14 LUFS',
      b_roll_injected: 4,
      export_formats: ['MP4_H265_UHD']
    }
  },
  {
    id: 'node-dist',
    name: 'Omnichannel API Push',
    role: 'Auto-Post IG, YT Shorts, TikTok',
    type: 'distribution',
    icon: Share2,
    color: '#3B82F6',
    status: 'idle',
    latency: '180ms',
    payload: {
      platforms_targeted: ['Instagram Reels', 'YouTube Shorts', 'TikTok'],
      scheduling: 'Optimized for 6:30 PM IST peak window',
      first_comment_pinned: 'Link in bio for full agency blueprint 🚀',
      tags_generated: ['#AIAgent', '#ContentAutomation', '#CreatorEconomy']
    }
  },
  {
    id: 'node-telemetry',
    name: 'Supabase Event Log',
    role: 'Retention Telemetry & Telegram Alert',
    type: 'storage',
    icon: Database,
    color: '#10B981',
    status: 'idle',
    latency: '34ms',
    payload: {
      audit_id: 'pipeline_run_891f2c',
      telegram_dispatched: true,
      execution_status: '200 OK SUCCESS',
      total_pipeline_time: '1.84s',
      human_intervention_needed: false
    }
  }
];

export function WorkflowVisualizer() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [activeNodeId, setActiveNodeId] = useState<string>('node-ai');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(-1);

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (activeStep < nodes.length) {
      const timer = setTimeout(() => {
        setNodes(prev => prev.map((node, index) => {
          if (index < activeStep) return { ...node, status: 'completed' };
          if (index === activeStep) return { ...node, status: 'running' };
          return { ...node, status: 'idle' };
        }));
        setActiveNodeId(nodes[activeStep].id);
        setActiveStep(s => s + 1);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      // Completed all steps
      setNodes(prev => prev.map(n => ({ ...n, status: 'completed' })));
      const resetTimer = setTimeout(() => {
        setIsRunning(false);
        setActiveStep(-1);
      }, 2000);
      return () => clearTimeout(resetTimer);
    }
  }, [isRunning, activeStep, nodes]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary-300 mb-2">
            <Activity className="w-3.5 h-3.5 text-primary-400 animate-pulse" />
            LIVE AUTOMATION PIPELINE ARCHITECTURE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-white">
            How NovaMint Automates Creator Output
          </h3>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            Inspect our proprietary multi-agent n8n workflow. Click any node to inspect real data payloads or trigger an end-to-end execution simulation.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent text-white font-medium text-sm shadow-lg shadow-primary-900/30 hover:opacity-95 transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Simulating Execution ({activeStep + 1}/{nodes.length})...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              Run Pipeline Test
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline Nodes Flow (Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = node.id === activeNodeId;
            const isCurrentRun = node.status === 'running';
            const isFinished = node.status === 'completed';

            return (
              <div key={node.id} className="relative">
                <SpotlightCard
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-4 cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary-500/60 bg-[#0c0e17] ring-1 ring-primary-500/30 shadow-lg shadow-primary-950/40' 
                      : 'border-white/[0.07] bg-[#07080C]/80 hover:border-white/[0.15]'
                  } ${isCurrentRun ? 'ring-2 ring-accent animate-pulse' : ''}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shrink-0"
                        style={{ backgroundColor: `${node.color}15`, color: node.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-400">
                            STEP 0{index + 1}
                          </span>
                          <span className="text-neutral-600">•</span>
                          <span className="text-xs font-mono text-neutral-500">{node.latency}</span>
                        </div>
                        <h4 className="text-sm md:text-base font-semibold text-white tracking-tight">
                          {node.name}
                        </h4>
                        <p className="text-xs text-neutral-400 line-clamp-1">{node.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isCurrentRun && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent/20 text-accent border border-accent/30 animate-pulse">
                          PROCESSING
                        </span>
                      )}
                      {isFinished && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      {!isCurrentRun && !isFinished && (
                        <Clock className="w-4 h-4 text-neutral-600" />
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-primary-400 translate-x-0.5' : 'text-neutral-600'}`} />
                    </div>
                  </div>
                </SpotlightCard>

                {/* Connector line between steps */}
                {index < nodes.length - 1 && (
                  <div className="h-2 w-0.5 bg-gradient-to-b from-white/10 to-white/5 ml-9 my-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Live Payload Inspector (Col 5) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/[0.08] bg-[#050608] p-5 h-full flex flex-col font-mono">
            {/* Header bar of code editor */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-semibold text-neutral-300">
                  PAYLOAD_TELEMETRY.json
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            {/* Active Node Info */}
            <div className="mb-3 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="text-[11px] text-neutral-400">Target Node:</div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNode.color }} />
                {activeNode.name}
              </div>
            </div>

            {/* JSON Viewer */}
            <div className="flex-1 bg-black/40 rounded-xl p-4 overflow-x-auto text-[11px] leading-relaxed text-neutral-300 border border-white/[0.04] scrollbar-thin">
              <pre className="text-emerald-400">
                {JSON.stringify(activeNode.payload, null, 2)}
              </pre>
            </div>

            {/* Node metadata footer */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Latency: {activeNode.latency}
              </span>
              <span className="text-neutral-400 font-mono">Type: {activeNode.type.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
