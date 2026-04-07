import { deleteFavoriteCollegeList as deleteFavoriteCollegeListFunction } from "@/functions/delete-favorite-college-list"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const deleteFavoriteCollegeList = new Hono().delete(
  "/college-lists/:id/favorite",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const id = c.req.param("id")

    const { success } = await deleteFavoriteCollegeListFunction({
      userId: user.id,
      collegeListId: id,
    })

    if (!success) {
      return c.json(
        { message: "Failed to remove college list from favorites." },
        500
      )
    }

    return c.json({ message: "College list removed from favorites." }, 200)
  }
)
