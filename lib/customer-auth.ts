import crypto from 'node:crypto'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/flutterwave'

export const SESSION_COOKIE = 'sp_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

// Stable server-only secret. Prefer a dedicated AUTH_SECRET, otherwise derive
// from DATABASE_URL (always present, server-only, never shipped to the client).
const getSecret = () => process.env.AUTH_SECRET || process.env.DATABASE_URL || ''

// ---------------------------------------------------------------------------
// Password hashing (scrypt) — format: scrypt$<saltHex>$<hashHex>
// ---------------------------------------------------------------------------
export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16)
  const derived = crypto.scryptSync(password, salt, 64)
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`
}

export const verifyPassword = (password: string, stored: string): boolean => {
  const parts = stored.split('$')
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false
  const salt = Buffer.from(parts[1], 'hex')
  const expected = Buffer.from(parts[2], 'hex')
  const derived = crypto.scryptSync(password, salt, expected.length)
  return expected.length === derived.length && crypto.timingSafeEqual(expected, derived)
}

// ---------------------------------------------------------------------------
// Session tokens — HMAC-signed "<userId>:<issuedAt>.<signature>"
// ---------------------------------------------------------------------------
const sign = (payload: string): string =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url')

export const createSessionToken = (userId: string): string => {
  const payload = `${userId}:${Date.now()}`
  return `${payload}.${sign(payload)}`
}

export const verifySessionToken = (token?: string): string | null => {
  if (!token || !getSecret()) return null
  const separator = token.lastIndexOf('.')
  if (separator < 1) return null

  const payload = token.slice(0, separator)
  const signature = token.slice(separator + 1)
  const expected = sign(payload)

  const expectedBytes = Buffer.from(expected)
  const actualBytes = Buffer.from(signature)
  if (expectedBytes.length !== actualBytes.length) return null
  if (!crypto.timingSafeEqual(expectedBytes, actualBytes)) return null

  const [userId, issuedAt] = payload.split(':')
  if (!userId || !issuedAt) return null
  if (Date.now() - Number(issuedAt) > SESSION_MAX_AGE_SECONDS * 1000) return null
  return userId
}

// ---------------------------------------------------------------------------
// Cookie + user helpers (server components / route handlers)
// ---------------------------------------------------------------------------
export const setSessionCookie = async (userId: string) => {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export const clearSessionCookie = async () => {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'none', path: '/', maxAge: 0 })
}

export type SessionUser = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

export const getSessionUserId = async (): Promise<string | null> => {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

export const getCurrentUser = async (): Promise<SessionUser | null> => {
  const userId = await getSessionUserId()
  if (!userId) return null
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })
  return user
}

export const SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS
