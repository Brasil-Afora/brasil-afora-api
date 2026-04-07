/** biome-ignore-all lint/suspicious/noConsole: Seed requires logs */

import db from "@/database/client"
import { collegeLists } from "@/database/schema/college-lists"
import {
  nationalOpportunities,
  opportunities,
} from "@/database/schema/opportunities"
import { faker } from "@faker-js/faker"

const COLLEGE_LIST_COUNT = 20
const OPPORTUNITY_COUNT = 20
const NATIONAL_OPPORTUNITY_COUNT = 20

const SETTINGS = ["Urban", "Suburban", "Rural"] as const
const APPLICATION_PLATFORMS = [
  "Common App",
  "Coalition App",
  "Common App / Coalition App",
  "UC Application",
  "OUAC",
  "Institution Portal",
] as const
const OPPORTUNITY_TYPES = [
  "Scholarship",
  "Exchange",
  "Fellowship",
  "Internship",
  "Research Grant",
] as const
const EDUCATION_LEVELS = [
  "Undergraduate",
  "Graduate (Master's)",
  "Graduate / Postgraduate",
  "Doctoral",
  "Undergraduate / Graduate",
  "Undergraduate / Graduate / Doctoral",
] as const
const SCHOLARSHIP_TYPES = [
  "Full scholarship",
  "Partial scholarship",
  "Merit-based scholarship",
  "Need-based scholarship",
  "Full or partial scholarship",
] as const
const MAJORS = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Economics",
  "Political Science",
  "Biology",
  "Mathematics",
  "Physics",
  "Psychology",
  "History",
  "Philosophy",
  "Chemistry",
  "Civil Engineering",
  "Architecture",
  "Law",
  "Medicine",
  "Nursing",
  "Education",
  "Sociology",
] as const

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

function generateCollegeList(): typeof collegeLists.$inferInsert {
  const satLow = faker.number.int({ min: 1200, max: 1500 })
  const satHigh = satLow + faker.number.int({ min: 40, max: 120 })
  const actLow = faker.number.int({ min: 24, max: 34 })
  const actHigh = actLow + faker.number.int({ min: 1, max: 4 })
  const acronym = faker.helpers
    .multiple(() => faker.string.alpha({ length: 1, casing: "upper" }), {
      count: faker.number.int({ min: 2, max: 5 }),
    })
    .join("")

  return {
    name: `${faker.company.name()} University`,
    acronym,
    officialLink: faker.internet.url(),
    state: faker.location.state(),
    city: faker.location.city(),
    setting: faker.helpers.arrayElement(SETTINGS),
    nationalRanking: faker.number.int({ min: 1, max: 500 }),
    acceptanceRate: faker.number.float({ min: 2, max: 80, fractionDigits: 1 }),
    satRange: `${satLow}-${satHigh}`,
    actRange: `${actLow}-${actHigh}`,
    graduationRate4Years: faker.number.float({
      min: 40,
      max: 98,
      fractionDigits: 1,
    }),
    medianSalary6Years: faker.number.int({ min: 35_000, max: 120_000 }),
    tuition: faker.number.int({ min: 10_000, max: 70_000 }),
    roomBoard: faker.number.int({ min: 8000, max: 25_000 }),
    averageCostAfterAid: faker.number.int({ min: 5000, max: 45_000 }),
    averageNeedBasedAidPackage: faker.number.int({ min: 5000, max: 65_000 }),
    financialPolicy: faker.lorem.sentence(),
    proficiencyTests: faker.helpers.arrayElement([
      "TOEFL (min 80) or IELTS (min 6.5)",
      "TOEFL (min 90) or IELTS (min 7.0)",
      "TOEFL (min 100) or IELTS (min 7.0)",
      "TOEFL (min 100) or IELTS (min 7.5)",
    ]),
    totalStudents: faker.number.int({ min: 2000, max: 100_000 }),
    internationalPercentage: faker.number.float({
      min: 1,
      max: 30,
      fractionDigits: 1,
    }),
    mainMajors: faker.helpers
      .arrayElements(MAJORS, faker.number.int({ min: 4, max: 6 }))
      .join(", "),
    applicationFee: faker.number.int({ min: 0, max: 150 }),
    applicationPlatform: faker.helpers.arrayElement(APPLICATION_PLATFORMS),
    applicationTypes: faker.helpers
      .arrayElements(
        [
          "Early Action",
          "Early Decision I",
          "Early Decision II",
          "Restrictive Early Action",
          "Regular Decision",
        ],
        faker.number.int({ min: 1, max: 3 })
      )
      .join(", "),
    contact: faker.internet.email(),
  }
}

function generateOpportunity(): typeof opportunities.$inferInsert {
  const deadline = faker.date.future({ years: 2 })
  const deadlineStr = deadline.toISOString().slice(0, 10)
  const minAge = faker.number.int({ min: 17, max: 22 })
  const maxAge = faker.number.int({ min: 30, max: 45 })

  return {
    name: `${faker.company.buzzPhrase()} ${faker.helpers.arrayElement(["Scholarship", "Fellowship", "Award", "Grant", "Program"])}`,
    image: faker.image.url({
      width: 800,
      height: 600,
    }),
    country: faker.location.country(),
    city: faker.location.city(),
    responsibleInstitution: faker.company.name(),
    type: faker.helpers.arrayElement(OPPORTUNITY_TYPES),
    description: faker.lorem.paragraphs(2, " "),
    educationLevel: faker.helpers.arrayElement(EDUCATION_LEVELS),
    ageRange: `${minAge}-${maxAge}`,
    languageRequirements: faker.helpers.arrayElement([
      "English (B2) or equivalent",
      "English (C1); language of host country may be required",
      "IELTS 6.5 overall (no band below 5.5) or equivalent",
      "TOEFL (min 80) or IELTS (min 6.5)",
      "Depends on host country — B1/B2 in the teaching language",
    ]),
    specificRequirements: faker.lorem.sentence(),
    applicationFee: faker.helpers.arrayElement([
      "Free",
      `$${faker.number.int({ min: 20, max: 100 })}`,
    ]),
    scholarshipType: faker.helpers.arrayElement(SCHOLARSHIP_TYPES),
    scholarshipCoverage: faker.lorem.sentence(),
    extraCosts: faker.helpers.arrayElement([
      "Personal expenses",
      "Travel, accommodation, personal expenses",
      "Personal expenses only",
      "Rent if above stipend coverage",
    ]),
    duration: faker.helpers.arrayElement([
      "1 academic year",
      "1 year (master's degree)",
      "3-12 months per study period",
      "2 years",
      "Full duration of degree (1-4 years)",
      "4 years",
      `${faker.number.int({ min: 3, max: 24 })} months`,
    ]),
    applicationDeadline: deadlineStr,
    selectionSteps: faker.lorem.sentence(),
    applicationProcess: faker.lorem.paragraph(),
    officialLink: faker.internet.url(),
    contact: faker.internet.email(),
  }
}

function generateNationalOpportunity(): typeof nationalOpportunities.$inferInsert {
  const deadline = faker.date.future({ years: 2 })
  const deadlineStr = deadline.toISOString().slice(0, 10)
  const minAge = faker.number.int({ min: 16, max: 22 })
  const maxAge = faker.number.int({ min: 23, max: 45 })

  return {
    name: `${faker.company.buzzPhrase()} ${faker.helpers.arrayElement(["National Scholarship", "Training Program", "Grant", "Public Program", "Mobility Program"])}`,
    image: faker.image.url({ width: 800, height: 600 }),
    country: faker.helpers.arrayElement([
      "Brazil",
      "Argentina",
      "Mexico",
      "Chile",
      "Portugal",
      faker.location.country(),
    ]),
    type: faker.helpers.arrayElement(OPPORTUNITY_TYPES),
    educationLevel: faker.helpers.arrayElement(EDUCATION_LEVELS),
    modality: faker.helpers.arrayElement([
      "In-person",
      "Remote",
      "Hybrid",
      "Asynchronous online",
    ]),
    applicationDeadline: deadlineStr,
    about: faker.lorem.paragraphs(2, " "),
    shortDescription: faker.lorem.sentence(),
    duration: faker.helpers.arrayElement([
      "4 weeks",
      "8 weeks",
      "3 months",
      "6 months",
      "1 year",
      "2 years",
      `${faker.number.int({ min: 2, max: 18 })} months`,
    ]),
    cityState: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
    ageRange: `${minAge}-${maxAge}`,
    requirements: faker.helpers.arrayElement([
      "Valid ID and completed application form",
      "Proof of enrollment and resume",
      "Academic transcript and motivation letter",
      "Portfolio or prior experience documentation",
    ]),
    specificRequirements: faker.lorem.sentence(),
    responsibleInstitution: faker.company.name(),
    applicationFee: faker.helpers.arrayElement([
      "Free",
      `$${faker.number.int({ min: 10, max: 120 })}`,
    ]),
    benefits: faker.helpers.arrayElement([
      "Certificate and mentorship",
      "Monthly stipend and training",
      "Tuition waiver and study materials",
      "Transportation support and meal voucher",
    ]),
    costs: faker.helpers.arrayElement([
      "No participant cost",
      "Housing and food not included",
      "Some administrative costs may apply",
      "Participant covers personal expenses",
    ]),
    extraCosts: faker.helpers.arrayElement([
      "Personal expenses",
      "Travel costs",
      "Accommodation and local transport",
      "Optional insurance costs",
    ]),
    selectionSteps: faker.helpers.arrayElement([
      "Application screening, interview, final result",
      "Eligibility check, document review, shortlist",
      "Online test, interview, approval",
      "Document validation and final ranking",
    ]),
    officialLink: faker.internet.url(),
    contact: faker.internet.email(),
  }
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed() {
  const collegeListsData = faker.helpers.multiple(generateCollegeList, {
    count: COLLEGE_LIST_COUNT,
  })
  const opportunitiesData = faker.helpers.multiple(generateOpportunity, {
    count: OPPORTUNITY_COUNT,
  })
  const nationalOpportunitiesData = faker.helpers.multiple(
    generateNationalOpportunity,
    {
      count: NATIONAL_OPPORTUNITY_COUNT,
    }
  )

  console.log("Seeding college lists…")
  await db.insert(collegeLists).values(collegeListsData)
  console.log(`Inserted ${collegeListsData.length} college list entries.`)

  console.log("Seeding opportunities…")
  await db.insert(opportunities).values(opportunitiesData)
  console.log(`Inserted ${opportunitiesData.length} opportunity entries.`)

  console.log("Seeding national opportunities…")
  await db.insert(nationalOpportunities).values(nationalOpportunitiesData)
  console.log(
    `Inserted ${nationalOpportunitiesData.length} national opportunity entries.`
  )

  console.log("Done.")
  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
