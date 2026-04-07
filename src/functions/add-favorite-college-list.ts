import db from "@/database/client"
import { schema } from "@/database/schema"

type AddFavoriteCollegeListParams = {
  userId: string
  collegeListId: string
}

export async function addFavoriteCollegeList({
  userId,
  collegeListId,
}: AddFavoriteCollegeListParams) {
  try {
    await db
      .insert(schema.favoriteCollegeLists)
      .values({ userId, collegeListId })
      .onConflictDoNothing()

    return { success: true }
  } catch {
    return { success: false }
  }
}
