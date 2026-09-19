import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/flutterwave'
import { getSessionUserId } from '@/lib/customer-auth'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getSessionUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const request = await prisma.serviceRequest.findUnique({ where: { id } })

  // Ownership check: never expose another customer's request.
  if (!request || request.userId !== userId) {
    return NextResponse.json({ error: 'Request not found.' }, { status: 404 })
  }

  const payment = await prisma.payment.findFirst({ where: { serviceRequestId: request.id } })

  return NextResponse.json({
    id: request.id,
    fullName: request.fullName,
    email: request.email,
    businessName: request.businessName,
    websiteUrl: request.websiteUrl,
    businessStage: request.businessStage,
    capabilities: request.capabilities,
    projectContext: request.projectContext,
    status: request.status,
    createdAt: request.createdAt,
    payment: payment
      ? { amount: payment.amount, currency: payment.currency, status: payment.status, reference: payment.transactionReference, createdAt: payment.createdAt }
      : null,
  })
}
