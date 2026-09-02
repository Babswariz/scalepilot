import { PrismaClient } from '@prisma/client'
import { getCatalogService } from '@/lib/service-catalog'

export const PAYMENT_CURRENCY = 'EUR'

export const getPaymentPlan = (planId: unknown) => getCatalogService(planId)

export const getFlutterwaveKeys = () => ({
  publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY,
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
})

export const isValidFlutterwaveResponse = (
  response: unknown,
  transactionReference: string,
  expectedAmount: number,
  expectedEmail: string,
) => {
  const root = response as { status?: string; data?: Record<string, unknown> }
  const data = root?.data
  const customer = data?.customer as { email?: string } | undefined
  return root?.status === 'success' && data?.status === 'successful' && data.tx_ref === transactionReference && data.currency === PAYMENT_CURRENCY && Number(data.amount) >= expectedAmount && customer?.email?.toLowerCase() === expectedEmail.toLowerCase()
}

export const prisma = new PrismaClient()