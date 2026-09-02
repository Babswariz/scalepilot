'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Language, getTranslation } from '@/lib/translations'
import { getClientLanguage, setClientLanguage } from '@/lib/client-language'
import BrandLogo from '@/components/BrandLogo'

const navLinks = [
  { href: '/platform', key: 'nav.platform' },
  { href: '/capabilities', key: 'nav.capabilities' },
  { href: '/results', key: 'nav.results' },
  { href: '/how-it-works', key: 'nav.how-it-works' },
  { href: '/faq', key: 'nav.faq' },
  { href: '/support', key: 'nav.support' },
]

export default function Navigation() {
  const [language, setLanguage] = useState<Language>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const current = getClientLanguage()
    setLanguage(current)

    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLanguage = () => {
    const next = language === 'en' ? 'nl' : 'en'
    setLanguage(next)
    setClientLanguage(next)
    window.dispatchEvent(new Event('languagechange'))
  }

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-[#071A33]/85 backdrop-blur-xl shadow-[0_12px_30px_rgba(7,26,51,0.38)]' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/platform" className="flex items-center" aria-label="ScalePilot home">
          <BrandLogo
            className=""
            textClassName="text-sm font-semibold tracking-[0.24em] text-slate-100"
            iconClassName="h-9 w-9 shadow-[0_0_30px_rgba(37,99,235,0.35)]"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {getTranslation(link.key as keyof typeof import('@/lib/translations').translations.en, language)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="hidden rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition-colors hover:border-blue-400/60 hover:text-blue-200 sm:inline-flex"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'NL' : 'EN'}
          </button>

          <Link
            href="/get-started"
            className="hidden rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {getTranslation('nav.get-started', language)}
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 text-slate-100 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-800 bg-[#071A33]/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900/60 hover:text-white"
              >
                {getTranslation(link.key as keyof typeof import('@/lib/translations').translations.en, language)}
              </Link>
            ))}

            <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex-1 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
              >
                {language === 'en' ? 'Switch to Dutch' : 'Switch to English'}
              </button>
              <Link
                href="/get-started"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
              >
                {getTranslation('nav.get-started', language)}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
