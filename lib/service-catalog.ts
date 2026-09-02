export type CatalogService = {
  id: string
  name: string
  amount: number
  bundle?: boolean
  savings?: number
  free?: boolean
  includes?: string[]
}

export type CatalogCategory = {
  id: string
  number: string
  title: string
  color: string
  services: CatalogService[]
  customMessage?: string
}

export const serviceCatalog: CatalogCategory[] = [
  {
    id: 'market-opportunity',
    number: '01',
    title: 'MARKET OPPORTUNITY',
    color: '#2563EB',
    services: [
      { id: 'opportunity-research', name: 'Opportunity Research', amount: 59.99 },
      { id: 'market-analysis', name: 'Market Analysis', amount: 29.99 },
      { id: 'competitor-analysis', name: 'Competitor Analysis', amount: 29.99 },
      { id: 'product-validation', name: 'Product Validation', amount: 69.99 },
      { id: 'commercial-recommendations', name: 'Commercial Recommendations', amount: 39.99 },
      { id: 'market-intelligence-suite', name: 'Market Intelligence Suite', amount: 210, bundle: true, savings: 19.95, includes: ['Opportunity Research', 'Market Analysis', 'Competitor Analysis', 'Product Validation', 'Commercial Recommendations'] },
    ],
  },
  {
    id: 'supply-intelligence',
    number: '02',
    title: 'SUPPLY INTELLIGENCE',
    color: '#10B981',
    services: [
      { id: 'supplier-research', name: 'Supplier Research', amount: 19.99 },
      { id: 'supplier-recommendations', name: 'Supplier Recommendations', amount: 9.99 },
      { id: 'sourcing-guidance', name: 'Sourcing Guidance', amount: 19.99 },
      { id: 'supplier-comparison', name: 'Supplier Comparison', amount: 9.99 },
      { id: 'complete-sourcing-suite', name: 'Complete Sourcing Suite', amount: 50, bundle: true, savings: 9.96, includes: ['Supplier Research', 'Supplier Recommendations', 'Sourcing Guidance', 'Supplier Comparison'] },
    ],
  },
  {
    id: 'storefront-architecture',
    number: '03',
    title: 'STOREFRONT ARCHITECTURE',
    color: '#8B5CF6',
    services: [{ id: 'complete-storefront-architecture', name: 'Complete Storefront Architecture', amount: 499.99, includes: ['Store Setup', 'Store Structure', 'Product Setup', 'Collection Setup', 'Navigation', 'Mobile Optimization', 'Conversion-Focused Structure'] }],
  },
  {
    id: 'theme-engineering',
    number: '04',
    title: 'THEME ENGINEERING',
    color: '#14B8A6',
    services: [
      { id: 'theme-recommendations-purchase', name: 'Theme Recommendations & Purchase', amount: 199.99 },
      { id: 'theme-installation', name: 'Theme Installation', amount: 0, free: true },
      { id: 'theme-customization', name: 'Theme Customization', amount: 99.99 },
      { id: 'theme-bug-fixes', name: 'Theme Bug Fixes', amount: 49.99 },
      { id: 'theme-license-activation-support', name: 'Theme License & Activation Support', amount: 199.99 },
      { id: 'layout-improvements', name: 'Layout Improvements', amount: 399.99 },
      { id: 'branding-adjustments', name: 'Branding Adjustments', amount: 299.99 },
      { id: 'theme-mobile-optimization', name: 'Mobile Optimization', amount: 399.99 },
    ],
  },
  {
    id: 'conversion-systems',
    number: '05',
    title: 'CONVERSION SYSTEMS',
    color: '#EC4899',
    services: [{ id: 'conversion-optimization-system', name: 'Conversion Optimization System', amount: 399.99, includes: ['UX Improvements', 'Product Page Improvements', 'Navigation Optimization', 'Trust Elements', 'Conversion Improvements', 'Mobile Improvements'] }],
  },
  {
    id: 'demand-activation',
    number: '06',
    title: 'DEMAND ACTIVATION',
    color: '#F97316',
    customMessage: 'Need something more specific? Contact ScalePilot Support for custom marketing requirements and tailored solutions.',
    services: [
      { id: 'marketing-strategy-plan', name: 'Marketing Strategy Plan', amount: 99.99 },
      { id: 'meta-marketing', name: 'Meta Marketing', amount: 399.99 },
      { id: 'tiktok-marketing', name: 'TikTok Marketing', amount: 299.99 },
      { id: 'email-marketing', name: 'Email Marketing', amount: 399.99 },
      { id: 'google-growth-strategy', name: 'Google Growth Strategy', amount: 499.99 },
    ],
  },
]

export const catalogServices = serviceCatalog.flatMap((category) => category.services)

export const getCatalogService = (serviceId: unknown) => typeof serviceId === 'string' ? catalogServices.find((service) => service.id === serviceId) || null : null

export const formatServicePrice = (amount: number) => amount === 0 ? 'Free' : `€${amount.toFixed(2)}`
