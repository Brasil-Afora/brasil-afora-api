import { and, eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type DeleteFavoriteCollegeListParams = {
  userId: string
  collegeListId: string
}

export async function deleteFavoriteCollegeList({
  userId,
  collegeListId,
}: DeleteFavoriteCollegeListParams) {
  try {
    await db
      .delete(schema.favoriteCollegeLists)
      .where(
        and(
          eq(schema.favoriteCollegeLists.userId, userId),
          eq(schema.favoriteCollegeLists.collegeListId, collegeListId)
        )
      )

    return { success: true }
  } catch {
    return { success: false }
  }
}
