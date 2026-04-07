import { createNationalOpportunity as createNationalOpportunityFunction } from "@/functions/create-national-opportunity"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const createNationalOpportunity = new Hono().post(
  "/opportunities",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const { role } = user

    if (role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const body = await c.req.json()
    const { success } = await createNationalOpportunityFunction({
      name: body.name,
      image: body.image,
      country: body.country,
      type: body.type,
      educationLevel: body.educationLevel,
      modality: body.modality,
      applicationDeadline: body.applicationDeadline,
      about: body.about,
      shortDescription: body.shortDescription,
      duration: body.duration,
      cityState: body.cityState,
      ageRange: body.ageRange,
      requirements: body.requirements,
      specificRequirements: body.specificRequirements,
      responsibleInstitution: body.responsibleInstitution,
      applicationFee: body.applicationFee,
      benefits: body.benefits,
      costs: body.costs,
      extraCosts: body.extraCosts,
      selectionSteps: body.selectionSteps,
      officialLink: body.officialLink,
      contact: body.contact,
    })

    if (!success) {
      return c.json({ message: "Failed to create national opportunity." }, 500)
    }

    return c.json(
      { message: "National opportunity created successfully." },
      201
    )
  }
)
