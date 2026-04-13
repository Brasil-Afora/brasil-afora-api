import { Hono } from "hono"
import { updateNationalOpportunity as updateNationalOpportunityFunction } from "@/functions/update-national-opportunity"
import { authMiddleware } from "@/http/middleware/auth"

export const updateNationalOpportunity = new Hono().put(
  "/national-opportunities/:id",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    if (user.role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const id = c.req.param("id")
    const body = await c.req.json()

    const { success } = await updateNationalOpportunityFunction({ id, ...body })

    if (!success) {
      return c.json({ message: "Failed to update national opportunity." }, 500)
    }

    return c.json(
      { message: "National opportunity updated successfully." },
      200
    )
  }
)
