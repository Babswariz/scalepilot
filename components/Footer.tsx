'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getClientLanguage } from '@/lib/client-language'
import { Language, getTranslation } from '@/lib/translations'
import BrandLogo from '@/components/BrandLogo'

export default function Footer() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const syncLanguage = () => setLanguage(getClientLanguage())
    syncLanguage()
    window.addEventListener('languagechange', syncLanguage)
    return () => window.removeEventListener('languagechange', syncLanguage)
  }, [])

  const mainLinks = [
    { href: '/platform', label: getTranslation('nav.platform', language) },
    { href: '/capabilities', label: getTranslation('nav.capabilities', language) },
    { href: '/results', label: getTranslation('nav.results', language) },
    { href: '/how-it-works', label: getTranslation('nav.how-it-works', language) },
    { href: '/support', label: getTranslation('nav.support', language) },
  ]

  return (
    <footer className="border-t border-slate-800 bg-[#071A33]/90">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="mb-4">
              <BrandLogo
                textClassName="text-sm font-semibold tracking-[0.24em] text-slate-100"
                iconClassName="h-9 w-9"
              />
            </div>
            <p className="max-w-xs text-sm text-slate-400">
              {getTranslation('footer.tagline', language)}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {language === 'en' ? 'Platform' : 'Platform'}
            </h3>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {language === 'en' ? 'Legal' : 'Juridisch'}
            </h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-slate-300 transition-colors hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-slate-300 transition-colors hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          {getTranslation('footer.copyright', language)}
        </div>
      </div>
    </footer>
  )
}
