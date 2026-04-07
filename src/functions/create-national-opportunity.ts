import db from "@/database/client"
import { schema } from "@/database/schema"

type CreateNationalOpportunityParams = {
  name: string
  image: string
  country: string
  type: string
  educationLevel: string
  modality: string
  applicationDeadline: string
  about: string
  shortDescription: string
  duration: string
  cityState: string
  ageRange: string
  requirements: string
  specificRequirements: string
  responsibleInstitution: string
  applicationFee: string
  benefits: string
  costs: string
  extraCosts: string
  selectionSteps: string
  officialLink: string
  contact: string
}

export async function createNationalOpportunity({
  name,
  image,
  country,
  type,
  educationLevel,
  modality,
  applicationDeadline,
  about,
  shortDescription,
  duration,
  cityState,
  ageRange,
  requirements,
  specificRequirements,
  responsibleInstitution,
  applicationFee,
  benefits,
  costs,
  extraCosts,
  selectionSteps,
  officialLink,
  contact,
}: CreateNationalOpportunityParams) {
  try {
    await db.insert(schema.nationalOpportunities).values({
      name,
      image,
      country,
      type,
      educationLevel,
      modality,
      applicationDeadline,
      about,
      shortDescription,
      duration,
      cityState,
      ageRange,
      requirements,
      specificRequirements,
      responsibleInstitution,
      applicationFee,
      benefits,
      costs,
      extraCosts,
      selectionSteps,
      officialLink,
      contact,
    })

    return { success: true }
  } catch {
    return { success: false }
  }
}
