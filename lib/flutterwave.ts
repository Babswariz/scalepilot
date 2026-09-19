import { PrismaClient } from '@prisma/client'

// Reuse a single Prisma client across hot reloads / route handlers.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const getFlutterwaveKeys = () => ({
  publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY,
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
})

/**
 * Currencies we are willing to present. This is the intersection of common
 * Flutterwave-supported currencies; the actual availability still depends on
 * the connected Flutterwave account. Payment amount/currency are always
 * recomputed server-side, never trusted from the client.
 */
export const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP', 'NGN', 'GHS', 'KES', 'ZAR'] as const
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

/**
 * Verifies a Flutterwave transaction response against the values WE expect.
 * Amount/currency/email are validated server-side so a tampered client cannot
 * mark a payment successful.
 */
export const isValidFlutterwaveResponse = (
  response: unknown,
  transactionReference: string,
  expectedAmount: number,
  expectedCurrency: string,
  expectedEmail: string,
) => {
  const root = response as { status?: string; data?: Record<string, unknown> }
  const data = root?.data
  const customer = data?.customer as { email?: string } | undefined
  return (
    root?.status === 'success' &&
    data?.status === 'successful' &&
    data.tx_ref === transactionReference &&
    data.currency === expectedCurrency &&
    Number(data.amount) >= expectedAmount &&
    customer?.email?.toLowerCase() === expectedEmail.toLowerCase()
  )
}
