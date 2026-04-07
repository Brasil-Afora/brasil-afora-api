import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type UpdatableNationalOpportunityFields = Partial<
  Omit<
    typeof schema.nationalOpportunities.$inferInsert,
    "id" | "createdAt" | "updatedAt"
  >
>

type UpdateNationalOpportunityParams = {
  id: string
} & UpdatableNationalOpportunityFields

export async function updateNationalOpportunity({
  id,
  ...fields
}: UpdateNationalOpportunityParams) {
  try {
    const updateData = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== undefined)
    ) as UpdatableNationalOpportunityFields

    if (Object.keys(updateData).length === 0) {
      return { success: true }
    }

    await db
      .update(schema.nationalOpportunities)
      .set(updateData)
      .where(eq(schema.nationalOpportunities.id, id))

    return { success: true }
  } catch {
    return { success: false }
  }
}
