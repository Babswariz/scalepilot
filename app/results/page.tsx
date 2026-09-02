'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'

const salesProofs = [
    { id: '01', src: '/case-studies/case-study-01.webp', label: '01 — PERFORMANCE' },
    { id: '02', src: '/case-studies/case-study-02.webp', label: '02 — GROWTH' },
    { id: '03', src: '/case-studies/case-study-03.webp', label: '03 — RESULTS' },
    { id: '04', src: '/case-studies/case-study-04.webp', label: '04 — OFFER' },
    { id: '05', src: '/case-studies/case-study-05.webp', label: '05 — SCALING' },
    { id: '06', src: '/case-studies/case-study-06.webp', label: '06 — MOMENTUM' },
    { id: '07', src: '/case-studies/case-study-07.webp', label: '07 — REVENUE' },
    { id: '08', src: '/case-studies/case-study-08.webp', label: '08 — PROGRESS' },
    { id: '09', src: '/case-studies/case-study-09.webp', label: '09 — INSIGHTS' },
  ]

  export default function ResultsPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [selectedResult, setSelectedResult] = useState<number | null>(null)

  useEffect(() => {
    setLanguage(getClientLanguage())
  }, [])

  return (
    <div className="bg-gradient-to-br from-[#071A33] to-[#0B1220] min-h-screen text-white">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-8">
            {getTranslation('results.title', language)}
          </h1>
          <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto mb-6">
            {getTranslation('results.subtitle', language)}
          </p>
          <p className="text-sm text-[#94A3B8]/70">
            {getTranslation('results.disclaimer', language)}
          </p>
        </div>
      </section>

      {/* Results Gallery - 9 items with masonry layout */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salesProofs.map((proof, idx) => {
              const heights = ['h-80', 'h-96', 'h-72', 'h-84', 'h-80', 'h-96', 'h-72', 'h-88', 'h-80']
              const heightClass = heights[idx % heights.length]

              return (
                <div
                  key={proof.id}
                  onClick={() => setSelectedResult(selectedResult === idx ? null : idx)}
                  className={`group cursor-pointer overflow-hidden rounded-xl border border-[#3B82F6]/30 hover:border-[#3B82F6]/80 transition-all duration-300 ${heightClass} relative`}
                >
                  <img
                    src={proof.src}
                    alt={proof.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1220]/35 to-[#0B1220] flex flex-col justify-end p-4">
                    <div className="flex items-end justify-between gap-3">
                      <div className="text-4xl md:text-5xl font-black text-[#3B82F6]/60">
                        {proof.id}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2E8F0] text-right">
                        {proof.label}
                      </div>
                    </div>
                  </div>

                  {selectedResult === idx && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#2563EB]/20 to-transparent flex flex-col justify-end p-6 z-20">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{proof.label}</h3>
                        <p className="text-sm text-[#94A3B8]">
                          {language === 'en'
                            ? 'Real sales proof from the ScalePilot platform.'
                            : 'Echt verkoopbewijs van het ScalePilot-platform.'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#3B82F6]/10 to-transparent pointer-events-none"></div>
                </div>
              )
            })}
          </div>

          {/* Upload Section */}
          <div className="mt-20 p-12 bg-gradient-to-br from-[#2563EB]/10 to-[#0B1220] border-2 border-[#3B82F6]/30 rounded-2xl text-center">
            <h2 className="text-3xl font-black mb-4">
              {language === 'en'
                ? 'Ready to Showcase Your Success?'
                : 'Klaar om uw succes te tonen?'}
            </h2>
            <p className="text-lg text-[#94A3B8] mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Upload your sales proof screenshots, case studies, and performance metrics to display real results from the ScalePilot platform.'
                : 'Upload uw verkoopbewijsschermafbeeldingen, casestudies en prestatiegegevens om echte resultaten van het ScalePilot-platform weer te geven.'}
            </p>
            <p className="text-sm text-[#94A3B8]/70">
              {language === 'en'
                ? 'Contact the admin dashboard to upload your results gallery.'
                : 'Contacteer het beheerdashboard om uw resultatengalerie te uploaden.'}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
