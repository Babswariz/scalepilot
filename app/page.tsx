'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTranslation, Language } from '@/lib/translations'
import { setClientLanguage } from '@/lib/client-language'

export default function Home() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('scalepilot-language') as Language | null
    if (saved) {
      setClientLanguage(saved)
      router.replace('/platform')
      return
    }
  }, [router])

  const handleContinue = () => {
    setClientLanguage(selectedLanguage)
    router.push('/platform')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_28%),linear-gradient(180deg,#06111d_0%,#071a33_38%,#0b1220_100%)] px-4 py-10">
      <div className="glass-panel w-full max-w-xl rounded-[32px] border border-slate-800/80 p-6 sm:p-10">
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5ba8ff] to-[#2563eb] text-xl font-black text-white shadow-[0_0_30px_rgba(37,99,235,0.35)]">
            S
          </div>
        </div>

        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">
          {getTranslation('welcome.select-language', selectedLanguage)}
        </p>
        <h1 className="mb-4 text-center text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          {getTranslation('welcome.title', selectedLanguage)}
        </h1>
        <p className="mb-8 text-center text-sm leading-7 text-slate-400 sm:text-base">
          {getTranslation('welcome.description', selectedLanguage)}
        </p>

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          {(['en', 'nl'] as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${
                selectedLanguage === lang
                  ? 'border-blue-400 bg-blue-500/15 text-white shadow-[0_0_24px_rgba(59,130,246,0.2)]'
                  : 'border-slate-700 bg-slate-900/40 text-slate-300 hover:border-slate-500 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'English' : 'Nederlands'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="soft-button w-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_35px_rgba(37,99,235,0.26)]"
        >
          {getTranslation('welcome.continue', selectedLanguage)}
        </button>
      </div>
    </main>
  )
}
