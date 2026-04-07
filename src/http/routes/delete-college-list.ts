import { deleteCollegeList as deleteCollegeListFunction } from "@/functions/delete-college-list"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const deleteCollegeList = new Hono().delete(
  "/college-lists/:id",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    if (user.role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const id = c.req.param("id")
    const { success } = await deleteCollegeListFunction({ id })

    if (!success) {
      return c.json({ message: "Failed to delete college list." }, 500)
    }

    return c.json({ message: "College list deleted successfully." }, 200)
  }
)
