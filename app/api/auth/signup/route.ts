import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/flutterwave'
import { hashPassword, setSessionCookie } from '@/lib/customer-auth'

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    const user = await prisma.user.create({
      data: { name, email, password: hashPassword(password), role: 'user' },
      select: { id: true, name: true, email: true },
    })

    // Attach any prior requests/tickets created with this email to the new account.
    await Promise.all([
      prisma.serviceRequest.updateMany({ where: { email, userId: null }, data: { userId: user.id } }),
      prisma.supportTicket.updateMany({ where: { email, userId: null }, data: { userId: user.id } }),
    ])

    await setSessionCookie(user.id)
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error('Error creating account:', error)
    return NextResponse.json({ error: 'Failed to create account.' }, { status: 500 })
  }
}
