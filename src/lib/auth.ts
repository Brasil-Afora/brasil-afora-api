import db from "@/database/client"
import { env } from "@/lib/env"
import { sendEmail } from "@/mail/client"
import { ResetPasswordTemplate } from "@/mail/templates/reset-password-template"
import { VerificationEmailTemplate } from "@/mail/templates/verification-email-template"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { hashPassword, verifyPassword } from "better-auth/crypto"
import { admin, openAPI } from "better-auth/plugins"

const trustedOrigins = Array.from(
  new Set([env.BETTER_AUTH_URL, ...env.CORS_ORIGIN])
)

export const auth = betterAuth({
  // biome-ignore lint/style/useNamingConvention: Better Auth config key uses this casing.
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/auth",

  trustedOrigins,

  database: drizzleAdapter(db, {
    provider: "pg",
    camelCase: false,
    usePlural: true,
  }),

  advanced: {
    database: {
      generateId: false,
    },
    useSecureCookies: true,
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    password: {
      hash: (password) => hashPassword(password),
      verify: ({ password, hash }) => verifyPassword({ password, hash }),
    },
    resetPasswordTokenExpiresIn: 60 * 60, // 1h,
    sendResetPassword: async ({ url, user }) => {
      await sendEmail({
        to: user.email,
        subject: "Redefinição de senha",
        content: ResetPasswordTemplate({
          url,
          name: user.name,
        }),
      })
    },
    revokeSessionsOnPasswordReset: true,
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24, // 24h
    sendOnSignUp: true,
    sendOnSignIn: false,
    sendVerificationEmail: async ({ url, user }) => {
      await sendEmail({
        to: user.email,
        subject: "Verifique seu email",
        content: VerificationEmailTemplate({
          url,
          name: user.name,
        }),
      })
    },
  },

  socialProviders: {
    google: {
      enabled: true,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7d
    cookieCache: {
      enabled: env.NODE_ENV === "production",
      maxAge: 60 * 5, // 5m
    },
  },

  plugins: [openAPI(), admin()],
})
