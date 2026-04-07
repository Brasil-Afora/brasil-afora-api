import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type UpdatableCollegeListFields = Partial<
  Omit<
    typeof schema.collegeLists.$inferInsert,
    "id" | "createdAt" | "updatedAt"
  >
>

type UpdateCollegeListParams = { id: string } & UpdatableCollegeListFields

export async function updateCollegeList({
  id,
  ...fields
}: UpdateCollegeListParams) {
  try {
    const updateData = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== undefined)
    ) as UpdatableCollegeListFields

    if (Object.keys(updateData).length === 0) {
      return { success: true }
    }

    await db
      .update(schema.collegeLists)
      .set(updateData)
      .where(eq(schema.collegeLists.id, id))

    return { success: true }
  } catch {
    return { success: false }
  }
}
