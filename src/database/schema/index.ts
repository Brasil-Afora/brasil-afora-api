import { accounts } from "@/database/schema/accounts"
import { collegeLists } from "@/database/schema/college-lists"
import {
  favoriteCollegeLists,
  favoriteCollegeListsRelations,
} from "@/database/schema/favorite-college-lists"
import {
  favoriteNationalOpportunities,
  favoriteNationalOpportunitiesRelations,
} from "@/database/schema/favorite-national-opportunities"
import {
  favoriteOpportunities,
  favoriteOpportunitiesRelations,
} from "@/database/schema/favorite-opportunities"
import { opportunities } from "@/database/schema/opportunities"
import { nationalOpportunities } from "@/database/schema/national-opportunities"
import { sessions } from "@/database/schema/sessions"
import { users } from "@/database/schema/users"
import { verifications } from "@/database/schema/verifications"

export const schema = {
  opportunities,
  collegeLists,
  accounts,
  sessions,
  users,
  verifications,
  favoriteCollegeLists,
  favoriteCollegeListsRelations,
  favoriteOpportunities,
  favoriteOpportunitiesRelations,
  favoriteNationalOpportunities,
  favoriteNationalOpportunitiesRelations,
  nationalOpportunities,
}
