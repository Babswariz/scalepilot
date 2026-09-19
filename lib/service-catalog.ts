// ============================================================================
// ScalePilot Capability Catalog — SINGLE SOURCE OF TRUTH
// ----------------------------------------------------------------------------
// Every capability the platform offers is defined here exactly once. This file
// powers the capabilities page, capability selection, the intake/checkout flow,
// requests, dashboards, and admin views.
//
// PRICING: Prices are intentionally UNDEFINED (amount: null) by default. Real
// commercial pricing is configured by an administrator; nothing here invents a
// price. The structure supports amount / currency / billingModel / active so an
// admin can enable pricing per capability in a later phase. Until a price is
// set, a capability is presented as "Pricing on request" with expert guidance
// available, and the server treats it as non-payable.
// ============================================================================

export type BillingModel = 'one-time' | 'monthly' | 'recurring' | 'included' | 'usage-based'

export type Capability = {
  /** Stable, unique identifier. Never reuse or duplicate. */
  id: string
  name: string
  description: string
  /** Category id this capability belongs to. */
  categoryId: string
  // --- Pricing metadata (admin-configurable; undefined until set) ---
  amount: number | null
  currency: string
  billingModel: BillingModel | null
  active: boolean
}

export type CapabilityCategory = {
  id: string
  number: string
  title: string
  color: string
  capabilities: Capability[]
}

const DEFAULT_CURRENCY = 'EUR'

/** Helper to declare a capability with undefined pricing by default. */
function cap(
  categoryId: string,
  id: string,
  name: string,
  description: string,
  overrides: Partial<Pick<Capability, 'amount' | 'currency' | 'billingModel' | 'active'>> = {},
): Capability {
  return {
    id,
    name,
    description,
    categoryId,
    amount: overrides.amount ?? null,
    currency: overrides.currency ?? DEFAULT_CURRENCY,
    billingModel: overrides.billingModel ?? null,
    active: overrides.active ?? true,
  }
}

export const capabilityCatalog: CapabilityCategory[] = [
  {
    id: 'ecommerce-infrastructure',
    number: '01',
    title: 'E-Commerce Infrastructure',
    color: '#2563EB',
    capabilities: [
      cap('ecommerce-infrastructure', 'storefront-building-cms', 'Storefront Building & CMS', 'Launch and manage a fully structured storefront with a flexible content management system.'),
      cap('ecommerce-infrastructure', 'catalog-pim', 'Catalog & Product Information Management (PIM)', 'Centralize product data, attributes and media across every channel from one source.'),
      cap('ecommerce-infrastructure', 'cart-checkout-optimization', 'Shopping Cart & Checkout Optimization', 'Streamline cart and checkout to reduce friction and recover more revenue.'),
      cap('ecommerce-infrastructure', 'inventory-management-sync', 'Inventory Management & Sync', 'Keep stock levels accurate and synchronized across stores, channels and warehouses.'),
      cap('ecommerce-infrastructure', 'order-management-system', 'Order Management System (OMS)', 'Orchestrate orders end to end with a unified order management workflow.'),
      cap('ecommerce-infrastructure', 'multi-channel-marketplace', 'Multi-Channel & Marketplace Integration', 'Sell and sync across marketplaces and sales channels from a single control layer.'),
      cap('ecommerce-infrastructure', 'b2b-wholesale-portals', 'B2B & Wholesale Portals', 'Offer dedicated wholesale and B2B buying experiences with tiered access.'),
      cap('ecommerce-infrastructure', 'payment-gateway-integration', 'Payment Gateway Integration', 'Connect and configure payment gateways for reliable, secure checkout.'),
      cap('ecommerce-infrastructure', 'bnpl-integrations', 'Buy Now, Pay Later (BNPL) Integrations', 'Add installment and pay-later options to increase conversion and order value.'),
      cap('ecommerce-infrastructure', 'multi-currency-cross-border', 'Multi-Currency & Cross-Border Billing', 'Present and settle in multiple currencies for cross-border selling.'),
      cap('ecommerce-infrastructure', 'tax-vat-compliance', 'Automated Sales Tax & VAT Compliance', 'Automate sales tax and VAT calculation and compliance across regions.'),
      cap('ecommerce-infrastructure', 'subscription-recurring-billing', 'Subscription & Recurring Billing', 'Sell subscriptions and manage recurring billing lifecycles.'),
      cap('ecommerce-infrastructure', 'fraud-chargeback-protection', 'Fraud Prevention & Chargeback Protection', 'Detect fraud and reduce chargebacks with automated protection rules.'),
    ],
  },
  {
    id: 'marketing-growth',
    number: '02',
    title: 'Marketing & Customer Growth',
    color: '#8B5CF6',
    capabilities: [
      cap('marketing-growth', 'email-marketing-flows', 'Email Marketing & Automated Flows', 'Run lifecycle email campaigns and automated flows that convert and retain.'),
      cap('marketing-growth', 'sms-whatsapp-marketing', 'SMS & WhatsApp Marketing Suites', 'Reach customers on SMS and WhatsApp with automated messaging suites.'),
      cap('marketing-growth', 'crm', 'Customer Relationship Management (CRM)', 'Unify customer data and interactions in a single CRM view.'),
      cap('marketing-growth', 'personalization-recommendations', 'Personalization & Recommendation Engines', 'Serve personalized experiences and product recommendations that lift AOV.'),
      cap('marketing-growth', 'loyalty-rewards-vip', 'Loyalty, Rewards & VIP Programs', 'Build loyalty, rewards and VIP tiers that drive repeat purchases.'),
      cap('marketing-growth', 'affiliate-influencer-referral', 'Affiliate, Influencer & Referral Tracking', 'Track affiliates, influencers and referrals with attributable performance.'),
      cap('marketing-growth', 'seo-suite', 'Search Engine Optimization (SEO) Suite', 'Improve organic visibility with a structured SEO toolkit.'),
      cap('marketing-growth', 'ad-campaign-automation-sync', 'Ad Campaign Automation & Sync', 'Automate and synchronize ad campaigns across platforms.'),
      cap('marketing-growth', 'reviews-social-proof', 'Product Reviews & Social Proof Widgets', 'Collect reviews and display social proof to build trust and conversion.'),
    ],
  },
  {
    id: 'shipping-operations',
    number: '03',
    title: 'Shipping & Operations',
    color: '#10B981',
    capabilities: [
      cap('shipping-operations', 'carrier-shipping-rates', 'Real-Time Carrier Shipping Rate Calculators', 'Show accurate, real-time carrier rates at checkout.'),
      cap('shipping-operations', 'label-batch-printing', 'Label Generation & Batch Printing', 'Generate and batch-print shipping labels at scale.'),
      cap('shipping-operations', 'order-tracking-portals', 'Order Tracking & Branded Post-Purchase Portals', 'Give customers branded tracking and post-purchase experiences.'),
      cap('shipping-operations', 'returns-exchanges-portals', 'Automated Returns & Exchanges Portals', 'Automate returns and exchanges through a self-service portal.'),
      cap('shipping-operations', 'analytics-attribution', 'E-Commerce Analytics & Attribution', 'Measure performance with unified analytics and attribution.'),
      cap('shipping-operations', 'omnichannel-helpdesk-chat', 'Omnichannel Customer Support Helpdesks & Live Chat', 'Support customers across channels with helpdesk and live chat.'),
      cap('shipping-operations', 'heatmaps-behavior-analytics', 'Heatmaps & User Behavior Analytics', 'Understand on-site behavior with heatmaps and session insights.'),
      cap('shipping-operations', 'ab-testing-cro', 'A/B Testing & Conversion Rate Optimization (CRO)', 'Run experiments and optimize conversion systematically.'),
    ],
  },
  {
    id: 'product-market-intelligence',
    number: '04',
    title: 'Product & Market Intelligence',
    color: '#F59E0B',
    capabilities: [
      cap('product-market-intelligence', 'sourcing-price-intelligence', 'Product Sourcing & Competitor Price Intelligence', 'Source products and monitor competitor pricing with live intelligence.'),
      cap('product-market-intelligence', 'ad-spy-product-research', 'Ad Spy Tools & Winning Product Research', 'Discover winning products and analyze competitor ad creatives.'),
      cap('product-market-intelligence', 'viral-trend-detectors', 'Viral Trend Detectors (TikTok Shop & Social Momentum)', 'Detect emerging viral trends across TikTok Shop and social momentum.'),
      cap('product-market-intelligence', 'sales-trackers-revenue-estimators', 'Store Sales Trackers & Revenue Estimators', 'Estimate store sales and revenue to benchmark opportunities.'),
      cap('product-market-intelligence', 'competitor-saturation-indexing', 'Competitor Saturation Indexing', 'Gauge market saturation and competitive density for a product.'),
      cap('product-market-intelligence', 'profitability-margin-cogs', 'Profitability, Margin & COGS Calculators', 'Model profitability, margins and cost of goods with precision.'),
      cap('product-market-intelligence', 'ai-niche-analyzers', 'AI Niche Analyzers & Market Demand Tools', 'Analyze niches and market demand with AI-assisted tooling.'),
      cap('product-market-intelligence', 'visual-reverse-search', 'Visual Image Reverse Search (Factory Discovery)', 'Find factories and sources through visual reverse image search.'),
      cap('product-market-intelligence', 'vetted-supplier-directories', 'Vetted Supplier Directories & Databases', 'Access curated, vetted supplier directories and databases.'),
      cap('product-market-intelligence', 'supplier-reliability-scoring', 'Supplier Reliability Scoring Systems', 'Score supplier reliability to reduce sourcing risk.'),
      cap('product-market-intelligence', 'sample-qc-dashboards', 'Sample Request & Quality Control Dashboards', 'Manage sample requests and quality control from one dashboard.'),
    ],
  },
  {
    id: 'product-supplier-operations',
    number: '05',
    title: 'Product & Supplier Operations',
    color: '#14B8A6',
    capabilities: [
      cap('product-supplier-operations', 'private-label-packaging-branding', 'Private Label, Custom Packaging & Branding Tools', 'Build private-label products with custom packaging and branding.'),
      cap('product-supplier-operations', 'price-wholesale-negotiators', 'Automated Price & Wholesale Tier Negotiators', 'Automate price and wholesale-tier negotiation workflows.'),
      cap('product-supplier-operations', 'one-click-importers', '1-Click Product Importers & Browser Extensions', 'Import products in one click with browser extensions.'),
      cap('product-supplier-operations', 'ai-content-copy-rewriters', 'AI Bulk Content & Product Copy Rewriters', 'Generate and rewrite product copy in bulk with AI.'),
      cap('product-supplier-operations', 'ai-image-video-cleaners', 'AI Image & Video Asset Cleaners', 'Clean and prepare image and video assets automatically with AI.'),
      cap('product-supplier-operations', 'dynamic-variant-mapping', 'Dynamic Variant Mapping (Multi-Supplier/Warehouse Linking)', 'Map variants dynamically across suppliers and warehouses.'),
      cap('product-supplier-operations', 'price-stock-syncing', 'Automated Price & Stock Syncing Systems', 'Keep prices and stock synchronized automatically across sources.'),
    ],
  },
  {
    id: 'storefront-conversion',
    number: '06',
    title: 'Storefront & Conversion',
    color: '#EC4899',
    capabilities: [
      cap('storefront-conversion', 'landing-funnel-builders', 'Drag-and-Drop Landing Page & Funnel Builders', 'Build landing pages and funnels visually with drag-and-drop.'),
      cap('storefront-conversion', '3d-mockup-device-generators', '3D Mockup & Device Asset Generators', 'Generate 3D mockups and device assets for compelling visuals.'),
      cap('storefront-conversion', 'conversion-theme-frameworks', 'Conversion-Optimized Theme Frameworks', 'Deploy theme frameworks engineered for conversion.'),
      cap('storefront-conversion', 'custom-sizing-personalization', 'Custom Sizing & Personalization Tools', 'Offer custom sizing and product personalization at checkout.'),
      cap('storefront-conversion', 'slide-cart-upsell-engine', 'Slide Cart & Upsell Engine Builders', 'Increase order value with slide carts and upsell engines.'),
      cap('storefront-conversion', 'multi-language-localization', 'Multi-Language & Auto-Localization Tools', 'Localize your storefront automatically across languages.'),
    ],
  },
  {
    id: 'advertising-acquisition',
    number: '07',
    title: 'Advertising & Acquisition',
    color: '#F97316',
    capabilities: [
      cap('advertising-acquisition', 'meta-ads-integrations', 'Meta Ads Manager Integrations', 'Integrate and manage Meta ad campaigns directly.'),
      cap('advertising-acquisition', 'tiktok-spark-ads', 'TikTok Ads & Spark Ads Automation', 'Automate TikTok Ads and Spark Ads campaigns.'),
      cap('advertising-acquisition', 'google-shopping-feed', 'Google Shopping Feed Managers', 'Manage and optimize Google Shopping product feeds.'),
      cap('advertising-acquisition', 'pinterest-snapchat-launchers', 'Pinterest & Snapchat Creative Launchers', 'Launch creative campaigns on Pinterest and Snapchat.'),
      cap('advertising-acquisition', 'creative-ugc-hook-builders', 'Creative Asset, Script & UGC Hook Builders', 'Produce creative assets, scripts and UGC hooks at scale.'),
      cap('advertising-acquisition', 'first-party-attribution-tracking', 'Cross-Platform First-Party Attribution & Server-Side Tracking', 'Track conversions with first-party, server-side attribution across platforms.'),
      cap('advertising-acquisition', 'automated-ad-rules-scaling', 'Automated Ad Rules & Scaling Engines', 'Scale ad spend with automated rules and scaling engines.'),
      cap('advertising-acquisition', 'automated-dropshipping-fulfillment', 'Automated Dropshipping Order Fulfillment', 'Automate dropshipping order fulfillment end to end.'),
      cap('advertising-acquisition', 'post-purchase-upsell-funnels', 'One-Click Post-Purchase Upsell & Downsell Funnels', 'Add one-click post-purchase upsell and downsell funnels.'),
    ],
  },
]

// ---------------------------------------------------------------------------
// Derived lookups
// ---------------------------------------------------------------------------

export const allCapabilities: Capability[] = capabilityCatalog.flatMap((category) => category.capabilities)

export const getCapability = (capabilityId: unknown): Capability | null =>
  typeof capabilityId === 'string' ? allCapabilities.find((c) => c.id === capabilityId) ?? null : null

export const getCapabilities = (ids: unknown): Capability[] => {
  if (!Array.isArray(ids)) return []
  return ids
    .map((id) => getCapability(id))
    .filter((c): c is Capability => c !== null)
}

export const getCategoryForCapability = (capabilityId: string): CapabilityCategory | null =>
  capabilityCatalog.find((cat) => cat.capabilities.some((c) => c.id === capabilityId)) ?? null

/**
 * Server-authoritative amount for a selection of capability ids.
 * Sums only ACTIVE capabilities that have a defined price. Undefined-priced
 * capabilities contribute nothing (they are non-payable / expert-guidance).
 * Returns { amount, currency, payable }. If capabilities span more than one
 * currency, we cannot combine them into a single charge -> payable = false.
 */
export const computeSelectionAmount = (ids: unknown): { amount: number; currency: string; payable: boolean } => {
  const caps = getCapabilities(ids).filter((c) => c.active && typeof c.amount === 'number' && (c.amount as number) > 0)
  if (caps.length === 0) return { amount: 0, currency: DEFAULT_CURRENCY, payable: false }
  const currencies = new Set(caps.map((c) => c.currency))
  if (currencies.size > 1) return { amount: 0, currency: DEFAULT_CURRENCY, payable: false }
  const amount = caps.reduce((sum, c) => sum + (c.amount as number), 0)
  return { amount: Number(amount.toFixed(2)), currency: caps[0].currency, payable: amount > 0 }
}

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

const currencySymbols: Record<string, string> = {
  EUR: '€', USD: '$', GBP: '£', NGN: '₦', CAD: 'CA$', AUD: 'A$',
  ZAR: 'R', GHS: 'GH₵', KES: 'KSh', UGX: 'USh', TZS: 'TSh', RWF: 'FRw',
}

export const formatMoney = (amount: number, currency = DEFAULT_CURRENCY): string => {
  const symbol = currencySymbols[currency] ?? `${currency} `
  return `${symbol}${amount.toFixed(2)}`
}

const billingSuffix: Record<BillingModel, string> = {
  'one-time': '',
  monthly: ' / month',
  recurring: ' recurring',
  included: '',
  'usage-based': ' usage-based',
}

/** Human-readable price label for a capability. Undefined price => on request. */
export const formatCapabilityPrice = (capability: Pick<Capability, 'amount' | 'currency' | 'billingModel'>): string => {
  if (capability.amount === null || capability.amount <= 0) return 'Pricing on request'
  const suffix = capability.billingModel ? billingSuffix[capability.billingModel] : ''
  return `${formatMoney(capability.amount, capability.currency)}${suffix}`
}

// ---------------------------------------------------------------------------
// Backwards-compatible aliases (kept so existing imports keep working).
// Prefer the new names above in new code.
// ---------------------------------------------------------------------------

export type CatalogService = Capability
export type CatalogCategory = CapabilityCategory

export const serviceCatalog = capabilityCatalog
export const catalogServices = allCapabilities
export const getCatalogService = getCapability
export const formatServicePrice = (amount: number | null): string =>
  amount === null || amount <= 0 ? 'Pricing on request' : formatMoney(amount)
