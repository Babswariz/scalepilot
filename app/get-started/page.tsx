'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'
import { catalogServices, formatServicePrice, serviceCatalog } from '@/lib/service-catalog'

export default function GetStartedPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [paymentError, setPaymentError] = useState('')
  const [freeRequestSubmitted, setFreeRequestSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    websiteUrl: '',
    businessStage: 'just-starting',
    capabilities: [] as string[],
    projectContext: '',
  })

  useEffect(() => {
    setLanguage(getClientLanguage())
    const serviceFromUrl = new URLSearchParams(window.location.search).get('service')
    if (serviceFromUrl && catalogServices.some((service) => service.id === serviceFromUrl)) {
      setSelectedPlan(serviceFromUrl)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCapabilityToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.includes(id)
        ? prev.capabilities.filter((c) => c !== id)
        : [...prev.capabilities, id],
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.fullName && !!formData.email && !!formData.businessName
      case 2:
        return true
      case 3:
        return formData.capabilities.length > 0
      case 4:
        return !!formData.projectContext
      case 5:
        return !!selectedPlan
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setPaymentError('')

    try {
      const selectedService = catalogServices.find((service) => service.id === selectedPlan)
      const endpoint = selectedService?.free ? '/api/service-requests' : '/api/payments/initialize'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          capabilities: JSON.stringify(formData.capabilities),
          ...(selectedService?.free ? {} : { planId: selectedPlan }),
        }),
      })

      const data = await response.json()
      if (!response.ok || (!selectedService?.free && !data.checkoutUrl)) {
        setPaymentError(data.error || 'Unable to start payment. Please try again.')
        return
      }

      if (selectedService?.free) {
        setFreeRequestSubmitted(true)
      } else {
        window.location.assign(data.checkoutUrl)
      }
    } catch (error) {
      console.error('Error starting payment:', error)
      setPaymentError('Unable to start payment. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#071A33] to-[#0B1220] min-h-screen text-white">
      <Navigation />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {getTranslation('get-started.title', language)}
          </h1>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((step) => (
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
              {getTranslation('get-started.step', language)} {currentStep} {getTranslation('get-started.of', language)} 5
            </p>
          </div>

          <form onSubmit={handleSubmit}>
              {/* Step 1: About You */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">{getTranslation('get-started.step1.title', language)}</h2>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('get-started.step1.full-name', language)} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('get-started.step1.email', language)} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('get-started.step1.business-name', language)} *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Your Business */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-6">{getTranslation('get-started.step2.title', language)}</h2>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('get-started.step2.website-url', language)}
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('get-started.step2.business-stage', language)}
                    </label>
                    <select
                      name="businessStage"
                      value={formData.businessStage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    >
                      <option value="just-starting">{getTranslation('get-started.step2.just-starting', language)}</option>
                      <option value="already-selling">{getTranslation('get-started.step2.already-selling', language)}</option>
                      <option value="scaling">{getTranslation('get-started.step2.scaling', language)}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: What Do You Need */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">{getTranslation('get-started.step3.title', language)}</h2>
                  <p className="text-[#94A3B8] mb-6">{getTranslation('get-started.step3.select-capabilities', language)}</p>

                  <div className="space-y-3">
                    {serviceCatalog.map((cap) => (
                      <label key={cap.id} className="flex items-center p-4 border border-[#3B82F6]/30 rounded-lg hover:bg-[#0B1220]/50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.capabilities.includes(cap.id)}
                          onChange={() => handleCapabilityToggle(cap.id)}
                          className="w-5 h-5 rounded accent-[#2563EB]"
                        />
                        <span className="ml-3 font-semibold">{cap.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Project Context */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">{getTranslation('get-started.step4.title', language)}</h2>
                  <p className="text-[#94A3B8] mb-4">{getTranslation('get-started.step4.description', language)}</p>

                  <textarea
                    name="projectContext"
                    value={formData.projectContext}
                    onChange={handleInputChange}
                    placeholder={getTranslation('get-started.step4.placeholder', language)}
                    rows={8}
                    className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none resize-none"
                  />
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">{getTranslation('get-started.step5.title', language)}</h2>
                  <p className="text-[#94A3B8] mb-6">{getTranslation('get-started.step5.review-info', language)}</p>

                  <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Select a plan *</label>
                    <select
                      value={selectedPlan}
                      onChange={(event) => setSelectedPlan(event.target.value)}
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    >
                      <option value="">Choose a plan</option>
                      {serviceCatalog.map((category) => (
                        <optgroup key={category.id} label={category.title}>
                          {category.services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name} - {formatServicePrice(service.amount)}{service.bundle ? ` (Bundle - save €${service.savings?.toFixed(2)})` : ''}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {(() => {
                    const selectedService = serviceCatalog.flatMap((category) => category.services).find((service) => service.id === selectedPlan)
                    if (!selectedService) return null
                    return (
                      <div className="mb-6 rounded-lg border border-[#3B82F6]/30 bg-[#0B1220]/50 p-5 text-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-white">{selectedService.name}</span>
                          <span className="font-bold text-[#10B981]">{formatServicePrice(selectedService.amount)}</span>
                        </div>
                        {selectedService.bundle && <p className="mt-2 font-semibold text-[#10B981]">Bundled option: save €{selectedService.savings?.toFixed(2)} compared with individual services.</p>}
                        {selectedService.free && <p className="mt-2 font-semibold text-[#10B981]">Free service request. No payment is required.</p>}
                        {selectedService.includes && <p className="mt-2 text-[#94A3B8]">Includes: {selectedService.includes.join(', ')}</p>}
                      </div>
                    )
                  })()}

                  <div className="bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg p-6 space-y-3 text-sm">
                    <div>
                      <span className="text-[#94A3B8]">{getTranslation('get-started.step1.full-name', language)}:</span>
                      <span className="float-right">{formData.fullName}</span>
                    </div>
                    <div className="border-t border-[#3B82F6]/20 pt-3">
                      <span className="text-[#94A3B8]">{getTranslation('get-started.step1.email', language)}:</span>
                      <span className="float-right">{formData.email}</span>
                    </div>
                    <div className="border-t border-[#3B82F6]/20 pt-3">
                      <span className="text-[#94A3B8]">{getTranslation('get-started.step1.business-name', language)}:</span>
                      <span className="float-right">{formData.businessName}</span>
                    </div>
                    <div className="border-t border-[#3B82F6]/20 pt-3">
                      <span className="text-[#94A3B8]">Capabilities:</span>
                      <span className="float-right">{formData.capabilities.length} selected</span>
                    </div>
                  </div>
                  {paymentError && <p className="mt-4 text-sm text-red-300">{paymentError}</p>}
                  {freeRequestSubmitted && <p className="mt-4 text-sm text-[#10B981]">Request submitted successfully. We will contact you with next steps.</p>}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 border-2 border-[#3B82F6] text-[#3B82F6] font-bold rounded-lg hover:bg-[#3B82F6]/10 transition-colors"
                  >
                    {getTranslation('form.back', language)}
                  </button>
                )}
                {currentStep < 5 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep(currentStep)}
                    className="flex-1 px-6 py-3 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors"
                  >
                    {getTranslation('form.next', language)}
                  </button>
                )}
                {currentStep === 5 && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? getTranslation('form.submitting', language) : getTranslation('form.submit', language)}
                  </button>
                )}
              </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
