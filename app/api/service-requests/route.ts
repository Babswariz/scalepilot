import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/flutterwave'
import { COOKIE_NAME, isValidAdminToken } from '@/lib/admin-auth'
import { getSessionUserId } from '@/lib/customer-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userId = await getSessionUserId()

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        businessName: body.businessName,
        websiteUrl: body.websiteUrl || null,
        businessStage: body.businessStage,
        capabilities: body.capabilities,
        projectContext: body.projectContext,
        status: 'new',
        userId: userId || undefined,
      },
    })

    return NextResponse.json({ id: serviceRequest.id }, { status: 201 })
  } catch (error) {
    console.error('Error creating service request:', error)
    return NextResponse.json(
      { error: 'Failed to create service request' },
      { status: 500 }
    )
  }
}

// Admin-only listing. Customer-scoped listing lives at /api/me/requests.
export async function GET() {
  try {
    const cookieStore = await cookies()
    if (!(await isValidAdminToken(cookieStore.get(COOKIE_NAME)?.value))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}
