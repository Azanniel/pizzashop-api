import { z } from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().url().min(1),
  AUTH_REDIRECT_URL: z.string().url().min(1),
  JWT_SECRET_KEY: z.string().min(1),
  DATABASE_URL: z.string().url().min(1),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:')
  console.error(_env.error.issues)

  process.exit()
}

export const env = _env.data
