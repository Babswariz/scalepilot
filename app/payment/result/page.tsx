import Link from 'next/link'

export default async function PaymentResultPage({ searchParams }: { searchParams: Promise<{ status?: string; requestId?: string }> }) {
  const params = await searchParams
  const status = params.status === 'successful' ? 'successful' : params.status === 'cancelled' ? 'cancelled' : 'failed'
  const content = {
    successful: { title: 'PAYMENT SUCCESSFUL.', message: 'Your payment was verified and your request has been received.', color: 'text-[#10B981]' },
    cancelled: { title: 'PAYMENT CANCELLED.', message: 'No payment was completed. You can return to Get Started and try again.', color: 'text-[#F97316]' },
    failed: { title: 'PAYMENT NOT COMPLETED.', message: 'We could not verify this payment. Please try again or contact support.', color: 'text-red-400' },
  }[status]

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#071A33] to-[#0B1220] px-4 py-32 text-white">
      <div className="mx-auto max-w-2xl rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-12 text-center">
        <h1 className={`text-3xl font-bold ${content.color}`}>{content.title}</h1>
        <p className="mt-4 text-[#94A3B8]">{content.message}</p>
        {params.requestId && <p className="mt-4 text-sm text-[#94A3B8]">Request ID: <strong className="text-white">{params.requestId}</strong></p>}
        <Link href="/" className="mt-8 inline-block rounded-lg bg-[#2563EB] px-6 py-3 font-bold text-white hover:bg-[#1d4ed8]">Return home</Link>
      </div>
    </main>
  )
}