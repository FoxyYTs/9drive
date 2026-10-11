import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  APP_PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  TOKEN_ENCRYPTION_KEY: z.string().min(32),
  ACCESS_TOKEN_TTL_SECONDS: z.coerce.number().default(900),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(30),
  MAX_UPLOAD_BYTES: z.coerce.number().default(5 * 1024 * 1024 * 1024),
  RECAPTCHA_SECRET_KEY: z.string().optional(),
  // Comma-separated emails. Admins manage global settings; only admins and allowed emails can create accounts.
  ADMIN_EMAILS: z.string().default(''),
  ALLOWED_EMAILS: z.string().default(''),
})

const emailList = (value: string) => value.split(',').map((email) => email.trim().toLowerCase()).filter(Boolean)

const parsed = envSchema.parse(process.env)

export const env = {
  ...parsed,
  ADMIN_EMAILS: emailList(parsed.ADMIN_EMAILS),
  ALLOWED_EMAILS: emailList(parsed.ALLOWED_EMAILS),
}

if (env.ADMIN_EMAILS.length === 0) console.warn('[env] ADMIN_EMAILS is empty: nobody can register or manage global settings.')
