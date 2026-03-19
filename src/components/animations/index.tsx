'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// Re-export background components
export { AnimatedBackground, FloatingParticles, GradientOrb } from './AnimatedBackground';
export { DynamicBackground } from './DynamicBackground';

// Fade In Animation
export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Slide Up Animation
export function SlideUp({
    children,
    className,
    delay = 0,
    duration = 0.5,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Slide In From Left
export function SlideInLeft({
    children,
    className,
    delay = 0,
    duration = 0.5,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Slide In From Right
export function SlideInRight({
    children,
    className,
    delay = 0,
    duration = 0.5,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Scale In Animation
export function ScaleIn({
    children,
    className,
    delay = 0,
    duration = 0.3,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Stagger Children Container
export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Stagger Child Item
export function StaggerItem({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: 'easeOut' }
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Scroll Reveal Animation (viewport-based)
export function ScrollReveal({
    children,
    className,
    delay = 0,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Hover Scale Effect
export function HoverScale({
    children,
    className,
    scale = 1.05,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    scale?: number;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// 3D Card Tilt Effect
export function TiltCard({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
} & HTMLMotionProps<'div'>) {
    return (
        <motion.div
            whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }}
            className={cn('transform-gpu', className)}
            style={{ transformStyle: 'preserve-3d' }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Page Transition Wrapper
export function PageTransition({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Animated Counter
export function AnimatedCounter({
    value,
    className,
    duration = 2,
}: {
    value: number;
    className?: string;
    duration?: number;
}) {
    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {value.toLocaleString()}
            </motion.span>
        </motion.span>
    );
}

// Floating Element
export function FloatingElement({
    children,
    className,
    duration = 3,
    distance = 10,
}: {
    children: React.ReactNode;
    className?: string;
    duration?: number;
    distance?: number;
}) {
    return (
        <motion.div
            animate={{
                y: [-distance, distance, -distance],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Text Reveal (character by character)
export function TextReveal({
    text,
    className,
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) {
    const words = text.split(' ');

    return (
        <motion.span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: delay + i * 0.1,
                    }}
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}
