// Middleware to protect admin routes
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

// Routes that don't require authentication
const publicRoutes = ['/admin/login'];

// Routes that require authentication
const protectedRoutes = ['/admin'];

export function proxy(request: NextRequest) {
  console.log('--- PROXY START ---');
  const { pathname } = request.nextUrl;
  console.log('Proxy running for:', pathname);
  
  // Check if this is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  
  if (!isAdminRoute) {
    return NextResponse.next();
  }
  
  // Check if this is a public admin route (login page)
  const isPublicRoute = publicRoutes.some(route => pathname === route);
  
  // Get token from cookie
  const token = request.cookies.get('auth_token')?.value;
  console.log('Token found in cookie:', !!token);
  
  // Verify token
  const isValidToken = token ? verifyToken(token) : null;
  console.log('Is token valid:', !!isValidToken);
  
  // If trying to access protected route without valid token
  if (!isPublicRoute && !isValidToken) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If trying to access login page with valid token, redirect to dashboard
  if (isPublicRoute && isValidToken) {
    const dashboardUrl = new URL('/admin', request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
