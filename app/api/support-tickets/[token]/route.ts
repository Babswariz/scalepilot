import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 })
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { accessToken: token },
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 })
    }

    const unreadAdminReplyCount = ticket.replies.filter(
      (reply) => reply.senderType === 'ADMIN' && !reply.isRead
    ).length

    return NextResponse.json({
      ...ticket,
      unreadAdminReplyCount,
    })
  } catch (error) {
    console.error('Error fetching ticket:', error)
    return NextResponse.json({ error: 'Failed to fetch ticket.' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const body = await request.json()

    const ticket = await prisma.supportTicket.findUnique({
      where: { accessToken: token },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 })
    }

    if (body?.action === 'mark-read') {
      await prisma.supportReply.updateMany({
        where: {
          ticketId: ticket.id,
          senderType: 'ADMIN',
          isRead: false,
        },
        data: { isRead: true },
      })

      return NextResponse.json({ success: true })
    }

    if (typeof body?.message !== 'string' || !body.message.trim()) {
      return NextResponse.json(
        { error: 'A valid message is required.' },
        { status: 400 }
      )
    }

    const reply = await prisma.supportReply.create({
      data: {
        ticketId: ticket.id,
        message: body.message.trim(),
        senderType: 'CUSTOMER',
        isRead: true,
      },
    })

    await prisma.supportTicket.update({
      where: { id: ticket.id },
      data: { status: 'in-progress' },
    })

    return NextResponse.json(reply, { status: 201 })
  } catch (error) {
    console.error('Error updating ticket:', error)
    return NextResponse.json({ error: 'Failed to update ticket.' }, { status: 500 })
  }
}
