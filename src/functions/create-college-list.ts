import db from "@/database/client"
import { schema } from "@/database/schema"

type CreateCollegeListParams = {
  officialLink: string
  name: string
  acronym: string
  state: string
  city: string
  setting: string
  nationalRanking: number | null | undefined
  acceptanceRate: number | null | undefined
  satRange: string | null | undefined
  actRange: string | null | undefined
  graduationRate4Years: number | null | undefined
  medianSalary6Years: number | null | undefined
  tuition: number | null | undefined
  roomBoard: number | null | undefined
  averageCostAfterAid: number | null | undefined
  averageNeedBasedAidPackage: number | null | undefined
  financialPolicy: string | null | undefined
  proficiencyTests: string | null | undefined
  totalStudents: number | null | undefined
  internationalPercentage: number | null | undefined
  mainMajors: string | null | undefined
  applicationFee: number | null | undefined
  applicationPlatform: string | null | undefined
  applicationTypes: string | null | undefined
  contact: string | null | undefined
}

export async function createCollegeList({
  officialLink,
  name,
  acronym,
  state,
  city,
  setting,
  nationalRanking,
  acceptanceRate,
  satRange,
  actRange,
  graduationRate4Years,
  medianSalary6Years,
  tuition,
  roomBoard,
  averageCostAfterAid,
  averageNeedBasedAidPackage,
  financialPolicy,
  proficiencyTests,
  totalStudents,
  internationalPercentage,
  mainMajors,
  applicationFee,
  applicationPlatform,
  applicationTypes,
  contact,
}: CreateCollegeListParams) {
  try {
    await db.insert(schema.collegeLists).values({
      officialLink,
      name,
      acronym,
      state,
      city,
      setting,
      nationalRanking,
      acceptanceRate,
      satRange,
      actRange,
      graduationRate4Years,
      medianSalary6Years,
      tuition,
      roomBoard,
      averageCostAfterAid,
      averageNeedBasedAidPackage,
      financialPolicy,
      proficiencyTests,
      totalStudents,
      internationalPercentage,
      mainMajors,
      applicationFee,
      applicationPlatform,
      applicationTypes,
      contact,
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}
