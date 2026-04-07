import db from "@/database/client"
import { schema } from "@/database/schema"

export async function getCollegeLists() {
  try {
    const collegeLists = await db.select().from(schema.collegeLists)

    return { collegeLists, success: true }
  } catch {
    return { collegeLists: [], success: false }
  }
}
