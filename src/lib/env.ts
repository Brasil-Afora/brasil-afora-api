/** biome-ignore-all lint/style/useNamingConvention: Enviroment Variables are uppercase */
import z from "zod"

const envSchema = z.object({
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),
  DATABASE_URL: z.url().startsWith("postgresql://"),
  RESEND_API_KEY: z.string(),
  PORT: z.coerce.number().default(3333),
  CORS_ORIGIN: z
    .string()
    .default("http://localhost:3000")
    .transform((val) => val.split(",")),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
})

export const env = envSchema.parse(process.env)
