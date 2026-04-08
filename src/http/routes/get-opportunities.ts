import { getOpportunities as getOpportunitiesFunction } from "@/functions/get-opportunities"
import { Hono } from "hono"

export const getOpportunities = new Hono().get("/opportunities", async (c) => {
  const { opportunities, success } = await getOpportunitiesFunction()

  if (!success) {
    return c.json({ message: "Failed to fetch opportunities." }, 500)
  }

  return c.json({ opportunities }, 200)
})
