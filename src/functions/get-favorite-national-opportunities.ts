import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type GetFavoriteNationalOpportunitiesParams = {
  userId: string
}

export async function getFavoriteNationalOpportunities({
  userId,
}: GetFavoriteNationalOpportunitiesParams) {
  try {
    const rows = await db
      .select({ nationalOpportunity: schema.nationalOpportunities })
      .from(schema.favoriteNationalOpportunities)
      .innerJoin(
        schema.nationalOpportunities,
        eq(
          schema.favoriteNationalOpportunities.nationalOpportunityId,
          schema.nationalOpportunities.id
        )
      )
      .where(eq(schema.favoriteNationalOpportunities.userId, userId))

    const nationalOpportunities = rows.map((r) => r.nationalOpportunity)

    return { nationalOpportunities, success: true as const }
  } catch {
    return { nationalOpportunities: [], success: false as const }
  }
}
