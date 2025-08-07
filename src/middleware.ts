import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const headers = response.headers;

  headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.firebaseapp.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "connect-src 'self' *.firebaseio.com *.googleapis.com; " +
    "frame-src 'self' *.firebaseapp.com; " +
    "object-src 'none';"
  );

  headers.set('X-Frame-Options', 'DENY');

  headers.set('X-XSS-Protection', '1; mode=block');

  headers.set('X-Content-Type-Options', 'nosniff');

  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  return response;
}

export const config = {
  matcher: [
    
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
};
