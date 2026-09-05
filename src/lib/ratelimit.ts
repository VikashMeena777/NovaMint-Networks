import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// In-memory sliding window fallback for local development or when Redis env vars are missing
interface MemoryEntry {
    count: number;
    resetTime: number;
}
const memoryStore = new Map<string, MemoryEntry>();

let upstashRatelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
        const redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
        upstashRatelimit = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(10, '60 s'),
            analytics: true,
            prefix: 'novamint:ratelimit',
        });
    } catch (e) {
        console.warn('Failed to initialize Upstash Redis ratelimit, using memory fallback:', e);
    }
}

export interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

/**
 * Check rate limit for a given identifier (IP or User ID)
 * @param identifier IP or user id
 * @param limit Max requests allowed in the window (default 10)
 * @param windowSeconds Window duration in seconds (default 60)
 */
export async function checkRateLimit(
    identifier: string,
    limit: number = 10,
    windowSeconds: number = 60
): Promise<RateLimitResult> {
    const key = `${identifier}:${limit}:${windowSeconds}`;

    // 1. If Upstash is configured, use Upstash
    if (upstashRatelimit) {
        try {
            const res = await upstashRatelimit.limit(identifier);
            return {
                success: res.success,
                limit: res.limit,
                remaining: res.remaining,
                reset: res.reset,
            };
        } catch (err) {
            console.error('Upstash rate limit check failed, falling back to memory:', err);
        }
    }

    // 2. In-memory sliding window fallback
    const now = Date.now();
    const entry = memoryStore.get(key);

    if (!entry || now > entry.resetTime) {
        const resetTime = now + windowSeconds * 1000;
        memoryStore.set(key, { count: 1, resetTime });
        return {
            success: true,
            limit,
            remaining: limit - 1,
            reset: resetTime,
        };
    }

    if (entry.count < limit) {
        entry.count += 1;
        return {
            success: true,
            limit,
            remaining: limit - entry.count,
            reset: entry.resetTime,
        };
    }

    return {
        success: false,
        limit,
        remaining: 0,
        reset: entry.resetTime,
    };
}
