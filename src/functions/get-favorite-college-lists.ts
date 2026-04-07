import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type GetFavoriteCollegeListsParams = {
  userId: string
}

export async function getFavoriteCollegeLists({
  userId,
}: GetFavoriteCollegeListsParams) {
  try {
    const rows = await db
      .select({ collegeList: schema.collegeLists })
      .from(schema.favoriteCollegeLists)
      .innerJoin(
        schema.collegeLists,
        eq(schema.favoriteCollegeLists.collegeListId, schema.collegeLists.id)
      )
      .where(eq(schema.favoriteCollegeLists.userId, userId))

    const collegeLists = rows.map((r) => r.collegeList)

    return { collegeLists, success: true as const }
  } catch {
    return { collegeLists: [], success: false as const }
  }
}
