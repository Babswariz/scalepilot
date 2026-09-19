import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getFlutterwaveKeys, prisma } from '@/lib/flutterwave'
import { computeSelectionAmount, getCapabilities } from '@/lib/service-catalog'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // --- Validate customer ---
    const fullName = String(body.fullName ?? '').trim()
    const email = String(body.email ?? '').trim()
    const businessName = String(body.businessName ?? '').trim()
    if (!fullName || !email || !businessName) {
      return NextResponse.json({ error: 'Your name, email and business name are required.' }, { status: 400 })
    }

    // --- Validate capability selection (server is authoritative) ---
    let capabilityIds: unknown = body.capabilities
    if (typeof capabilityIds === 'string') {
      try {
        capabilityIds = JSON.parse(capabilityIds)
      } catch {
        capabilityIds = []
      }
    }
    const selected = getCapabilities(capabilityIds)
    if (selected.length === 0) {
      return NextResponse.json({ error: 'Please select at least one valid capability.' }, { status: 400 })
    }

    const capabilitiesJson = JSON.stringify(selected.map((c) => c.id))
    const { amount, currency, payable } = computeSelectionAmount(selected.map((c) => c.id))

    // Persist the request first so it is never lost, regardless of payment.
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        fullName,
        email,
        businessName,
        websiteUrl: body.websiteUrl ? String(body.websiteUrl).trim() : null,
        businessStage: String(body.businessStage || 'just-starting'),
        capabilities: capabilitiesJson,
        projectContext: String(body.projectContext || '').trim(),
        status: payable ? 'payment-pending' : 'new',
      },
    })

    // --- No payable amount: undefined pricing -> support-led intake ---
    if (!payable || amount <= 0) {
      return NextResponse.json({ requestCreated: true, requestId: serviceRequest.id })
    }

    // --- Payable: require configured Flutterwave keys ---
    const { secretKey } = getFlutterwaveKeys()
    if (!secretKey) {
      // Keep the request; it just cannot be charged online right now.
      return NextResponse.json({ requestCreated: true, requestId: serviceRequest.id })
    }

    const transactionReference = `SP-${Date.now()}-${randomUUID()}`
    await prisma.payment.create({
      data: {
        transactionReference,
        customerName: fullName,
        customerEmail: email,
        selectedPlan: selected.map((c) => c.name).join(', '),
        amount,
        currency,
        serviceRequestId: serviceRequest.id,
      },
    })

    const flutterwaveResponse = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tx_ref: transactionReference,
        amount,
        currency,
        redirect_url: `${new URL(request.url).origin}/api/payments/callback`,
        customer: { name: fullName, email },
        customizations: { title: 'ScalePilot', description: `${selected.length} capability${selected.length > 1 ? 'ies' : ''}` },
      }),
    })
    const result = (await flutterwaveResponse.json()) as { status?: string; message?: string; data?: { link?: string } }

    if (!flutterwaveResponse.ok || result.status !== 'success' || !result.data?.link) {
      await prisma.payment.update({ where: { transactionReference }, data: { status: 'FAILED' } })
      await prisma.serviceRequest.update({ where: { id: serviceRequest.id }, data: { status: 'payment-failed' } })
      console.error('Flutterwave initialization failed:', result?.message)
      return NextResponse.json({ error: result.message || 'Unable to initialize payment.' }, { status: 502 })
    }

    return NextResponse.json({ checkoutUrl: result.data.link })
  } catch (error) {
    console.error('Error initializing payment:', error)
    return NextResponse.json({ error: 'Unable to submit your request. Please try again.' }, { status: 500 })
  }
}
