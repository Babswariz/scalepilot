'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import BrandLogo from '@/components/BrandLogo'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to sign in.')
      router.replace(redirectTo)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in.')
      setSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#071A33] to-[#0B1220] px-4 py-16 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="ScalePilot home">
            <BrandLogo textClassName="text-base font-semibold tracking-[0.2em] text-white" iconClassName="h-10 w-10" />
          </Link>
        </div>

        <div className="rounded-2xl border border-[#3B82F6]/25 bg-[#0B1220]/60 p-7 shadow-[0_24px_60px_rgba(7,26,51,0.55)] sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Welcome back</p>
          <h1 className="mt-2 text-2xl font-bold">Sign in to ScalePilot</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Access your workspace, requests and support.</p>

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
                className="w-full rounded-lg border border-[#3B82F6]/25 bg-[#071A33] px-3 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
                className="w-full rounded-lg border border-[#3B82F6]/25 bg-[#071A33] px-3 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none" />
            </label>

            <button type="submit" disabled={submitting}
              className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-4 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#94A3B8]">
            New to ScalePilot?{' '}
            <Link href={`/signup${redirectTo !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="font-semibold text-[#3B82F6] hover:text-white">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
