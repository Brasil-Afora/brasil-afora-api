import type { MiddlewareHandler } from "hono"
import { auth } from "@/lib/auth"

declare module "hono" {
  // biome-ignore lint: Hono module augmentation relies on interface merging.
  interface ContextVariableMap {
    user: typeof auth.$Infer.Session.user
    session: typeof auth.$Infer.Session.session
  }
}

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    return c.json({ message: "Unauthorized." }, 401)
  }

  c.set("user", session.user)
  c.set("session", session.session)

  await next()
}
