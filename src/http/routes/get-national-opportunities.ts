import { Hono } from "hono"
import { getNationalOpportunities as getNationalOpportunitiesFunction } from "@/functions/get-national-opportunities"

export const getNationalOpportunities = new Hono().get(
  "/national-opportunities",
  async (c) => {
    const { nationalOpportunities, success } =
      await getNationalOpportunitiesFunction()

    if (!success) {
      return c.json({ message: "Failed to fetch national opportunities." }, 500)
    }

    return c.json({ nationalOpportunities }, 200)
  }
)
