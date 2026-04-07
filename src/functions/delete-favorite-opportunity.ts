import { and, eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type DeleteFavoriteOpportunityParams = {
  userId: string
  opportunityId: string
}

export async function deleteFavoriteOpportunity({
  userId,
  opportunityId,
}: DeleteFavoriteOpportunityParams) {
  try {
    await db
      .delete(schema.favoriteOpportunities)
      .where(
        and(
          eq(schema.favoriteOpportunities.userId, userId),
          eq(schema.favoriteOpportunities.opportunityId, opportunityId)
        )
      )

    return { success: true }
  } catch {
    return { success: false }
  }
}
