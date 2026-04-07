import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type DeleteNationalOpportunityParams = {
  id: string
}

export async function deleteNationalOpportunity({
  id,
}: DeleteNationalOpportunityParams) {
  try {
    await db
      .delete(schema.nationalOpportunities)
      .where(eq(schema.nationalOpportunities.id, id))

    return { success: true }
  } catch {
    return { success: false }
  }
}
