import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type UpdatableOpportunityFields = Partial<
  Omit<
    typeof schema.opportunities.$inferInsert,
    "id" | "createdAt" | "updatedAt"
  >
>

type UpdateOpportunityParams = { id: string } & UpdatableOpportunityFields

export async function updateOpportunity({
  id,
  ...fields
}: UpdateOpportunityParams) {
  try {
    const updateData = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== undefined)
    ) as UpdatableOpportunityFields

    if (Object.keys(updateData).length === 0) {
      return { success: true }
    }

    await db
      .update(schema.opportunities)
      .set(updateData)
      .where(eq(schema.opportunities.id, id))

    return { success: true }
  } catch {
    return { success: false }
  }
}
