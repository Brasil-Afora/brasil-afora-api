import { deleteOpportunity as deleteOpportunityFunction } from "@/functions/delete-opportunity"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const deleteOpportunity = new Hono().delete(
  "/opportunities/:id",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    if (user.role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const id = c.req.param("id")
    const { success } = await deleteOpportunityFunction({ id })

    if (!success) {
      return c.json({ message: "Failed to delete opportunity." }, 500)
    }

    return c.json({ message: "Opportunity deleted successfully." }, 200)
  }
)
