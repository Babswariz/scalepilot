import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/flutterwave'
import { verifyPassword, setSessionCookie } from '@/lib/customer-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    // Constant-ish response: do not reveal whether the email exists.
    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    await setSessionCookie(user.id)
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error('Error signing in:', error)
    return NextResponse.json({ error: 'Failed to sign in.' }, { status: 500 })
  }
}
