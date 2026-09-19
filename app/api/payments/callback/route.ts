import { NextRequest, NextResponse } from 'next/server'
import { getFlutterwaveKeys, isValidFlutterwaveResponse, prisma } from '@/lib/flutterwave'

const resultUrl = (request: NextRequest, status: string, requestId?: string) => {
  const url = new URL('/payment/result', request.url)
  url.searchParams.set('status', status)
  if (requestId) url.searchParams.set('requestId', requestId)
  return url
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const transactionReference = params.get('tx_ref')
  const transactionId = params.get('transaction_id')
  const status = params.get('status')
  const payment = transactionReference ? await prisma.payment.findUnique({ where: { transactionReference } }) : null

  if (!payment || !transactionReference) return NextResponse.redirect(resultUrl(request, 'failed'))
  if (status === 'cancelled' || !transactionId) {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: 'CANCELLED' } })
    if (payment.serviceRequestId) await prisma.serviceRequest.update({ where: { id: payment.serviceRequestId }, data: { status: 'payment-cancelled' } })
    return NextResponse.redirect(resultUrl(request, 'cancelled'))
  }

  const { secretKey } = getFlutterwaveKeys()
  if (!secretKey) return NextResponse.redirect(resultUrl(request, 'failed'))

  try {
    const verificationResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`, { headers: { Authorization: `Bearer ${secretKey}` } })
    const verification = await verificationResponse.json()
    if (!verificationResponse.ok || !isValidFlutterwaveResponse(verification, transactionReference, payment.amount, payment.currency, payment.customerEmail)) {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED', flutterwaveTransactionId: transactionId } })
      if (payment.serviceRequestId) await prisma.serviceRequest.update({ where: { id: payment.serviceRequestId }, data: { status: 'payment-failed' } })
      return NextResponse.redirect(resultUrl(request, 'failed'))
    }

    await prisma.payment.update({ where: { id: payment.id }, data: { status: 'SUCCESSFUL', flutterwaveTransactionId: transactionId } })
    if (payment.serviceRequestId) await prisma.serviceRequest.update({ where: { id: payment.serviceRequestId }, data: { status: 'new' } })
    return NextResponse.redirect(resultUrl(request, 'successful', payment.serviceRequestId || undefined))
  } catch (error) {
    console.error('Error verifying Flutterwave payment:', error)
    await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED', flutterwaveTransactionId: transactionId } })
    if (payment.serviceRequestId) await prisma.serviceRequest.update({ where: { id: payment.serviceRequestId }, data: { status: 'payment-failed' } })
    return NextResponse.redirect(resultUrl(request, 'failed'))
  }
}
