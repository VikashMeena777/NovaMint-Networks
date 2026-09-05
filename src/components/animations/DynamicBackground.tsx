'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

// Deterministic particle generation so there is ZERO SSR/hydration mismatch
const PARTICLES: Particle[] = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  top: (i * 29 + 7) % 96,
  left: (i * 37 + 13) % 98,
  size: (i % 3 === 0 ? 2.5 : i % 2 === 0 ? 2 : 1.2),
  duration: 5 + (i % 6) * 1.5,
  delay: (i * 0.7) % 5,
  color: i % 3 === 0 ? 'bg-primary-400' : i % 2 === 0 ? 'bg-cyan-300' : 'bg-white',
}));

export function DynamicBackground({ className = '' }: { className?: string }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isPointerActive, setIsPointerActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isPointerActive) setIsPointerActive(true);
    };

    const handleMouseLeave = () => {
      setIsPointerActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPointerActive]);

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* 1. Deep Cosmic Velvet Base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 140% 90% at 50% -10%, #150f38 0%, #090a18 45%, #04050b 100%)',
        }}
      />

      {/* 2. Living Fluid Aurora Orbs (GPU Accelerated & Keyframe Animated) */}
      {/* Aurora Orb 1: Electric Violet Nebula (Top-Right) */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[720px] h-[720px] rounded-full animate-aurora-1 opacity-90"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.38) 0%, rgba(124, 58, 237, 0.16) 45%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Aurora Orb 2: Cyber Cyan & Emerald Flux (Bottom-Left) */}
      <div
        className="absolute -bottom-[10%] -left-[5%] w-[680px] h-[680px] rounded-full animate-aurora-2 opacity-85"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.30) 0%, rgba(16, 185, 129, 0.14) 45%, transparent 70%)',
          filter: 'blur(95px)',
        }}
      />

      {/* Aurora Orb 3: Hyper Indigo Pulse (Upper Midground / Center) */}
      <div
        className="absolute top-[28%] left-[20%] w-[620px] h-[620px] rounded-full animate-aurora-3 opacity-80"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.32) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Aurora Orb 4: Warm Sunset Magenta & Rose (Lower Right) */}
      <div
        className="absolute bottom-[20%] right-[10%] w-[540px] h-[540px] rounded-full animate-aurora-4 opacity-75"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.24) 0%, rgba(244, 63, 94, 0.09) 45%, transparent 70%)',
          filter: 'blur(85px)',
        }}
      />

      {/* 3. Interactive Cursor Spotlight Torch (Follows User Mouse) */}
      {isPointerActive && (
        <div
          className="fixed -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.20) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      )}

      {/* 4. High-Tech Cyber Perspective Grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.7) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 30%, transparent 95%)',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 30%, transparent 95%)',
        }}
      />

      {/* 5. Traveling Digital Horizon / Cyber Beam Sweep */}
      <div className="absolute inset-x-0 h-40 -top-40 bg-gradient-to-b from-transparent via-primary-500/12 to-transparent animate-cyber-beam pointer-events-none" />
      <div className="absolute inset-x-0 h-[1.5px] -top-1 bg-gradient-to-r from-transparent via-primary-400/40 to-transparent animate-cyber-beam pointer-events-none" />

      {/* 6. Floating Living Stardust / Cyber Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full animate-stardust ${p.color}`}
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              // Custom CSS variables for individual timing
              ['--duration' as any]: `${p.duration}s`,
              ['--delay' as any]: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 7. Subtle Film Grain / Micro-Texture (Prevents Gradient Banding) */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export default DynamicBackground;
