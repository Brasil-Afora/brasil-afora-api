import { Hono } from "hono"
import { deleteFavoriteNationalOpportunity as deleteFavoriteNationalOpportunityFunction } from "@/functions/delete-favorite-national-opportunity"
import { authMiddleware } from "@/http/middleware/auth"

export const deleteFavoriteNationalOpportunity = new Hono().delete(
  "/opportunities/:id/favorite",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const id = c.req.param("id")

    const { success } = await deleteFavoriteNationalOpportunityFunction({
      userId: user.id,
      nationalOpportunityId: id,
    })

    if (!success) {
      return c.json(
        { message: "Failed to remove national opportunity from favorites." },
        500
      )
    }

    return c.json(
      { message: "National opportunity removed from favorites." },
      200
    )
  }
)
