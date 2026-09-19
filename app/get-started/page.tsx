'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'
import { capabilityCatalog, getCapabilities, getCapability, formatCapabilityPrice } from '@/lib/service-catalog'

export default function GetStartedPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    websiteUrl: '',
    businessStage: 'just-starting',
    capabilities: [] as string[],
    projectContext: '',
    additionalNotes: '',
  })

  useEffect(() => {
    setLanguage(getClientLanguage())
    const preselected = new URLSearchParams(window.location.search).get('capability')
    if (preselected && getCapability(preselected)) {
      setFormData((prev) => ({ ...prev, capabilities: [preselected] }))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCapabilityToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.includes(id)
        ? prev.capabilities.filter((c) => c !== id)
        : [...prev.capabilities, id],
    }))
  }

  const selectedCapabilities = getCapabilities(formData.capabilities)

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.fullName.trim() && !!formData.email.trim() && !!formData.businessName.trim()
      case 2:
        return formData.capabilities.length > 0
      case 3:
        return !!formData.projectContext.trim()
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          businessName: formData.businessName,
          websiteUrl: formData.websiteUrl,
          businessStage: formData.businessStage,
          projectContext: formData.projectContext,
          additionalNotes: formData.additionalNotes,
          capabilities: JSON.stringify(formData.capabilities),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || 'Unable to submit your request. Please try again.')
        return
      }

      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl)
        return
      }

      // No payable amount -> request submitted, support will reach out.
      setRequestSubmitted(true)
    } catch (error) {
      console.error('Error submitting request:', error)
      setSubmitError('Unable to submit your request. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none'

  return (
    <div className="bg-gradient-to-br from-[#071A33] to-[#0B1220] min-h-screen text-white">
      <Navigation />

      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {getTranslation('get-started.title', language)}
          </h1>
          <p className="text-[#94A3B8] max-w-xl mx-auto">
            {language === 'en'
              ? 'Build your ScalePilot stack in a few steps. Expert guidance available where applicable.'
              : 'Stel je ScalePilot-stack samen in een paar stappen. Deskundige begeleiding beschikbaar waar van toepassing.'}
          </p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          {requestSubmitted ? (
            <div className="rounded-2xl border border-[#10B981]/40 bg-[#10B981]/10 p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">
                {language === 'en' ? 'Request received.' : 'Aanvraag ontvangen.'}
              </h2>
              <p className="text-[#CBD5E1]">
                {language === 'en'
                  ? "We've received your request. Our support team will review it and reach out with your next steps."
                  : 'We hebben je aanvraag ontvangen. Ons supportteam bekijkt deze en neemt contact op met de volgende stappen.'}
              </p>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-10">
                <div className="flex justify-between mb-3">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        step === currentStep
                          ? 'bg-[#2563EB] text-white'
                          : step < currentStep
                          ? 'bg-[#10B981] text-white'
                          : 'bg-[#0B1220] border border-[#3B82F6]/30 text-[#94A3B8]'
                      }`}
                    >
                      {step < currentStep ? '✓' : step}
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-[#94A3B8]">
                  {getTranslation('get-started.step', language)} {currentStep} {getTranslation('get-started.of', language)} 4
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Your information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">{getTranslation('get-started.step1.title', language)}</h2>
                    <div>
                      <label className="block text-sm font-bold mb-2">{getTranslation('get-started.step1.full-name', language)} *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">{getTranslation('get-started.step1.email', language)} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">{getTranslation('get-started.step1.business-name', language)} *</label>
                      <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">{getTranslation('get-started.step2.website-url', language)}</label>
                      <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">{getTranslation('get-started.step2.business-stage', language)}</label>
                      <select name="businessStage" value={formData.businessStage} onChange={handleInputChange} className={inputClass}>
                        <option value="just-starting">{getTranslation('get-started.step2.just-starting', language)}</option>
                        <option value="already-selling">{getTranslation('get-started.step2.already-selling', language)}</option>
                        <option value="scaling">{getTranslation('get-started.step2.scaling', language)}</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 2: Your ScalePilot stack */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {language === 'en' ? 'Build your ScalePilot stack' : 'Stel je ScalePilot-stack samen'}
                    </h2>
                    <p className="text-[#94A3B8] mb-6">
                      {language === 'en' ? 'Select the capabilities you want to activate.' : 'Selecteer de mogelijkheden die je wilt activeren.'}
                      {' '}
                      <span className="text-white font-semibold">{formData.capabilities.length} {language === 'en' ? 'selected' : 'geselecteerd'}</span>
                    </p>
                    <div className="space-y-8">
                      {capabilityCatalog.map((category) => (
                        <div key={category.id}>
                          <h3 className="text-sm font-bold mb-3" style={{ color: category.color }}>{category.title}</h3>
                          <div className="space-y-2">
                            {category.capabilities.map((capability) => {
                              const checked = formData.capabilities.includes(capability.id)
                              return (
                                <label
                                  key={capability.id}
                                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                    checked ? 'border-[#3B82F6] bg-[#2563EB]/10' : 'border-[#3B82F6]/25 hover:bg-[#0B1220]/50'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleCapabilityToggle(capability.id)}
                                    className="mt-1 w-5 h-5 rounded accent-[#2563EB] shrink-0"
                                  />
                                  <span className="min-w-0">
                                    <span className="block font-semibold text-sm">{capability.name}</span>
                                    <span className="block text-xs text-[#94A3B8]">{capability.description}</span>
                                  </span>
                                </label>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Business context */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-2">{getTranslation('get-started.step4.title', language)}</h2>
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        {language === 'en' ? 'What are you trying to achieve?' : 'Wat wil je bereiken?'} *
                      </label>
                      <textarea
                        name="projectContext"
                        value={formData.projectContext}
                        onChange={handleInputChange}
                        placeholder={getTranslation('get-started.step4.placeholder', language)}
                        rows={7}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        {language === 'en' ? 'Anything else we should know?' : 'Nog iets dat we moeten weten?'}
                      </label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">{getTranslation('get-started.step5.title', language)}</h2>

                    <div className="bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg p-6 space-y-3 text-sm mb-6">
                      <Row label={getTranslation('get-started.step1.full-name', language)} value={formData.fullName} />
                      <Row label={getTranslation('get-started.step1.email', language)} value={formData.email} border />
                      <Row label={getTranslation('get-started.step1.business-name', language)} value={formData.businessName} border />
                      {formData.websiteUrl && <Row label={getTranslation('get-started.step2.website-url', language)} value={formData.websiteUrl} border />}
                    </div>

                    <div className="bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg p-6 mb-6">
                      <h3 className="font-bold mb-4">
                        {language === 'en' ? 'Selected capabilities' : 'Geselecteerde mogelijkheden'} ({selectedCapabilities.length})
                      </h3>
                      <ul className="space-y-3">
                        {selectedCapabilities.map((capability) => (
                          <li key={capability.id} className="flex items-start justify-between gap-3 text-sm">
                            <span className="min-w-0">
                              <span className="block font-semibold">{capability.name}</span>
                              <span className="block text-xs text-[#94A3B8]">{capability.description}</span>
                            </span>
                            <span className="whitespace-nowrap font-semibold text-white">{formatCapabilityPrice(capability)}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 pt-4 border-t border-[#3B82F6]/20 text-xs text-[#94A3B8]">
                        {language === 'en'
                          ? 'Final payable amounts are confirmed by ScalePilot. Where a capability has no listed price, our support team will follow up with next steps and expert guidance where applicable.'
                          : 'Definitieve te betalen bedragen worden bevestigd door ScalePilot. Waar een mogelijkheid geen vermelde prijs heeft, neemt ons supportteam contact op met de volgende stappen.'}
                      </p>
                    </div>

                    {submitError && <p className="mb-4 text-sm text-red-300">{submitError}</p>}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-4 mt-10">
                  {currentStep > 1 && (
                    <button type="button" onClick={handleBack} className="flex-1 px-6 py-3 border-2 border-[#3B82F6] text-[#3B82F6] font-bold rounded-lg hover:bg-[#3B82F6]/10 transition-colors">
                      {getTranslation('form.back', language)}
                    </button>
                  )}
                  {currentStep < 4 && (
                    <button type="button" onClick={handleNext} disabled={!validateStep(currentStep)} className="flex-1 px-6 py-3 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors">
                      {getTranslation('form.next', language)}
                    </button>
                  )}
                  {currentStep === 4 && (
                    <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-3 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors">
                      {isSubmitting ? getTranslation('form.submitting', language) : (language === 'en' ? 'Continue' : 'Doorgaan')}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function Row({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={border ? 'border-t border-[#3B82F6]/20 pt-3' : ''}>
      <span className="text-[#94A3B8]">{label}:</span>
      <span className="float-right text-right break-words max-w-[60%]">{value}</span>
    </div>
  )
}
