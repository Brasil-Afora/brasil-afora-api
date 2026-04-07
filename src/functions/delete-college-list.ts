import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type DeleteCollegeListParams = {
  id: string
}

export async function deleteCollegeList({ id }: DeleteCollegeListParams) {
  try {
    await db.delete(schema.collegeLists).where(eq(schema.collegeLists.id, id))

    return { success: true }
  } catch {
    return { success: false }
  }
}
