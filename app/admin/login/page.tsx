'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BrandLogo from '@/components/BrandLogo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/admin')
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071A33] to-[#0B1220] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <BrandLogo
              className="flex-col"
              textClassName="text-2xl font-bold tracking-[0.18em] text-white"
              iconClassName="h-16 w-16"
            />
          </div>
          <p className="text-[#94A3B8] mt-2">Admin Login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-12 p-6 bg-[#2563EB]/10 border border-[#3B82F6]/30 rounded-lg">
          <p className="text-xs text-[#94A3B8]">
            <strong>For local development:</strong> The admin password is set in the .env.local file (default: "admin123"). Change this in production.
          </p>
        </div>
      </div>
    </div>
  )
}
