import { getNationalOpportunities as getNationalOpportunitiesFunction } from "@/functions/get-national-opportunities"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const getNationalOpportunities = new Hono().get(
  "/national-opportunities",
  authMiddleware,
  async (c) => {
    const { nationalOpportunities, success } =
      await getNationalOpportunitiesFunction()

    if (!success) {
      return c.json({ message: "Failed to fetch national opportunities." }, 500)
    }

    return c.json({ nationalOpportunities }, 200)
  }
)
