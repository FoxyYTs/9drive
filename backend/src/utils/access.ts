import { env } from '../config/env.js'

export function isAdminEmail(email: string) {
  return env.ADMIN_EMAILS.includes(email.trim().toLowerCase())
}

export function canRegisterEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  return env.ADMIN_EMAILS.includes(normalized) || env.ALLOWED_EMAILS.includes(normalized)
}
