import { accounts } from "@/database/schema/accounts"
import {
  favoriteNationalOpportunities,
  favoriteNationalOpportunitiesRelations,
} from "@/database/schema/favorite-national-opportunities"
import {
  favoriteOpportunities,
  favoriteOpportunitiesRelations,
} from "@/database/schema/favorite-opportunities"
import { nationalOpportunities } from "@/database/schema/national-opportunities"
import { opportunities } from "@/database/schema/opportunities"
import { sessions } from "@/database/schema/sessions"
import { users } from "@/database/schema/users"
import { verifications } from "@/database/schema/verifications"

export const schema = {
  opportunities,
  accounts,
  sessions,
  users,
  verifications,
  favoriteOpportunities,
  favoriteOpportunitiesRelations,
  favoriteNationalOpportunities,
  favoriteNationalOpportunitiesRelations,
  nationalOpportunities,
}
