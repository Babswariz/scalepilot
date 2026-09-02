'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'

export default function FAQPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  useEffect(() => {
    setLanguage(getClientLanguage())
  }, [])

  const faqs = [
    'what-is-scalepilot',
    'what-does-scalepilot-help-with',
    'identify-opportunities',
    'help-suppliers',
    'build-storefront',
    'theme-engineering',
    'improve-storefront',
    'activate-demand',
    'request-process',
    'immediate-payment',
    'multiple-capabilities',
    'commerce-infrastructure',
    'contact-support',
    'language-switch',
    'getting-started',
  ]

  return (
    <div className="bg-gradient-to-br from-[#071A33] to-[#0B1220] min-h-screen text-white">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {getTranslation('faq.title', language)}
          </h1>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faqKey) => (
            <div
              key={faqKey}
              className="border border-[#3B82F6]/30 rounded-lg overflow-hidden hover:border-[#3B82F6]/60 transition-colors"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faqKey ? null : faqKey)}
                className="w-full p-6 bg-[#0B1220]/50 hover:bg-[#0B1220]/70 transition-colors text-left flex items-center justify-between"
              >
                <h3 className="text-lg font-bold pr-4">
                  {getTranslation(`faq.${faqKey}.question`, language)}
                </h3>
                <span className="text-[#3B82F6] text-2xl font-bold flex-shrink-0">
                  {expandedFAQ === faqKey ? '−' : '+'}
                </span>
              </button>

              {expandedFAQ === faqKey && (
                <div className="p-6 bg-[#0B1220]/30 border-t border-[#3B82F6]/30">
                  <p className="text-[#94A3B8] leading-relaxed">
                    {getTranslation(`faq.${faqKey}.answer`, language)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
