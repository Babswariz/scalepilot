'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'
import { formatServicePrice, serviceCatalog } from '@/lib/service-catalog'

export default function CapabilitiesPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null)

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
            {getTranslation('nav.capabilities', language)}
          </h1>
          <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto">
            {language === 'en'
              ? 'Explore the connected tools and services that power the ScalePilot platform.'
              : 'Ontdek de verbonden tools en diensten die het ScalePilot-platform aandrijven.'}
          </p>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCatalog.map((cap) => (
              <div
                key={cap.id}
                onClick={() => setSelectedCapability(selectedCapability === cap.id ? null : cap.id)}
                className="group cursor-pointer"
              >
                <div
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    selectedCapability === cap.id
                      ? 'border-[#3B82F6] bg-[#2563EB]/10'
                      : 'border-[#3B82F6]/30 hover:border-[#3B82F6]/60 bg-[#0B1220]/50'
                  }`}
                  style={{
                    borderColor:
                      selectedCapability === cap.id ? cap.color : 'rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <div className="mb-4 text-sm font-bold text-[#94A3B8]">
                    {cap.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: cap.color }}>
                    {cap.title}
                  </h3>
                  <p className="text-[#94A3B8] mb-4">
                    Explore individual services and complete packages in this capability.
                  </p>

                  {selectedCapability === cap.id && (
                    <div className="mt-6 pt-6 border-t border-[#3B82F6]/20 space-y-4">
                      <div>
                        <ul className="space-y-2">
                          {cap.services.map((service) => (
                            <li key={service.id} className="text-sm text-[#94A3B8] flex items-start justify-between gap-3">
                              <span><span style={{ color: cap.color }}>•</span> {service.name}{service.bundle ? ` (Bundle - save €${service.savings?.toFixed(2)} compared with individual services)` : ''}</span>
                              <span className="whitespace-nowrap font-semibold text-white">{formatServicePrice(service.amount)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {cap.services.map((service) => service.includes ? <div key={`${service.id}-includes`} className="border-t border-[#3B82F6]/20 pt-3 text-xs text-[#94A3B8"><strong className="text-white">{service.name} includes:</strong> {service.includes.join(', ')}</div> : null)}
                      {cap.customMessage && <p className="border-t border-[#3B82F6]/20 pt-3 text-sm font-semibold text-white">{cap.customMessage}</p>}
                      <Link href={`/get-started?service=${cap.services[0].id}`} className="block w-full mt-4 px-4 py-2 bg-[#2563EB] text-white font-bold rounded-lg text-center hover:bg-[#1d4ed8] transition-colors">{getTranslation('capability.get-started-cta', language)}</Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
