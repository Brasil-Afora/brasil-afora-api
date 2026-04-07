import { addFavoriteCollegeList as addFavoriteCollegeListFunction } from "@/functions/add-favorite-college-list"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const addFavoriteCollegeList = new Hono().post(
  "/college-lists/:id/favorite",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const id = c.req.param("id")

    const { success } = await addFavoriteCollegeListFunction({
      userId: user.id,
      collegeListId: id,
    })

    if (!success) {
      return c.json(
        { message: "Failed to add college list to favorites." },
        500
      )
    }

    return c.json({ message: "College list added to favorites." }, 200)
  }
)
