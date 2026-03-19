'use client';

import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// Button Component
// ============================================
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    isLoading?: boolean;
    asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', isLoading, disabled, children, ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

        const variants = {
            default:
                'bg-gradient-to-r from-nova-purple to-electric-blue text-white border-0 hover:opacity-90 shadow-md shadow-nova-purple/25 hover:shadow-lg hover:shadow-nova-purple/35 hover:-translate-y-0.5',
            primary:
                'bg-gradient-to-r from-nova-purple to-electric-blue text-white border-0 hover:opacity-90 shadow-md shadow-nova-purple/25 hover:shadow-lg hover:shadow-nova-purple/35 hover:-translate-y-0.5',
            secondary:
                'bg-card/80 border border-border/70 text-foreground hover:bg-card hover:border-nova-purple/40 hover:text-nova-purple backdrop-blur-sm',
            outline:
                'border border-border/70 bg-transparent hover:bg-white/5 hover:border-nova-purple/50 hover:text-nova-purple',
            ghost:
                'hover:bg-white/8 hover:text-foreground text-muted-foreground',
            link:
                'text-nova-purple underline-offset-4 hover:underline p-0 h-auto',
            destructive:
                'bg-destructive text-destructive-foreground hover:opacity-90',
        };

        const sizes = {
            default: 'h-10 px-5 py-2 text-sm',
            sm:      'h-8 rounded-lg px-3 text-xs',
            lg:      'h-12 rounded-xl px-8 text-base',
            icon:    'h-10 w-10',
        };

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';


// ============================================
// Input Component
// ============================================
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', label, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-semibold text-foreground mb-1.5 tracking-wide">
                        {label}
                    </label>
                )}
                <input
                    id={inputId}
                    type={type}
                    className={cn(
                        'flex h-11 w-full rounded-xl border border-border/70 bg-card/60 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nova-purple/50 focus-visible:border-nova-purple/60 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';


// ============================================
// Textarea Component
// ============================================
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, id, ...props }, ref) => {
        const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={textareaId} className="block text-sm font-semibold text-foreground mb-1.5 tracking-wide">
                        {label}
                    </label>
                )}
                <textarea
                    id={textareaId}
                    className={cn(
                        'flex min-h-[120px] w-full rounded-xl border border-border/70 bg-card/60 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nova-purple/50 focus-visible:border-nova-purple/60 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';


// ============================================
// Card Component
// ============================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = true, glass = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    glass ? 'glass' : 'card-premium',
                    'p-6 md:p-8',
                    hover && 'transition-all duration-400 hover:border-nova-purple/30 hover:shadow-lg hover:shadow-nova-purple/10 hover:-translate-y-1',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';


// ============================================
// Badge Component
// ============================================
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'premium';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const variants = {
            default:   'bg-white/8 text-muted-foreground border border-border/60',
            primary:   'bg-nova-purple/15 text-nova-purple border border-nova-purple/25',
            secondary: 'bg-electric-blue/15 text-electric-blue border border-electric-blue/25',
            outline:   'border border-border/70 bg-transparent text-foreground',
            success:   'bg-green-500/12 text-green-400 border border-green-500/20',
            warning:   'bg-amber-500/12 text-amber-400 border border-amber-500/20',
            premium:   'bg-gradient-to-r from-nova-purple to-electric-blue text-white border-0 shadow-sm shadow-nova-purple/25',
        };

        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide',
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = 'Badge';


// ============================================
// Section Heading Component
// ============================================
export interface SectionHeadingProps {
    badge?: string;
    label?: string;
    title: string;
    titleHighlight?: string;
    description?: string;
    className?: string;
    center?: boolean;
}

export function SectionHeading({
    badge,
    label,
    title,
    titleHighlight,
    description,
    className,
    center = true
}: SectionHeadingProps) {
    const badgeText = badge || label;

    return (
        <div className={cn(center && 'text-center', 'mb-12 md:mb-16', className)}>
            {badgeText && (
                <div className={cn('mb-4', center && 'flex justify-center')}>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-nova-purple/12 border border-nova-purple/25 text-nova-purple text-xs font-bold tracking-widest uppercase">
                        {badgeText}
                    </span>
                </div>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 heading-pro">
                {title}{' '}
                {titleHighlight && <span className="gradient-text">{titleHighlight}</span>}
            </h2>
            {description && (
                <p className={cn('text-muted-foreground text-lg md:text-xl leading-relaxed', center && 'max-w-2xl mx-auto')}>
                    {description}
                </p>
            )}
        </div>
    );
}


// ============================================
// Skeleton Component
// ============================================
export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn('animate-pulse rounded-xl bg-muted', className)} />
    );
}


// ============================================
// Price Component
// ============================================
export interface PriceProps {
    amount: number | string;
    originalAmount?: number | string;
    currency?: string;
    period?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Price({ amount, originalAmount, currency = '₹', period, size = 'md', className }: PriceProps) {
    const sizes = {
        sm: 'text-xl',
        md: 'text-3xl',
        lg: 'text-5xl md:text-6xl',
    };

    return (
        <div className={cn('text-foreground', className)}>
            {originalAmount && (
                <span className="text-muted-foreground line-through text-sm mr-2">
                    {currency}{typeof originalAmount === 'number' ? originalAmount.toLocaleString() : originalAmount}
                </span>
            )}
            <span className={cn('font-bold gradient-text', sizes[size])}>
                {currency}{typeof amount === 'number' ? amount.toLocaleString() : amount}
            </span>
            {period && (
                <span className="text-muted-foreground text-sm font-normal ml-1">/{period}</span>
            )}
        </div>
    );
}


// ============================================
// Motion Card Component
// ============================================
export interface MotionCardProps extends HTMLMotionProps<'div'> {
    index?: number;
}

export const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(
    ({ className, index = 0, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                    'card-premium p-6 md:p-8 transition-all duration-400 hover:border-nova-purple/30 hover:shadow-lg hover:shadow-nova-purple/10 hover:-translate-y-1',
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);
MotionCard.displayName = 'MotionCard';
