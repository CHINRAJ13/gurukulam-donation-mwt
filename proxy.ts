import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isPublicAdminPath = path === '/admin/login';
  const isAdminPath = path.startsWith('/admin');

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value || '';

  // If trying to access a protected route without a token
  if (!isPublicAdminPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
  }

  // If trying to access login page with a token
  if (isPublicAdminPath && token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};
