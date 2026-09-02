import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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

export async function GET() {
  try {
    const requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
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
