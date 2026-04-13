import { Hono } from "hono"
import { updateOpportunity as updateOpportunityFunction } from "@/functions/update-opportunity"
import { authMiddleware } from "@/http/middleware/auth"

export const updateOpportunity = new Hono().put(
  "/opportunities/:id",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    if (user.role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const id = c.req.param("id")
    const body = await c.req.json()

    const { success } = await updateOpportunityFunction({ id, ...body })

    if (!success) {
      return c.json({ message: "Failed to update opportunity." }, 500)
    }

    return c.json({ message: "Opportunity updated successfully." }, 200)
  }
)
