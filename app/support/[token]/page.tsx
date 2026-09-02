'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'

type SupportReply = {
  id: string
  message: string
  senderType: 'CUSTOMER' | 'ADMIN'
  isRead: boolean
  createdAt: string
}

type SupportTicket = {
  id: string
  accessToken: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
  replies: SupportReply[]
  unreadAdminReplyCount: number
}

export default function SupportTicketStatusPage() {
  const params = useParams<{ token: string }>()
  const token = params?.token ?? ''
  const [language, setLanguage] = useState<Language>('en')
  const [ticket, setTicket] = useState<SupportTicket | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [isSendingReply, setIsSendingReply] = useState(false)

  const loadTicket = async () => {
    if (!token) return

    try {
      const response = await fetch(`/api/support-tickets/${token}`, { cache: 'no-store' })
      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: 'Ticket not found.' }))
        setErrorMessage(payload.error || 'Ticket not found.')
        setTicket(null)
        return
      }

      const data = await response.json()
      setTicket(data)
      setErrorMessage('')
    } catch (error) {
      console.error('Error loading support ticket:', error)
      setErrorMessage('Unable to load your ticket right now.')
    } finally {
      setIsLoading(false)
    }
  }

  const markTicketAsRead = async () => {
    if (!token || !ticket || ticket.unreadAdminReplyCount === 0) return

    try {
      await fetch(`/api/support-tickets/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark-read' }),
      })
      await loadTicket()
    } catch (error) {
      console.error('Error marking ticket as read:', error)
    }
  }

  useEffect(() => {
    setLanguage(getClientLanguage())
  }, [])

  useEffect(() => {
    if (!token) return
    loadTicket()

    const intervalId = window.setInterval(() => {
      loadTicket()
    }, 20000)

    return () => window.clearInterval(intervalId)
  }, [token])

  useEffect(() => {
    if (ticket && ticket.unreadAdminReplyCount > 0) {
      const timer = window.setTimeout(() => {
        markTicketAsRead()
      }, 1000)

      return () => window.clearTimeout(timer)
    }
  }, [ticket?.id, ticket?.unreadAdminReplyCount])

  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!token || !replyMessage.trim()) return

    setIsSendingReply(true)

    try {
      const response = await fetch(`/api/support-tickets/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyMessage.trim() }),
      })

      if (!response.ok) {
        throw new Error('Unable to send your reply.')
      }

      setReplyMessage('')
      await loadTicket()
    } catch (error) {
      console.error('Error sending reply:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send your reply.')
    } finally {
      setIsSendingReply(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071A33] to-[#0B1220] text-white">
      <Navigation />

      <section className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Support status</p>
            <h1 className="text-4xl font-bold md:text-5xl">{getTranslation('support.title', language)}</h1>
          </div>

          {errorMessage ? (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-6 text-red-100">
              {errorMessage}
            </div>
          ) : isLoading ? (
            <div className="rounded-lg border border-[#3B82F6]/20 bg-[#0B1220]/40 p-10 text-center text-[#94A3B8]">
              Loading your support ticket...
            </div>
          ) : ticket ? (
            <div className="space-y-6">
              {ticket.unreadAdminReplyCount > 0 && (
                <div className="rounded-lg border border-[#10B981]/40 bg-[#10B981]/10 p-4 text-[#D1FAE5]">
                  <p className="text-sm font-bold uppercase tracking-[0.14em]">New reply</p>
                  <p className="mt-1 text-sm">You have {ticket.unreadAdminReplyCount} new admin reply{ticket.unreadAdminReplyCount > 1 ? 'ies' : 'y'}.</p>
                </div>
              )}

              <div className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Ticket</p>
                    <h2 className="mt-2 text-2xl font-bold">{ticket.subject}</h2>
                  </div>
                  <span className="rounded-full border border-[#3B82F6]/30 bg-[#0F172A] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#CBD5E1]">
                    {ticket.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-[#3B82F6]/20 bg-[#071A33] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#94A3B8]">Reference</p>
                    <p className="mt-2 break-all text-sm text-[#E2E8F0]">{ticket.accessToken}</p>
                  </div>
                  <div className="rounded-lg border border-[#3B82F6]/20 bg-[#071A33] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#94A3B8]">Created</p>
                    <p className="mt-2 text-sm text-[#E2E8F0]">{new Date(ticket.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Original message</p>
                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#CBD5E1]">{ticket.message}</p>
                </div>

                <div className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-6">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Ticket details</p>
                  <ul className="space-y-3 text-sm text-[#CBD5E1]">
                    <li><span className="text-[#94A3B8]">Name:</span> {ticket.name}</li>
                    <li><span className="text-[#94A3B8]">Email:</span> {ticket.email}</li>
                    <li><span className="text-[#94A3B8]">Status:</span> {ticket.status}</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-6">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Conversation</p>

                <div className="space-y-4">
                  {ticket.replies.length === 0 ? (
                    <p className="text-sm text-[#94A3B8]">No replies yet.</p>
                  ) : (
                    ticket.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`rounded-lg border p-4 ${reply.senderType === 'ADMIN' ? 'border-[#3B82F6]/30 bg-[#0F172A]' : 'border-[#10B981]/30 bg-[#052E2B]'}`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                            {reply.senderType === 'ADMIN' ? 'ScalePilot team' : 'You'}
                          </p>
                          {reply.senderType === 'ADMIN' && !reply.isRead && (
                            <span className="rounded-full bg-[#10B981]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D1FAE5]">
                              New
                            </span>
                          )}
                        </div>
                        <p className="mb-2 text-xs text-[#94A3B8]">{new Date(reply.createdAt).toLocaleString()}</p>
                        <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#E2E8F0]">{reply.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <form onSubmit={handleReplySubmit} className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-6">
                <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Reply to support</label>
                <textarea
                  value={replyMessage}
                  onChange={(event) => setReplyMessage(event.target.value)}
                  rows={5}
                  placeholder="Type your message..."
                  className="w-full resize-none rounded-lg border border-[#3B82F6]/30 bg-[#071A33] px-4 py-3 text-white placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSendingReply || !replyMessage.trim()}
                    className="rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSendingReply ? 'Sending...' : 'Send reply'}
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  )
}
