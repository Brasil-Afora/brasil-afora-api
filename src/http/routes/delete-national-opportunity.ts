import { Hono } from "hono"
import { deleteNationalOpportunity as deleteNationalOpportunityFunction } from "@/functions/delete-national-opportunity"
import { authMiddleware } from "@/http/middleware/auth"

export const deleteNationalOpportunity = new Hono().delete(
  "/opportunities/:id",
  authMiddleware,
  async (c) => {
    const user = c.var.user

    if (user.role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const id = c.req.param("id")
    const { success } = await deleteNationalOpportunityFunction({ id })

    if (!success) {
      return c.json({ message: "Failed to delete national opportunity." }, 500)
    }

    return c.json(
      { message: "National opportunity deleted successfully." },
      200
    )
  }
)
