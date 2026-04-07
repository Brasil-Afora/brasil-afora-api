import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type DeleteOpportunityParams = {
  id: string
}

export async function deleteOpportunity({ id }: DeleteOpportunityParams) {
  try {
    await db.delete(schema.opportunities).where(eq(schema.opportunities.id, id))

    return { success: true }
  } catch {
    return { success: false }
  }
}
