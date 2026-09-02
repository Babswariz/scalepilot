import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { COOKIE_NAME, isValidAdminToken } from '@/lib/admin-auth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    if (!(await isValidAdminToken(cookieStore.get(COOKIE_NAME)?.value))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    if (typeof body.ticketId !== 'string' || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'A valid ticket ID and message are required.' },
        { status: 400 }
      )
    }

    const ticket = await prisma.supportTicket.findUnique({ where: { id: body.ticketId } })
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 })
    }

    const reply = await prisma.supportReply.create({
      data: {
        ticketId: ticket.id,
        message: body.message.trim(),
        senderType: 'ADMIN',
        isRead: false,
      },
    })

    await prisma.supportTicket.update({
      where: { id: ticket.id },
      data: { status: 'in-progress' },
    })

    return NextResponse.json(reply, { status: 201 })
  } catch (error) {
    console.error('Error creating admin reply:', error)
    return NextResponse.json({ error: 'Failed to create reply.' }, { status: 500 })
  }
}
