import { defineRelations } from "drizzle-orm"
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core"
import { nationalOpportunities } from "@/database/schema/national-opportunities"
import { users } from "@/database/schema/users"

export const favoriteNationalOpportunities = pgTable(
  "favorite_national_opportunities",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    nationalOpportunityId: uuid("national_opportunity_id")
      .notNull()
      .references(() => nationalOpportunities.id),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.nationalOpportunityId] })]
)

export const favoriteNationalOpportunitiesRelations = defineRelations(
  { users, nationalOpportunities, favoriteNationalOpportunities },
  (r) => ({
    users: {
      favoriteNationalOpportunities: r.many.nationalOpportunities({
        from: r.users.id.through(r.favoriteNationalOpportunities.userId),
        to: r.nationalOpportunities.id.through(
          r.favoriteNationalOpportunities.nationalOpportunityId
        ),
      }),
    },
    nationalOpportunities: {
      favoritedBy: r.many.users(),
    },
  })
)
