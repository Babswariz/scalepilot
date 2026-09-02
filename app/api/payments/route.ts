import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME, isValidAdminToken } from '@/lib/admin-auth'
import { prisma } from '@/lib/flutterwave'

export async function GET() {
  const cookieStore = await cookies()
  if (!(await isValidAdminToken(cookieStore.get(COOKIE_NAME)?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payments = await prisma.payment.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(payments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}