import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { COOKIE_NAME, isValidAdminToken } from '@/lib/admin-auth'

const prisma = new PrismaClient()

const createAccessToken = async () => {
  let token = ''
  let existingTicket = true

  while (existingTicket) {
    token = crypto.randomUUID().replace(/-/g, '')
    const foundTicket = await prisma.supportTicket.findUnique({ where: { accessToken: token } })
    existingTicket = Boolean(foundTicket)
  }

  return token
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (
      typeof body.name !== 'string' ||
      typeof body.email !== 'string' ||
      typeof body.subject !== 'string' ||
      typeof body.message !== 'string' ||
      !body.name.trim() ||
      !body.email.trim() ||
      !body.subject.trim() ||
      !body.message.trim()
    ) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are required.' },
        { status: 400 }
      )
    }

    const accessToken = await createAccessToken()

    const supportTicket = await prisma.supportTicket.create({
      data: {
        accessToken,
        name: body.name.trim(),
        email: body.email.trim(),
        subject: body.subject.trim(),
        category: 'general-question',
        message: body.message.trim(),
        status: 'new',
      },
    })

    return NextResponse.json(
      {
        id: supportTicket.id,
        accessToken: supportTicket.accessToken,
        statusUrl: `/support/${supportTicket.accessToken}`,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating support ticket:', error)
    return NextResponse.json(
      { error: 'Failed to create support ticket' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    if (!(await isValidAdminToken(cookieStore.get(COOKIE_NAME)?.value))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    if (!(await isValidAdminToken(cookieStore.get(COOKIE_NAME)?.value))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validStatuses = ['new', 'in-progress', 'resolved']
    if (typeof body.id !== 'string' || !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: 'A valid ticket ID and status are required.' }, { status: 400 })
    }

    const ticket = await prisma.supportTicket.update({
      where: { id: body.id },
      data: { status: body.status },
    })

    return NextResponse.json(ticket)
  } catch (error) {
    console.error('Error updating support ticket:', error)
    return NextResponse.json({ error: 'Failed to update support ticket' }, { status: 500 })
  }
}
