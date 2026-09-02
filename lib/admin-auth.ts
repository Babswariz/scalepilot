const COOKIE_NAME = 'admin_token'
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

const toBase64Url = (bytes: Uint8Array) => {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  const binary = atob(padded)
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

const getSecret = () => process.env.ADMIN_PASSWORD || ''

const sign = async (payload: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  return toBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))))
}

export const createAdminToken = async () => {
  const payload = `${Date.now()}:${crypto.randomUUID()}`
  return `${payload}.${await sign(payload)}`
}

export const isValidAdminToken = async (token?: string) => {
  if (!token || !getSecret()) return false

  const separator = token.lastIndexOf('.')
  if (separator < 1) return false

  const payload = token.slice(0, separator)
  const signature = token.slice(separator + 1)
  const timestamp = Number(payload.split(':')[0])

  if (!Number.isFinite(timestamp) || Date.now() - timestamp > TOKEN_MAX_AGE_SECONDS * 1000) {
    return false
  }

  const expectedSignature = await sign(payload)
  const expectedBytes = fromBase64Url(expectedSignature)
  const actualBytes = fromBase64Url(signature)

  if (expectedBytes.length !== actualBytes.length) return false
  return expectedBytes.every((byte, index) => byte === actualBytes[index])
}

export { COOKIE_NAME, TOKEN_MAX_AGE_SECONDS }
