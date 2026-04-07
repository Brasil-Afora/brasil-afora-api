import db from "@/database/client"
import { schema } from "@/database/schema"

export async function getNationalOpportunities() {
  try {
    const nationalOpportunities = await db
      .select()
      .from(schema.nationalOpportunities)

    return { nationalOpportunities, success: true }
  } catch {
    return { nationalOpportunities: [], success: false }
  }
}
