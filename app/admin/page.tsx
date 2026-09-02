'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BrandLogo from '@/components/BrandLogo'

type TicketStatus = 'new' | 'in-progress' | 'resolved'

type SupportReply = {
  id: string
  message: string
  senderType: 'CUSTOMER' | 'ADMIN'
  isRead: boolean
  createdAt: string
}

type SupportRequest = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
  replies: SupportReply[]
}

type Payment = {
  id: string
  customerName: string
  customerEmail: string
  selectedPlan: string
  amount: number
  currency: string
  status: string
  transactionReference: string
  createdAt: string
}

const statusLabels: Record<TicketStatus, string> = {
  new: 'New',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
}

const normalizeStatus = (status: string): TicketStatus => {
  if (status === 'in-progress' || status === 'resolved') return status
  return 'new'
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<'overview' | 'requests' | 'payments'>('overview')
  const [requests, setRequests] = useState<SupportRequest[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})
  const [replySendingId, setReplySendingId] = useState<string | null>(null)

  const loadRequests = async () => {
    setIsLoading(true)
    setLoadError('')
    try {
      const response = await fetch('/api/support-tickets', { cache: 'no-store' })
      if (response.status === 401) {
        router.replace('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Unable to load support requests.')
      setRequests(await response.json())
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Unable to load support requests.')
    } finally {
      setIsLoading(false)
    }
  }

  const loadPayments = async () => {
    try {
      const response = await fetch('/api/payments', { cache: 'no-store' })
      if (response.status === 401) {
        router.replace('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Unable to load payments.')
      setPayments(await response.json())
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Unable to load payments.')
    }
  }

  useEffect(() => {
    loadRequests()
    loadPayments()
  }, [])

  const updateStatus = async (id: string, status: TicketStatus) => {
    setUpdatingId(id)
    try {
      const response = await fetch('/api/support-tickets', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (response.status === 401) {
        router.replace('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Unable to update request status.')
      setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request))
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Unable to update request status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const sendReply = async (ticketId: string) => {
    const message = (replyDrafts[ticketId] || '').trim()
    if (!message) return

    setReplySendingId(ticketId)
    setLoadError('')

    try {
      const response = await fetch('/api/support-tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, message }),
      })

      if (response.status === 401) {
        router.replace('/admin/login')
        return
      }

      if (!response.ok) {
        throw new Error('Unable to send reply.')
      }

      setReplyDrafts((current) => ({ ...current, [ticketId]: '' }))
      await loadRequests()
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Unable to send reply.')
    } finally {
      setReplySendingId(null)
    }
  }

  const counts = {
    total: requests.length,
    new: requests.filter((request) => normalizeStatus(request.status) === 'new').length,
    inProgress: requests.filter((request) => normalizeStatus(request.status) === 'in-progress').length,
    resolved: requests.filter((request) => normalizeStatus(request.status) === 'resolved').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071A33] to-[#0B1220] text-white">
      <header className="sticky top-0 z-40 border-b border-[#3B82F6]/20 bg-[#0B1220]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <BrandLogo textClassName="text-lg font-bold tracking-[0.16em] text-white" iconClassName="h-9 w-9" />
          <button onClick={handleLogout} className="text-sm font-semibold text-[#94A3B8] transition-colors hover:text-white">LOG OUT</button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        <aside className="border-b border-[#3B82F6]/20 bg-[#0B1220]/30 p-4 md:min-h-[calc(100vh-73px)] md:w-64 md:border-b-0 md:border-r md:p-6">
          <nav className="flex gap-2 md:block md:space-y-2">
            {[
              { id: 'overview' as const, label: 'OVERVIEW' },
              { id: 'requests' as const, label: 'SUPPORT REQUESTS' },
              { id: 'payments' as const, label: 'PAYMENTS' },
            ].map((item) => (
              <button key={item.id} onClick={() => setActiveView(item.id)} className={`flex-1 rounded-lg px-4 py-3 text-left text-sm font-bold transition-colors md:w-full ${activeView === item.id ? 'bg-[#2563EB] text-white' : 'text-[#94A3B8] hover:bg-[#0B1220]/60 hover:text-white'}`}>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-5 md:p-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">SCALEPILOT ADMIN</p>
              <h1 className="text-3xl font-bold md:text-4xl">{activeView === 'overview' ? 'Dashboard Overview' : 'Support Requests'}</h1>
            </div>
            <button onClick={() => { loadRequests(); loadPayments() }} className="rounded-lg border border-[#3B82F6]/30 px-4 py-2 text-sm font-semibold text-[#CBD5E1] hover:border-[#3B82F6] hover:text-white">REFRESH</button>
          </div>

          {loadError && <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">{loadError}</div>}
          {isLoading ? <p className="py-12 text-center text-[#94A3B8]">Loading support requests...</p> : activeView === 'payments' ? (
            <div className="overflow-x-auto rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-b border-[#3B82F6]/20 text-xs uppercase tracking-wider text-[#94A3B8]">
                  <tr><th className="px-5 py-4">Customer</th><th className="px-5 py-4">Plan</th><th className="px-5 py-4">Amount</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Reference</th><th className="px-5 py-4">Date</th></tr>
                </thead>
                <tbody>{payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-[#3B82F6]/10 last:border-0">
                    <td className="px-5 py-4"><div className="font-semibold text-white">{payment.customerName}</div><div className="text-[#94A3B8]">{payment.customerEmail}</div></td>
                    <td className="px-5 py-4 text-[#CBD5E1]">{payment.selectedPlan}</td>
                    <td className="px-5 py-4 text-[#CBD5E1]">{payment.currency} {payment.amount.toLocaleString()}</td>
                    <td className="px-5 py-4"><span className={payment.status === 'SUCCESSFUL' ? 'text-[#10B981]' : payment.status === 'PENDING' ? 'text-[#F97316]' : 'text-red-400'}>{payment.status}</span></td>
                    <td className="px-5 py-4 font-mono text-xs text-[#94A3B8]">{payment.transactionReference}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-[#94A3B8]">{new Date(payment.createdAt).toLocaleString()}</td>
                  </tr>
                ))}</tbody>
              </table>
              {payments.length === 0 && <p className="p-10 text-center text-[#94A3B8]">No payments yet.</p>}
            </div>
          ) : activeView === 'overview' ? (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label: 'Total Support Requests', value: counts.total, color: '#3B82F6' },
                  { label: 'New Requests', value: counts.new, color: '#38BDF8' },
                  { label: 'In Progress', value: counts.inProgress, color: '#F97316' },
                  { label: 'Resolved', value: counts.resolved, color: '#10B981' },
                ].map((card) => (
                  <div key={card.label} className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-5">
                    <p className="mb-3 text-sm font-semibold text-[#94A3B8]">{card.label}</p>
                    <p className="text-4xl font-bold" style={{ color: card.color }}>{card.value}</p>
                  </div>
                ))}
              </div>
              <RequestList
                requests={requests.slice(0, 5)}
                updatingId={updatingId}
                onStatusChange={updateStatus}
                onReplyChange={(ticketId, value) => setReplyDrafts((current) => ({ ...current, [ticketId]: value }))}
                onReplySubmit={sendReply}
                replyDrafts={replyDrafts}
                replySendingId={replySendingId}
                emptyMessage="No support requests yet."
              />
            </div>
          ) : (
            <RequestList
              requests={requests}
              updatingId={updatingId}
              onStatusChange={updateStatus}
              onReplyChange={(ticketId, value) => setReplyDrafts((current) => ({ ...current, [ticketId]: value }))}
              onReplySubmit={sendReply}
              replyDrafts={replyDrafts}
              replySendingId={replySendingId}
              emptyMessage="No support requests yet."
            />
          )}
        </main>
      </div>
    </div>
  )
}

function RequestList({
  requests,
  updatingId,
  onStatusChange,
  onReplyChange,
  onReplySubmit,
  replyDrafts,
  replySendingId,
  emptyMessage,
}: {
  requests: SupportRequest[]
  updatingId: string | null
  onStatusChange: (id: string, status: TicketStatus) => void
  onReplyChange: (ticketId: string, value: string) => void
  onReplySubmit: (ticketId: string) => void
  replyDrafts: Record<string, string>
  replySendingId: string | null
  emptyMessage: string
}) {
  if (requests.length === 0) return <div className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-10 text-center text-[#94A3B8]">{emptyMessage}</div>

  return <div className="space-y-4">{requests.map((request) => {
    const status = normalizeStatus(request.status)
    const replies = request.replies || []

    return <article key={request.id} className="rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h2 className="break-words text-lg font-bold">{request.subject || 'Support request'}</h2>
          <p className="mt-1 text-sm text-[#94A3B8]">{request.name} · {request.email}</p>
        </div>
        <select value={status} disabled={updatingId === request.id} onChange={(event) => onStatusChange(request.id, event.target.value as TicketStatus)} className="rounded-lg border border-[#3B82F6]/30 bg-[#071A33] px-3 py-2 text-sm font-semibold text-white focus:border-[#3B82F6] focus:outline-none">
          {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      <div className="mt-5 rounded-lg border border-[#3B82F6]/20 bg-[#071A33]/80 p-4">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Conversation</p>

        <div className="space-y-3">
          <div className="rounded-lg border border-[#3B82F6]/20 bg-[#0F172A] p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">Customer · {new Date(request.createdAt).toLocaleString()}</p>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#CBD5E1]">{request.message}</p>
          </div>

          {replies.map((reply) => (
            <div key={reply.id} className={`rounded-lg border p-3 ${reply.senderType === 'ADMIN' ? 'border-[#3B82F6]/30 bg-[#0B1220]' : 'border-[#10B981]/30 bg-[#052E2B]'}`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                {reply.senderType === 'ADMIN' ? 'Admin reply' : 'Customer reply'} · {new Date(reply.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#CBD5E1]">{reply.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-[#3B82F6]/20 bg-[#0B1220]/60 p-3">
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#94A3B8]">Reply</label>
          <textarea
            value={replyDrafts[request.id] || ''}
            onChange={(event) => onReplyChange(request.id, event.target.value)}
            rows={4}
            placeholder="Write a reply to the customer..."
            className="w-full resize-none rounded-lg border border-[#3B82F6]/30 bg-[#071A33] px-3 py-2 text-sm text-white placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => onReplySubmit(request.id)}
              disabled={replySendingId === request.id || !((replyDrafts[request.id] || '').trim())}
              className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {replySendingId === request.id ? 'Sending...' : 'Send reply'}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#64748B]">Submitted {new Date(request.createdAt).toLocaleString()}</p>
    </article>
  })}</div>
}
