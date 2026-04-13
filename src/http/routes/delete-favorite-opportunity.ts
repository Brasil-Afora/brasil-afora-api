import { Hono } from "hono"
import { deleteFavoriteOpportunity as deleteFavoriteOpportunityFunction } from "@/functions/delete-favorite-opportunity"
import { authMiddleware } from "@/http/middleware/auth"

export const deleteFavoriteOpportunity = new Hono().delete(
  "/opportunities/:id/favorite",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const id = c.req.param("id")

    const { success } = await deleteFavoriteOpportunityFunction({
      userId: user.id,
      opportunityId: id,
    })

    if (!success) {
      return c.json(
        { message: "Failed to remove opportunity from favorites." },
        500
      )
    }

    return c.json({ message: "Opportunity removed from favorites." }, 200)
  }
)
