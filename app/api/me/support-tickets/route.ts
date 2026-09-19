import { NextResponse } from 'next/server'
import { prisma } from '@/lib/flutterwave'
import { getCurrentUser } from '@/lib/customer-auth'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tickets = await prisma.supportTicket.findMany({
    where: { OR: [{ userId: user.id }, { email: user.email }] },
    orderBy: { createdAt: 'desc' },
    include: { replies: { orderBy: { createdAt: 'asc' } } },
  })

  return NextResponse.json(
    tickets.map((t) => ({
      id: t.id,
      accessToken: t.accessToken,
      subject: t.subject,
      category: t.category,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      replyCount: t.replies.length,
      latestActivity: t.replies.length ? t.replies[t.replies.length - 1].createdAt : t.createdAt,
    }))
  )
}
