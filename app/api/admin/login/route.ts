import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME, createAdminToken, TOKEN_MAX_AGE_SECONDS } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (adminPassword && typeof body.password === 'string' && body.password === adminPassword) {
      const cookieStore = await cookies()
      cookieStore.set(COOKIE_NAME, await createAdminToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: TOKEN_MAX_AGE_SECONDS,
        path: '/',
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
