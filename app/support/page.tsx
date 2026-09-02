'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getTranslation, Language } from '@/lib/translations'
import { getClientLanguage } from '@/lib/client-language'

export default function SupportPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [ticketId, setTicketId] = useState<string | null>(null)
  useEffect(() => {
    setLanguage(getClientLanguage())
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setTicketId(data.statusUrl || `/support/${data.accessToken || data.id}`)
        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        throw new Error('Unable to submit support request.')
      }
    } catch (error) {
      console.error('Error submitting ticket:', error)
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
            {getTranslation('support.title', language)}
          </h1>
          <p className="text-xl text-[#94A3B8]">
            {getTranslation('support.subtitle', language)}
          </p>
        </div>
      </section>

      {/* Human Support Request */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
              <h2 className="text-3xl font-bold">{getTranslation('support.ticket.title', language)}</h2>

              {submitSuccess ? (
                <div className="bg-[#10B981]/10 border border-[#10B981]/50 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-bold text-[#10B981] mb-2">
                    {getTranslation('support.ticket.success.title', language)}
                  </h3>
                  <p className="text-[#94A3B8] mb-4">
                    {getTranslation('support.ticket.success.message', language)}
                  </p>
                  <p className="text-sm text-[#94A3B8]">
                    {getTranslation('support.ticket.success.ticket-id', language)}
                    <a href={ticketId ?? '#'} className="mt-3 inline-block break-all font-bold text-[#38BDF8] underline decoration-[#38BDF8] underline-offset-4">
                      {ticketId || 'Ticket link'}
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('support.ticket.name', language)}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('support.ticket.email', language)}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('support.ticket.subject', language)}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      {getTranslation('support.ticket.message', language)}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-[#0B1220]/50 border border-[#3B82F6]/30 rounded-lg text-white focus:border-[#3B82F6] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting
                      ? getTranslation('support.ticket.submitting', language)
                      : getTranslation('support.ticket.submit', language)}
                  </button>
                </form>
              )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
