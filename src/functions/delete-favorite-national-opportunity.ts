import { and, eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type DeleteFavoriteNationalOpportunityParams = {
  userId: string
  nationalOpportunityId: string
}

export async function deleteFavoriteNationalOpportunity({
  userId,
  nationalOpportunityId,
}: DeleteFavoriteNationalOpportunityParams) {
  try {
    await db
      .delete(schema.favoriteNationalOpportunities)
      .where(
        and(
          eq(schema.favoriteNationalOpportunities.userId, userId),
          eq(
            schema.favoriteNationalOpportunities.nationalOpportunityId,
            nationalOpportunityId
          )
        )
      )

    return { success: true }
  } catch {
    return { success: false }
  }
}
