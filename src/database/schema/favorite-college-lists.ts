import { defineRelations } from "drizzle-orm"
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core"
import { collegeLists } from "@/database/schema/college-lists"
import { users } from "@/database/schema/users"

export const favoriteCollegeLists = pgTable(
  "favorite_college_lists",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    collegeListId: uuid("college_list_id")
      .notNull()
      .references(() => collegeLists.id),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.collegeListId] })]
)

export const favoriteCollegeListsRelations = defineRelations(
  { users, collegeLists, favoriteCollegeLists },
  (r) => ({
    users: {
      favoriteCollegelists: r.many.collegeLists({
        from: r.users.id.through(r.favoriteCollegeLists.userId),
        to: r.collegeLists.id.through(r.favoriteCollegeLists.collegeListId),
      }),
    },
    collegeLists: {
      favoritedBy: r.many.users(),
    },
  })
)
