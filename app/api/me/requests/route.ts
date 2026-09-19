import { NextResponse } from 'next/server'
import { prisma } from '@/lib/flutterwave'
import { getSessionUserId } from '@/lib/customer-auth'

export async function GET() {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const requests = await prisma.serviceRequest.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  // Attach payment summary per request (linked via serviceRequestId).
  const payments = await prisma.payment.findMany({
    where: { serviceRequestId: { in: requests.map((r) => r.id) } },
  })
  const paymentByRequest = new Map(payments.map((p) => [p.serviceRequestId, p]))

  return NextResponse.json(
    requests.map((request) => {
      const payment = paymentByRequest.get(request.id)
      return {
        id: request.id,
        capabilities: request.capabilities,
        businessName: request.businessName,
        status: request.status,
        createdAt: request.createdAt,
        payment: payment
          ? { amount: payment.amount, currency: payment.currency, status: payment.status, reference: payment.transactionReference }
          : null,
      }
    })
  )
}
