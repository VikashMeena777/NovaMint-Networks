'use client';

import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
    variant?: 'default' | 'hero' | 'subtle' | 'colorful';
    className?: string;
}

export function AnimatedBackground({ variant = 'default', className = '' }: AnimatedBackgroundProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Base Background with Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

            {/* Circuit Pattern Overlay - visible on all variants */}
            <div className="absolute inset-0 bg-circuit-pattern opacity-60" />

            {/* Stars/Sparkle Overlay */}
            <div className="absolute inset-0 bg-stars" />

            {variant === 'subtle' && (
                <>
                    {/* Floating Orbs - larger and more visible */}
                    <motion.div
                        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-nova-purple/15 blur-[150px]"
                        animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-electric-blue/12 blur-[130px]"
                        animate={{ x: [0, 25, 0], y: [0, -25, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-mint-green/8 blur-[120px]"
                        animate={{ x: [-20, 20, -20], y: [15, -15, 15] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating Geometric Shapes */}
                    <motion.div
                        className="absolute top-[15%] right-[20%] w-16 h-16 border border-nova-purple/20 rounded-lg rotate-45"
                        animate={{ rotate: [45, 135, 225, 315, 405], y: [-5, 10, -5] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-[25%] left-[15%] w-12 h-12 border border-electric-blue/15 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-[60%] right-[10%] w-8 h-8 bg-mint-green/10 rotate-45"
                        animate={{ rotate: [45, 225, 405], scale: [0.8, 1.1, 0.8] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute top-[40%] left-[8%] w-20 h-20 border border-hot-pink/10 rounded-full"
                        animate={{ scale: [1, 1.15, 1], y: [0, -10, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Floating Dots */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={`dot-${i}`}
                            className="absolute w-2 h-2 rounded-full bg-nova-purple/30"
                            style={{
                                top: `${15 + (i * 10)}%`,
                                left: `${10 + (i * 11)}%`,
                            }}
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 4 + (i * 0.5),
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </>
            )}

            {variant === 'default' && (
                <>
                    <motion.div
                        className="absolute top-20 left-[10%] w-[400px] h-[400px] rounded-full bg-nova-purple/20 blur-[120px]"
                        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-[10%] w-[500px] h-[500px] rounded-full bg-mint-green/20 blur-[120px]"
                        animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-hot-pink/10 blur-[150px]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Geometric shapes */}
                    <motion.div
                        className="absolute top-[20%] right-[15%] w-20 h-20 border-2 border-nova-purple/15 rounded-lg"
                        animate={{ rotate: [0, 90, 180, 270, 360] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-[30%] left-[12%] w-16 h-16 border-2 border-electric-blue/10 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                </>
            )}

            {variant === 'hero' && (
                <>
                    <motion.div
                        className="absolute top-10 left-[5%] w-[450px] h-[450px] rounded-full bg-nova-purple/25 blur-[120px]"
                        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-40 right-[5%] w-[500px] h-[500px] rounded-full bg-electric-blue/20 blur-[130px]"
                        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-10 left-[20%] w-[500px] h-[500px] rounded-full bg-mint-green/15 blur-[140px]"
                        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-40 right-[15%] w-[350px] h-[350px] rounded-full bg-hot-pink/15 blur-[100px]"
                        animate={{ y: [-20, 40, -20] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Geometric shapes */}
                    <motion.div
                        className="absolute top-[15%] right-[20%] w-40 h-40 border-2 border-white/10 rounded-full"
                        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-[20%] left-[10%] w-24 h-24 border-2 border-white/5 rounded-lg"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Floating small elements */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`hero-dot-${i}`}
                            className="absolute w-3 h-3 rounded-full bg-white/20"
                            style={{
                                top: `${20 + (i * 12)}%`,
                                left: `${15 + (i * 13)}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </>
            )}

            {variant === 'colorful' && (
                <>
                    <motion.div
                        className="absolute top-10 left-[10%] w-[350px] h-[350px] rounded-full bg-nova-purple/30 blur-[100px]"
                        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-electric-blue/30 blur-[110px]"
                        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-10 left-[30%] w-[450px] h-[450px] rounded-full bg-mint-green/25 blur-[120px]"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-[10%] w-[300px] h-[300px] rounded-full bg-hot-pink/25 blur-[90px]"
                        animate={{ y: [-10, 30, -10], x: [0, 20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-[5%] w-[250px] h-[250px] rounded-full bg-gold/20 blur-[80px]"
                        animate={{ scale: [0.9, 1.1, 0.9], y: [0, -20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Colorful geometric shapes */}
                    <motion.div
                        className="absolute top-[25%] left-[25%] w-32 h-32 border-2 border-nova-purple/20 rounded-full"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-[30%] right-[25%] w-20 h-20 border-2 border-electric-blue/15 rounded-lg"
                        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                </>
            )}

            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(124, 58, 237, 0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(124, 58, 237, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
        </div>
    );
}

// Floating Particles Component
export function FloatingParticles({ count = 20 }: { count?: number }) {
    const particles = Array.from({ length: count }, (_, i) => ({
        top: (i * 17 + 10) % 100,
        left: (i * 23 + 5) % 100,
        delay: (i * 0.3) % 4,
        duration: 4 + (i % 4),
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                        top: `${particle.top}%`,
                        left: `${particle.left}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

// Gradient Orb Component for individual use
export function GradientOrb({
    color = 'bg-nova-purple/20',
    size = 'w-64 h-64',
    blur = 'blur-[100px]',
    className = ''
}: {
    color?: string;
    size?: string;
    blur?: string;
    className?: string;
}) {
    return (
        <motion.div
            className={`absolute rounded-full ${color} ${size} ${blur} ${className}`}
            animate={{
                x: [0, 30, 0, -30, 0],
                y: [0, -20, 0, 20, 0],
                scale: [1, 1.1, 1, 0.9, 1],
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}
