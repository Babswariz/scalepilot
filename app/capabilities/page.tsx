'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'
import { capabilityCatalog, formatCapabilityPrice } from '@/lib/service-catalog'

export default function CapabilitiesPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    setLanguage(getClientLanguage())
  }, [])

  return (
    <div className="bg-gradient-to-br from-[#071A33] to-[#0B1220] min-h-screen text-white">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            {getTranslation('nav.capabilities', language)}
          </h1>
          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto">
            {language === 'en'
              ? 'The intelligence, automation and growth systems that power the ScalePilot platform. Expert guidance available where applicable.'
              : 'De intelligentie-, automatiserings- en groeisystemen achter het ScalePilot-platform. Deskundige begeleiding beschikbaar waar van toepassing.'}
          </p>
        </div>
      </section>

      {/* Category quick nav */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
          {capabilityCatalog.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === category.id
                  ? 'text-white'
                  : 'text-[#94A3B8] border-[#3B82F6]/30 hover:border-[#3B82F6]/60'
              }`}
              style={
                activeCategory === category.id
                  ? { backgroundColor: `${category.color}20`, borderColor: category.color }
                  : undefined
              }
            >
              {category.title}
            </button>
          ))}
        </div>
      </section>

      {/* Capabilities by category */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {capabilityCatalog
            .filter((category) => !activeCategory || category.id === activeCategory)
            .map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-sm font-bold text-[#94A3B8]">{category.number}</span>
                  <h2 className="text-2xl md:text-3xl font-bold" style={{ color: category.color }}>
                    {category.title}
                  </h2>
                  <span className="hidden sm:block flex-1 h-px bg-[#3B82F6]/20" />
                  <span className="text-sm text-[#94A3B8] whitespace-nowrap">
                    {category.capabilities.length} {language === 'en' ? 'capabilities' : 'mogelijkheden'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {category.capabilities.map((capability) => (
                    <div
                      key={capability.id}
                      className="flex flex-col p-6 rounded-2xl border border-[#3B82F6]/25 bg-[#0B1220]/50 hover:border-[#3B82F6]/60 transition-colors"
                    >
                      <span
                        className="w-10 h-1 rounded-full mb-4"
                        style={{ backgroundColor: category.color }}
                        aria-hidden
                      />
                      <h3 className="text-lg font-bold mb-2">{capability.name}</h3>
                      <p className="text-sm text-[#94A3B8] mb-5 flex-1">{capability.description}</p>
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#3B82F6]/15">
                        <span className="text-sm font-semibold text-white">
                          {formatCapabilityPrice(capability)}
                        </span>
                        <Link
                          href={`/get-started?capability=${capability.id}`}
                          className="text-sm font-bold px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors whitespace-nowrap"
                        >
                          {getTranslation('capability.get-started-cta', language)}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
