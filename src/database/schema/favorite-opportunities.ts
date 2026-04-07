import { defineRelations } from "drizzle-orm"
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core"
import { opportunities } from "@/database/schema/opportunities"
import { users } from "@/database/schema/users"

export const favoriteOpportunities = pgTable(
  "favorite_opportunities",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    opportunityId: uuid("opportunity_id")
      .notNull()
      .references(() => opportunities.id),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.opportunityId] })]
)

export const favoriteOpportunitiesRelations = defineRelations(
  { users, opportunities, favoriteOpportunities },
  (r) => ({
    users: {
      favoriteOpportunities: r.many.opportunities({
        from: r.users.id.through(r.favoriteOpportunities.userId),
        to: r.opportunities.id.through(r.favoriteOpportunities.opportunityId),
      }),
    },
    opportunities: {
      favoritedBy: r.many.users(),
    },
  })
)
