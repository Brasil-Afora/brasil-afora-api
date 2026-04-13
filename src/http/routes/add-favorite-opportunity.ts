import { Hono } from "hono"
import { addFavoriteOpportunity as addFavoriteOpportunityFunction } from "@/functions/add-favorite-opportunity"
import { authMiddleware } from "@/http/middleware/auth"

export const addFavoriteOpportunity = new Hono().post(
  "/opportunities/:id/favorite",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const id = c.req.param("id")

    const { success } = await addFavoriteOpportunityFunction({
      userId: user.id,
      opportunityId: id,
    })

    if (!success) {
      return c.json({ message: "Failed to add opportunity to favorites." }, 500)
    }

    return c.json({ message: "Opportunity added to favorites." }, 200)
  }
)
