import { defineConfig } from "drizzle-kit"
import { env } from "@/lib/env"

export default defineConfig({
  schema: "./src/database/schema/**",
  out: "./src/database/migrations",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
