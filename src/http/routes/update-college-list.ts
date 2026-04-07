import { updateCollegeList as updateCollegeListFunction } from "@/functions/update-college-list"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const updateCollegeList = new Hono().put(
  "/college-lists/:id",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    if (user.role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const id = c.req.param("id")
    const body = await c.req.json()

    const { success } = await updateCollegeListFunction({ id, ...body })

    if (!success) {
      return c.json({ message: "Failed to update college list." }, 500)
    }

    return c.json({ message: "College list updated successfully." }, 200)
  }
)
