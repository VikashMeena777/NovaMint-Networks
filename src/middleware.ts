import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/checkout'];

// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
    const { supabaseResponse, user } = await updateSession(request);
    const pathname = request.nextUrl.pathname;

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if route is auth route
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth routes while logged in
    if (isAuthRoute && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         * - api routes (handled separately)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
