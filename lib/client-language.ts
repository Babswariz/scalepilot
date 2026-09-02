import { Language } from './translations'

export const useClientLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem('scalepilot-language')
  return (saved as Language) || 'en'
}

export const setClientLanguage = (lang: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('scalepilot-language', lang)
  }
}

export const getClientLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  return (localStorage.getItem('scalepilot-language') as Language) || 'en'
}
