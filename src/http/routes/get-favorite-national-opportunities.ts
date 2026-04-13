import { Hono } from "hono"
import { getFavoriteNationalOpportunities as getFavoriteNationalOpportunitiesFunction } from "@/functions/get-favorite-national-opportunities"
import { authMiddleware } from "@/http/middleware/auth"

export const getFavoriteNationalOpportunities = new Hono().get(
  "/national-opportunities/favorites",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    const { nationalOpportunities, success } =
      await getFavoriteNationalOpportunitiesFunction({
        userId: user.id,
      })

    if (!success) {
      return c.json(
        { message: "Failed to fetch favorite national opportunities." },
        500
      )
    }

    return c.json({ nationalOpportunities }, 200)
  }
)
