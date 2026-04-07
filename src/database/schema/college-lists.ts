import {
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const collegeLists = pgTable("college_lists", {
  id: uuid("id").primaryKey().defaultRandom(),
  officialLink: text("official_link").notNull(),
  name: text("name").notNull(),
  acronym: text("acronym").notNull(),
  state: text("state").notNull(),
  city: text("city").notNull(),
  setting: text("setting").notNull(),
  nationalRanking: integer("national_ranking"),
  acceptanceRate: real("acceptance_rate"),
  satRange: text("sat_range"),
  actRange: text("act_range"),
  graduationRate4Years: real("graduation_rate_4_years"),
  medianSalary6Years: real("median_salary_6_years"),
  tuition: real("tuition"),
  roomBoard: real("room_board"),
  averageCostAfterAid: real("average_cost_after_aid"),
  averageNeedBasedAidPackage: real("average_need_based_aid_package"),
  financialPolicy: text("financial_policy"),
  proficiencyTests: text("proficiency_tests"),
  totalStudents: integer("total_students"),
  internationalPercentage: real("international_percentage"),
  mainMajors: text("main_majors"),
  applicationFee: real("application_fee"),
  applicationPlatform: text("application_platform"),
  applicationTypes: text("application_types"),
  contact: text("contact"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
})
