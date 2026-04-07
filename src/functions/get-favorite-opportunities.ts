import { eq } from "drizzle-orm"
import db from "@/database/client"
import { schema } from "@/database/schema"

type GetFavoriteOpportunitiesParams = {
  userId: string
}

export async function getFavoriteOpportunities({
  userId,
}: GetFavoriteOpportunitiesParams) {
  try {
    const rows = await db
      .select({ opportunity: schema.opportunities })
      .from(schema.favoriteOpportunities)
      .innerJoin(
        schema.opportunities,
        eq(schema.favoriteOpportunities.opportunityId, schema.opportunities.id)
      )
      .where(eq(schema.favoriteOpportunities.userId, userId))

    const opportunities = rows.map((r) => r.opportunity)

    return { opportunities, success: true as const }
  } catch {
    return { opportunities: [], success: false as const }
  }
}
