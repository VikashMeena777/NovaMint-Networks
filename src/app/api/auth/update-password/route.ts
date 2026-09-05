import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        const { password } = body;

        if (!password || typeof password !== 'string' || password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters in length.' },
                { status: 400 }
            );
        }

        // 1. Try to get authenticated user from SSR session cookies
        const supabase = await createClient();
        let { data: { user }, error: userError } = await supabase.auth.getUser();

        // 2. If no cookie session, check Authorization Bearer header (client access_token)
        if (!user) {
            const authHeader = request.headers.get('Authorization') || request.headers.get('authorization');
            if (authHeader?.startsWith('Bearer ')) {
                const token = authHeader.substring(7);
                const admin = createAdminClient();
                const { data: tokenData, error: tokenError } = await admin.auth.getUser(token);
                if (!tokenError && tokenData?.user) {
                    user = tokenData.user;
                }
            }
        }

        if (!user) {
            return NextResponse.json(
                {
                    error: 'No active recovery session found. Please click the password reset link from your email again to establish a valid security session.',
                },
                { status: 401 }
            );
        }

        // 3. Attempt to update password via user session
        let passwordUpdated = false;
        try {
            const { error: sessionUpdateError } = await supabase.auth.updateUser({
                password,
            });
            if (!sessionUpdateError) {
                passwordUpdated = true;
            }
        } catch {
            // Fall through to admin API
        }

        // 4. If user session update was blocked (e.g. Google OAuth primary identity),
        // use Supabase Service Role Admin API to guarantee password update
        if (!passwordUpdated) {
            const admin = createAdminClient();
            const { error: adminError } = await admin.auth.admin.updateUserById(user.id, {
                password,
                email_confirm: true,
            });

            if (adminError) {
                console.error('[Update Password] Admin update error:', adminError);
                return NextResponse.json(
                    { error: adminError.message || 'Failed to update credentials via security service.' },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Password updated successfully. You can now sign in using your email and password.',
        });
    } catch (err: any) {
        console.error('[Update Password] Unexpected error:', err);
        return NextResponse.json(
            { error: err.message || 'An unexpected error occurred while updating your password.' },
            { status: 500 }
        );
    }
}
