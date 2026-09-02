'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'

export default function HowItWorksPage() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    setLanguage(getClientLanguage())
  }, [])

  const steps = [
    {
      number: '01',
      titleKey: 'how-it-works.step1.title',
      descriptionKey: 'how-it-works.step1.description',
      icon: '🎯',
    },
    {
      number: '02',
      titleKey: 'how-it-works.step2.title',
      descriptionKey: 'how-it-works.step2.description',
      icon: '📝',
    },
    {
      number: '03',
      titleKey: 'how-it-works.step3.title',
      descriptionKey: 'how-it-works.step3.description',
      icon: '✓',
    },
    {
      number: '04',
      titleKey: 'how-it-works.step4.title',
      descriptionKey: 'how-it-works.step4.description',
      icon: '🚀',
    },
  ]

  return (
    <div className="bg-gradient-to-br from-[#071A33] to-[#0B1220] min-h-screen text-white">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {getTranslation('how-it-works.title', language)}
          </h1>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-12 top-24 w-1 h-16 bg-gradient-to-b from-[#3B82F6] to-transparent hidden md:block" />
                )}

                {/* Step Card */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Number Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center text-2xl font-bold">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-bold text-[#3B82F6]">{step.number}</span>
                      <h2 className="text-3xl font-bold">
                        {getTranslation(step.titleKey, language)}
                      </h2>
                    </div>
                    <p className="text-lg text-[#94A3B8]">
                      {getTranslation(step.descriptionKey, language)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 p-12 border border-[#3B82F6]/30 rounded-2xl bg-[#2563EB]/5 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-[#94A3B8] mb-8">
              Take the first step towards transforming your ecommerce business.
            </p>
            <Link
              href="/get-started"
              className="inline-block px-10 py-4 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              BEGIN YOUR JOURNEY →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
