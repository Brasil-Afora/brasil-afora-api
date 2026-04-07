import { getCollegeLists as getCollegeListsFunction } from "@/functions/get-college-lists"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const getCollegeLists = new Hono().get(
  "/college-lists",
  authMiddleware,
  async (c) => {
    const { collegeLists, success } = await getCollegeListsFunction()

    if (!success) {
      return c.json({ message: "Failed to fetch college lists." }, 500)
    }

    return c.json({ collegeLists }, 200)
  }
)
