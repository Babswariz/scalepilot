import { NextResponse } from 'next/server'
import { prisma } from '@/lib/flutterwave'
import { getCurrentUser } from '@/lib/customer-auth'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Payments belong to the customer via their service requests, plus any
  // payment recorded against their email address.
  const requests = await prisma.serviceRequest.findMany({ where: { userId: user.id }, select: { id: true } })
  const payments = await prisma.payment.findMany({
    where: {
      OR: [
        { serviceRequestId: { in: requests.map((r) => r.id) } },
        { customerEmail: user.email },
      ],
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(
    payments.map((p) => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      reference: p.transactionReference,
      plan: p.selectedPlan,
      createdAt: p.createdAt,
    }))
  )
}
