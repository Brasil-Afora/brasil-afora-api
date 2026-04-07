import db from "@/database/client"
import { schema } from "@/database/schema"

type AddFavoriteOpportunityParams = {
  userId: string
  opportunityId: string
}

export async function addFavoriteOpportunity({
  userId,
  opportunityId,
}: AddFavoriteOpportunityParams) {
  try {
    await db
      .insert(schema.favoriteOpportunities)
      .values({ userId, opportunityId })
      .onConflictDoNothing()

    return { success: true }
  } catch {
    return { success: false }
  }
}
