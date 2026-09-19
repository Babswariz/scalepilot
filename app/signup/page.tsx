'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import BrandLogo from '@/components/BrandLogo'

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create account.')
      router.replace(redirectTo)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account.')
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3B82F6]">Create your account</p>
          <h1 className="mt-2 text-2xl font-bold">Start with ScalePilot</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Create a workspace to track your requests, payments and support.</p>

          {error && (
            <div className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="Full name">
              <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name"
                className="w-full rounded-lg border border-[#3B82F6]/25 bg-[#071A33] px-3 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none" />
            </Field>
            <Field label="Email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
                className="w-full rounded-lg border border-[#3B82F6]/25 bg-[#071A33] px-3 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none" />
            </Field>
            <Field label="Password" hint="At least 8 characters">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password"
                className="w-full rounded-lg border border-[#3B82F6]/25 bg-[#071A33] px-3 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#3B82F6] focus:outline-none" />
            </Field>

            <button type="submit" disabled={submitting}
              className="w-full rounded-lg bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-4 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#94A3B8]">
            Already have an account?{' '}
            <Link href={`/signin${redirectTo !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`} className="font-semibold text-[#3B82F6] hover:text-white">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
        {label}
        {hint && <span className="font-normal normal-case tracking-normal text-[#64748B]">{hint}</span>}
      </span>
      {children}
    </label>
  )
}
