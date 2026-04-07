import db from "@/database/client"
import { schema } from "@/database/schema"

type AddFavoriteNationalOpportunityParams = {
  userId: string
  nationalOpportunityId: string
}

export async function addFavoriteNationalOpportunity({
  userId,
  nationalOpportunityId,
}: AddFavoriteNationalOpportunityParams) {
  try {
    await db
      .insert(schema.favoriteNationalOpportunities)
      .values({ userId, nationalOpportunityId })
      .onConflictDoNothing()

    return { success: true }
  } catch {
    return { success: false }
  }
}
