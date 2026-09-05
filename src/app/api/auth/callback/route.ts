import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';
    const cleanNext = next.startsWith('/') ? next : `/${next}`;

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return NextResponse.redirect(`${origin}${cleanNext}`);
        } else {
            console.error('[Auth Callback] Code exchange error:', error);
            if (cleanNext.includes('reset-password')) {
                return NextResponse.redirect(
                    `${origin}/forgot-password?error=${encodeURIComponent(
                        'The password reset link is invalid or has expired. Please request a new link.'
                    )}`
                );
            }
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=Could not authenticate session`);
}
