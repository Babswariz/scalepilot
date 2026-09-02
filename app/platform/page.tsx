'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'

export default function PlatformPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [selectedCapability, setSelectedCapability] = useState('market-opportunity')

  useEffect(() => {
    setLanguage(getClientLanguage())
  }, [])

  // Capability color mapping
  const capabilityColors = {
    'market-opportunity': { accent: '#3B82F6', light: '#EFF6FF' },
    'supply-intelligence': { accent: '#10B981', light: '#ECFDF5' },
    'storefront-architecture': { accent: '#8B5CF6', light: '#FAF5FF' },
    'theme-engineering': { accent: '#14B8A6', light: '#F0FDFA' },
    'conversion-systems': { accent: '#EC4899', light: '#FDF2F8' },
    'demand-activation': { accent: '#F97316', light: '#FFF7ED' },
  }

  const capabilities = [
    {
      id: 'market-opportunity',
      title: 'MARKET OPPORTUNITY',
      description: 'Helping identify promising products, markets, competitors and commercial opportunities.',
    },
    {
      id: 'supply-intelligence',
      title: 'SUPPLY INTELLIGENCE',
      description: 'Helping businesses explore supplier options and sourcing opportunities.',
    },
    {
      id: 'storefront-architecture',
      title: 'STOREFRONT ARCHITECTURE',
      description: 'Building structured Shopify storefront experiences.',
    },
    {
      id: 'theme-engineering',
      title: 'THEME ENGINEERING',
      description: 'Professional theme development and optimization.',
    },
    {
      id: 'conversion-systems',
      title: 'CONVERSION SYSTEMS',
      description: 'Improving how customers experience and navigate a storefront.',
    },
    {
      id: 'demand-activation',
      title: 'DEMAND ACTIVATION',
      description: 'Supporting ecommerce marketing and customer acquisition.',
    },
  ]

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

  return (
    <div className="bg-gradient-to-br from-[#071A33] to-[#0B1220] min-h-screen text-white">
      <Navigation />

      {/* Hero Section - Premium */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-20 px-4 relative">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3B82F6]/5 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="mb-4 md:mb-6 space-y-2">
                <p className="text-xs md:text-sm uppercase tracking-widest text-[#3B82F6] font-bold">
                  {language === 'en' ? 'Welcome to' : 'Welkom bij'}
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight tracking-tight">
                SCALE
                <br />
                PILOT
              </h1>
              <h2 className="text-base md:text-xl lg:text-2xl font-light text-[#94A3B8] mb-6 md:mb-8 leading-relaxed tracking-wide">
                {getTranslation('hero.subtitle', language)}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-[#94A3B8] mb-8 md:mb-12 leading-relaxed max-w-md">
                {getTranslation('hero.description', language)}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link
                  href="/capabilities"
                  className="px-6 md:px-8 py-3 md:py-4 border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-sm md:text-base hover:bg-[#3B82F6] hover:text-white transition-all duration-300 rounded-lg text-center hover:shadow-lg hover:shadow-[#3B82F6]/50"
                >
                  {getTranslation('hero.explore', language)}
                </Link>
                <Link
                  href="/get-started"
                  className="px-6 md:px-8 py-3 md:py-4 bg-[#2563EB] text-white font-bold text-sm md:text-base hover:bg-[#1d4ed8] transition-all duration-300 rounded-lg text-center hover:shadow-lg hover:shadow-[#2563EB]/50"
                >
                  {getTranslation('hero.get-started', language)} →
                </Link>
              </div>
            </div>

            {/* Right: Visual Ecosystem - Dashboard Preview */}
            <div className="relative h-80 md:h-96 lg:h-full min-h-80">
              {/* Sophisticated dashboard visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a4a]/40 to-[#0B1220] rounded-3xl border border-[#3B82F6]/20 overflow-hidden">
                {/* Dashboard grid background */}
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="stroke-[#3B82F6]/10" strokeWidth="1">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Dashboard elements */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm">
                  {/* Top bar */}
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#10B981]/80"></div>
                      <div className="w-3 h-3 rounded-full bg-[#F97316]/80"></div>
                      <div className="w-3 h-3 rounded-full bg-[#3B82F6]/80"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gradient-to-r from-[#3B82F6]/40 to-transparent rounded w-3/4"></div>
                      <div className="h-2 bg-gradient-to-r from-[#10B981]/40 to-transparent rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Center content */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-[#2563EB]/15 border border-[#3B82F6]/30 rounded-lg">
                        <div className="h-1.5 bg-[#3B82F6]/60 rounded w-1/2 mb-2"></div>
                        <div className="h-1 bg-[#3B82F6]/40 rounded"></div>
                      </div>
                      <div className="p-3 bg-[#10B981]/15 border border-[#10B981]/30 rounded-lg">
                        <div className="h-1.5 bg-[#10B981]/60 rounded w-1/2 mb-2"></div>
                        <div className="h-1 bg-[#10B981]/40 rounded"></div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#F97316]/10 border border-[#F97316]/30 rounded-lg">
                      <div className="h-1 bg-[#F97316]/50 rounded mb-1.5"></div>
                      <div className="h-1 bg-[#F97316]/40 rounded w-2/3"></div>
                    </div>
                  </div>

                  {/* Bottom metrics */}
                  <div className="flex gap-2 text-xs">
                    <div className="px-2 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded text-[#3B82F6]/70 font-semibold">
                      Connected
                    </div>
                    <div className="px-2 py-1 bg-[#10B981]/10 border border-[#10B981]/20 rounded text-[#10B981]/70 font-semibold">
                      Real-time
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/10 via-transparent to-transparent opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth CTA Section - Premium */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#0B1220] via-[#1a2a4a]/50 to-[#0B1220] relative">

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
                {language === 'en'
                  ? 'BUILT TO HELP YOU REACH BIGGER MONTHS.'
                  : 'GEBOUWD OM U GROTERE MAANDEN TE HELPEN BEREIKEN.'}
              </h2>
              <p className="text-base md:text-lg text-[#94A3B8] leading-relaxed">
                {language === 'en'
                  ? 'Stronger decisions. Better infrastructure. Smarter execution. ScalePilot brings the important pieces together.'
                  : 'Sterkere beslissingen. Betere infrastructuur. Slimmere uitvoering. ScalePilot brengt de belangrijke stukken samen.'}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {['€10K', '€50K', '€100K+'].map((milestone) => (
                <div
                  key={milestone}
                  className="p-4 md:p-6 bg-[#0B1220]/50 border border-[#3B82F6]/20 rounded-xl text-center hover:border-[#3B82F6]/50 hover:bg-[#0B1220]/70 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-[#3B82F6] mb-2">{milestone}</div>
                  <p className="text-xs md:text-sm uppercase text-[#94A3B8] tracking-widest">
                    {language === 'en' ? 'Revenue Scale' : 'Inkomstenomvang'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section - Premium */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-tight">
            {getTranslation('intro.title', language)}
          </h2>
          <div className="mb-8 md:mb-12 space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-[#3B82F6] font-bold leading-relaxed">
              {language === 'en'
                ? 'Opportunity. Supply. Experience. Conversion. Demand.'
                : 'Kans. Voorraad. Ervaring. Conversie. Vraag.'}
            </p>
          </div>
          <p className="text-base md:text-lg text-[#94A3B8] mb-6">
            {getTranslation('intro.framework', language)}
          </p>
        </div>
      </section>

      {/* Why ScalePilot Section - Premium */}
      <section className="py-16 md:py-24 px-4 bg-[#0B1220]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
              {language === 'en' ? 'ONE ECOSYSTEM.' : 'EEN ECOSYSTEEM.'}
              <br />
              {language === 'en' ? 'MORE CONNECTED DECISIONS.' : 'MEER VERBONDEN BESLISSINGEN.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-[#0B1220] border border-[#3B82F6]/30 rounded-xl hover:border-[#3B82F6]/60 transition-colors">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg mb-4 md:mb-6 flex items-center justify-center">
                <span className="text-lg md:text-xl font-bold text-[#3B82F6]">✓</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                {language === 'en'
                  ? 'Disconnected Problems'
                  : 'Losgekoppelde Problemen'}
              </h3>
              <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed">
                {language === 'en'
                  ? 'Most ecommerce businesses treat market research, supply chain, storefront design, and customer acquisition as separate challenges. This fragmented approach often leads to missed opportunities and inconsistent strategy.'
                  : 'De meeste ecommerce-bedrijven behandelen marktonderzoek, toeleveringsketen, winkelontwerp en klantenwerving als aparte uitdagingen. Deze gefragmenteerde benadering leidt vaak tot gemiste kansen en inconsistente strategie.'}
              </p>
            </div>

            <div className="p-6 md:p-8 bg-gradient-to-br from-[#2563EB]/10 to-[#3B82F6]/5 border border-[#3B82F6]/50 rounded-xl hover:border-[#3B82F6]/70 transition-all">
              <div className="w-12 h-12 bg-[#3B82F6] rounded-lg mb-4 md:mb-6 flex items-center justify-center">
                <span className="text-lg md:text-xl font-bold text-white">→</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                {language === 'en' ? 'Connected Framework' : 'Verbonden Framework'}
              </h3>
              <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed">
                {language === 'en'
                  ? 'ScalePilot connects these areas into one strategic framework. Better decisions in opportunity analysis lead to smarter supply choices. Stronger storefronts drive better conversions. Aligned demand activation builds sustainable growth.'
                  : 'ScalePilot verbindt deze gebieden tot één strategisch framework. Betere beslissingen in kansanalyse leiden tot slimmere leveringskeuzen. Sterkere winkels drijven betere conversies. Uitgelijnde vraagactivering bouwt duurzame groei op.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Capability Explorer - Premium */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
              {language === 'en' ? 'CONNECTED CAPABILITIES' : 'VERBONDEN MOGELIJKHEDEN'}
            </h2>
            <p className="text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto">
              {language === 'en'
                ? 'Explore our integrated services that work together to accelerate your growth.'
                : 'Ontdek onze geïntegreerde diensten die samenwerken om uw groei te versnellen.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {capabilities.map((cap) => {
              const colors = capabilityColors[cap.id as keyof typeof capabilityColors]
              const isSelected = selectedCapability === cap.id
              
              // Icon mapping for capabilities
              const iconMap: { [key: string]: string } = {
                'market-opportunity': '🎯',
                'supply-intelligence': '📦',
                'storefront-architecture': '🏗️',
                'theme-engineering': '🎨',
                'conversion-systems': '⚡',
                'demand-activation': '🚀',
              }

              return (
                <button
                  key={cap.id}
                  onClick={() => setSelectedCapability(cap.id)}
                  className="p-6 md:p-8 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg group"
                  style={{
                    borderColor: isSelected ? colors.accent : `${colors.accent}40`,
                    backgroundColor: isSelected ? colors.light : '#0B1220',
                    boxShadow: isSelected ? `0 0 20px ${colors.accent}20` : 'none'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: colors.accent + '20',
                      color: colors.accent,
                    }}
                  >
                    {iconMap[cap.id] || '●'}
                  </div>
                  <h3
                    className="font-black text-base md:text-lg mb-2 leading-snug"
                    style={{ color: isSelected ? colors.accent : 'white' }}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed">{cap.description}</p>
                </button>
              )
            })}
          </div>

          {/* Capability Detail - Show when selected */}
          <div className="mt-12 p-6 md:p-12 bg-gradient-to-br from-[#0B1220] to-[#1a2a4a] border border-[#3B82F6]/30 rounded-2xl hover:border-[#3B82F6]/50 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div>
                <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#94A3B8] font-bold mb-3 md:mb-4">
                  {getTranslation('capability.overview', language)}
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  {getTranslation(`capability.${selectedCapability}.description`, language)}
                </p>
              </div>
              <div>
                <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#94A3B8] font-bold mb-3 md:mb-4">
                  {getTranslation('capability.whats-included', language)}
                </h3>
                <ul className="text-[#94A3B8] text-xs md:text-sm space-y-2">
                  {(
                    getTranslation<string[]>(`capability.${selectedCapability}.features`, language) ?? []
                  ).map((feature: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">• {feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#94A3B8] font-bold mb-3 md:mb-4">
                    {getTranslation('capability.starting-price', language)}
                  </h3>
                  <p className="text-xl md:text-2xl font-black text-[#3B82F6] mb-6">Custom Plan</p>
                </div>
                <Link
                  href="/get-started"
                  className="px-6 py-3 bg-[#2563EB] text-white font-bold hover:bg-[#1d4ed8] transition-all duration-300 rounded-lg text-center text-sm md:text-base hover:shadow-lg hover:shadow-[#2563EB]/50"
                >
                  {getTranslation('capability.get-started-cta', language)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Premium Timeline */}
      <section className="py-16 md:py-24 px-4 bg-[#0B1220]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
              {language === 'en' ? 'THE SCALEPILOT PROCESS' : 'HET SCALEPILOT-PROCES'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              {
                number: '01',
                title: getTranslation('how-it-works.step1.title', language),
                description: getTranslation('how-it-works.step1.description', language),
              },
              {
                number: '02',
                title: getTranslation('how-it-works.step2.title', language),
                description: getTranslation('how-it-works.step2.description', language),
              },
              {
                number: '03',
                title: getTranslation('how-it-works.step3.title', language),
                description: getTranslation('how-it-works.step3.description', language),
              },
              {
                number: '04',
                title: getTranslation('how-it-works.step4.title', language),
                description: getTranslation('how-it-works.step4.description', language),
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[40%] h-1 bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
                )}
                <div className="p-4 md:p-6 bg-[#0B1220] border border-[#3B82F6]/30 rounded-xl hover:border-[#3B82F6]/60 transition-all hover:shadow-lg relative z-10"
                  style={{boxShadow: 'none'}}
                >
                  <div className="text-2xl md:text-3xl font-black text-[#3B82F6] mb-3 md:mb-4">{step.number}</div>
                  <h3 className="font-bold text-base md:text-lg mb-2 leading-snug">{step.title}</h3>
                  <p className="text-xs md:text-sm text-[#94A3B8] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Gallery Section - Premium */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
              {getTranslation('results.title', language)}
            </h2>
            <p className="text-base md:text-lg text-[#94A3B8] mb-3 md:mb-4">
              {getTranslation('results.subtitle', language)}
            </p>
            <p className="text-xs md:text-sm text-[#94A3B8]/70">
              {getTranslation('results.disclaimer', language)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {salesProofs.map((proof) => (
              <div
                key={proof.id}
                className="relative group overflow-hidden rounded-xl border border-[#3B82F6]/30 aspect-video md:aspect-square bg-gradient-to-br from-[#2563EB]/10 to-[#0B1220] flex items-center justify-center hover:border-[#3B82F6]/60 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={proof.src}
                  alt={proof.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    const target = event.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement?.setAttribute('data-fallback', 'true')
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-transparent via-[#0B1220]/50 to-[#0B1220]">
                  <div className="text-4xl md:text-5xl font-black text-[#3B82F6]/40 mb-2">
                    {proof.id}
                  </div>
                  <p className="text-xs md:text-sm text-[#94A3B8]/60 font-semibold">
                    {proof.label}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-[#0B1220]/80 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E2E8F0] opacity-0 transition-opacity group-hover:opacity-100">
                  {proof.label}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/results"
              className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-[#3B82F6] text-[#3B82F6] font-bold text-sm md:text-base hover:bg-[#3B82F6] hover:text-white transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-[#3B82F6]/50"
            >
              {language === 'en' ? 'VIEW RESULTS →' : 'BEKIJK RESULTATEN →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section - Premium */}
      <section className="py-16 md:py-24 px-4 bg-[#0B1220]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
              {language === 'en' ? 'BUILT WITH REAL BUILDERS.' : 'GEBOUWD MET ECHTE BOUWERS.'}
            </h2>
            <p className="text-base md:text-lg text-[#94A3B8]">
              {language === 'en'
                ? 'Feedback from people who have worked with ScalePilot.'
                : 'Feedback van mensen die met ScalePilot hebben gewerkt.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 bg-[#0B1220] border border-[#3B82F6]/30 rounded-xl hover:border-[#3B82F6]/60 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 pb-5 md:pb-6 border-b border-[#3B82F6]/20">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs md:text-sm font-bold text-white">SP</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base">
                      {idx === 0 && 'Growth Partner'}
                      {idx === 1 && 'Brand Operator'}
                      {idx === 2 && 'Commerce Founder'}
                    </p>
                    <p className="text-xs md:text-sm text-[#94A3B8]">
                      {idx === 0 && 'Ecommerce Brand'}
                      {idx === 1 && 'Direct-to-Consumer'}
                      {idx === 2 && 'Online Retail'}
                    </p>
                  </div>
                </div>
                <p className="text-[#94A3B8] mb-4 italic text-sm md:text-base leading-relaxed">
                  {idx === 0 && '"The biggest difference was finally having a clearer direction. Instead of jumping between random tactics, everything felt more structured and easier to execute."'}
                  {idx === 1 && '"ScalePilot helped bring the important parts together. The strategy became clearer, decisions became faster, and we had a much better overview of what needed attention."'}
                  {idx === 2 && '"What stood out most was the clarity. We stopped guessing where to focus and started building around the things that could actually move the business forward."'}
                </p>
                <div className="inline-block px-3 py-1 bg-[#3B82F6]/20 text-[#3B82F6] text-xs font-semibold rounded-full">
                  {language === 'en' ? 'VERIFIED' : 'GEVERIFIEERD'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Premium */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-r from-[#1a2a4a]/70 via-[#0B1220] to-[#1a2a4a]/70 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
            {language === 'en'
              ? 'READY TO BUILD WITH MORE CLARITY?'
              : 'KLAAR OM MET MEER DUIDELIJKHEID TE BOUWEN?'}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#94A3B8] mb-8 md:mb-12 leading-relaxed">
            {language === 'en'
              ? 'Tell ScalePilot where you are now and where you want your business to go.'
              : 'Vertel ScalePilot waar u nu bent en waar u uw bedrijf naartoe wilt brengen.'}
          </p>
          <Link
            href="/get-started"
            className="inline-block px-8 md:px-12 py-4 md:py-6 bg-[#2563EB] text-white font-bold text-base md:text-lg hover:bg-[#1d4ed8] transition-all duration-300 rounded-lg hover:shadow-xl hover:shadow-[#2563EB]/50 hover:scale-105"
          >
            {getTranslation('nav.get-started', language)} →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
