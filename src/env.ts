import { z } from "zod";

 const envSchema = z.object({
   PORT: z.coerce.number().default(8080),
   JWT_SECRET: z.string(),
   COOKIE_SECRET: z.string(),
   DATABASE_URL: z.string().url(),
   CLOUDFLARE_BUCKET_NAME:z.string(),
   CLOUDFLARE_REGION:z.string(),
   CLOUDFLARE_ACCOUNT_ID:z.string(),
   CLOUDFLARE_ACCESS_KEY:z.string(),
   CLOUDFLARE_SECRET_KEY:z.string(),
 })

const _env = envSchema.safeParse(process.env)

if(!_env.success) throw new Error('Environment variable error')

export const env = _env.data