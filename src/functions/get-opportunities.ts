import db from "@/database/client"
import { schema } from "@/database/schema"

export async function getOpportunities() {
  try {
    const opportunities = await db.select().from(schema.opportunities)

    return { opportunities, success: true }
  } catch {
    return { opportunities: [], success: false }
  }
}
