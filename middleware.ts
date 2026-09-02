import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, isValidAdminToken } from '@/lib/admin-auth'

export async function middleware(request: NextRequest) {
  // Check if it's an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow login page without authentication
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for admin token
    const adminToken = request.cookies.get(COOKIE_NAME)?.value

    if (!(await isValidAdminToken(adminToken))) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
