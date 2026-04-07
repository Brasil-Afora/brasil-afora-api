import { addFavoriteNationalOpportunity as addFavoriteNationalOpportunityFunction } from "@/functions/add-favorite-national-opportunity"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const addFavoriteNationalOpportunity = new Hono().post(
  "/national-opportunities/:id/favorite",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const id = c.req.param("id")

    const { success } = await addFavoriteNationalOpportunityFunction({
      userId: user.id,
      nationalOpportunityId: id,
    })

    if (!success) {
      return c.json(
        { message: "Failed to add national opportunity to favorites." },
        500
      )
    }

    return c.json({ message: "National opportunity added to favorites." }, 200)
  }
)
