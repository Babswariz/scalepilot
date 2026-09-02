import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getFlutterwaveKeys, getPaymentPlan, PAYMENT_CURRENCY, prisma } from '@/lib/flutterwave'

export async function POST(request: NextRequest) {
  try {
    const { publicKey, secretKey } = getFlutterwaveKeys()
    if (!publicKey || !secretKey) return NextResponse.json({ error: 'Payment service is not configured.' }, { status: 503 })

    const body = await request.json()
    const plan = getPaymentPlan(body.planId)
    if (!plan || plan.free || typeof body.fullName !== 'string' || typeof body.email !== 'string' || !body.fullName.trim() || !body.email.trim()) {
      return NextResponse.json({ error: 'A valid customer and plan are required.' }, { status: 400 })
    }

    const transactionReference = `SP-${Date.now()}-${randomUUID()}`
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        fullName: body.fullName.trim(),
        email: body.email.trim(),
        businessName: String(body.businessName || '').trim(),
        websiteUrl: body.websiteUrl ? String(body.websiteUrl).trim() : null,
        businessStage: String(body.businessStage || 'just-starting'),
        capabilities: typeof body.capabilities === 'string' ? body.capabilities : JSON.stringify([]),
        projectContext: String(body.projectContext || '').trim(),
        status: 'payment-pending',
      },
    })

    await prisma.payment.create({
      data: {
        transactionReference,
        customerName: body.fullName.trim(),
        customerEmail: body.email.trim(),
        selectedPlan: plan.name,
        amount: plan.amount,
        currency: PAYMENT_CURRENCY,
        serviceRequestId: serviceRequest.id,
      },
    })

    const flutterwaveResponse = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tx_ref: transactionReference,
        amount: plan.amount,
        currency: PAYMENT_CURRENCY,
        redirect_url: `${new URL(request.url).origin}/api/payments/callback`,
        customer: { name: body.fullName.trim(), email: body.email.trim() },
        customizations: { title: 'ScalePilot', description: plan.name },
      }),
    })
    const result = await flutterwaveResponse.json() as { status?: string; message?: string; data?: { link?: string } }

    if (!flutterwaveResponse.ok || result.status !== 'success' || !result.data?.link) {
      await prisma.payment.update({ where: { transactionReference }, data: { status: 'FAILED' } })
      await prisma.serviceRequest.update({ where: { id: serviceRequest.id }, data: { status: 'payment-failed' } })
      return NextResponse.json({ error: result.message || 'Unable to initialize payment.' }, { status: 502 })
    }

    return NextResponse.json({ checkoutUrl: result.data.link })
  } catch (error) {
    console.error('Error initializing Flutterwave payment:', error)
    return NextResponse.json({ error: 'Unable to initialize payment.' }, { status: 500 })
  }
}