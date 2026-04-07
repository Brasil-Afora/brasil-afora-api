import { getFavoriteCollegeLists as getFavoriteCollegeListsFunction } from "@/functions/get-favorite-college-lists"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const getFavoriteCollegeLists = new Hono().get(
  "/college-lists/favorites",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    const { collegeLists, success } = await getFavoriteCollegeListsFunction({
      userId: user.id,
    })

    if (!success) {
      return c.json({ message: "Failed to fetch favorite college lists." }, 500)
    }

    return c.json({ collegeLists }, 200)
  }
)
