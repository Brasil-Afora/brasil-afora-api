import db from "@/database/client"
import { schema } from "@/database/schema"

type CreateOpportunityParams = {
  name: string
  image: string
  country: string
  city: string
  responsibleInstitution: string
  type: string
  description: string
  educationLevel: string
  ageRange: string
  languageRequirements: string
  specificRequirements: string
  applicationFee: string
  scholarshipType: string
  scholarshipCoverage: string
  extraCosts: string
  duration: string
  applicationDeadline: string
  selectionSteps: string
  applicationProcess: string
  officialLink: string
  contact: string
}

export async function createOpportunity({
  name,
  image,
  country,
  city,
  responsibleInstitution,
  type,
  description,
  educationLevel,
  ageRange,
  languageRequirements,
  specificRequirements,
  applicationFee,
  scholarshipType,
  scholarshipCoverage,
  extraCosts,
  duration,
  applicationDeadline,
  selectionSteps,
  applicationProcess,
  officialLink,
  contact,
}: CreateOpportunityParams) {
  try {
    await db.insert(schema.opportunities).values({
      name,
      image,
      country,
      city,
      responsibleInstitution,
      type,
      description,
      educationLevel,
      ageRange,
      languageRequirements,
      specificRequirements,
      applicationFee,
      scholarshipType,
      scholarshipCoverage,
      extraCosts,
      duration,
      applicationDeadline,
      selectionSteps,
      applicationProcess,
      officialLink,
      contact,
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}
