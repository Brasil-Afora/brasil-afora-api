import { Hono } from "hono"
import { getFavoriteOpportunities as getFavoriteOpportunitiesFunction } from "@/functions/get-favorite-opportunities"
import { authMiddleware } from "@/http/middleware/auth"

export const getFavoriteOpportunities = new Hono().get(
  "/opportunities/favorites",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    const { opportunities, success } = await getFavoriteOpportunitiesFunction({
      userId: user.id,
    })

    if (!success) {
      return c.json({ message: "Failed to fetch favorite opportunities." }, 500)
    }

    return c.json({ opportunities }, 200)
  }
)
