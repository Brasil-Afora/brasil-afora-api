import { createOpportunity as createOpportunityFunction } from "@/functions/create-opportunity"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const createOpportunity = new Hono().post(
  "/opportunities",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const { role } = user

    if (role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const body = await c.req.json()
    const { success } = await createOpportunityFunction({
      name: body.name,
      image: body.image,
      country: body.country,
      city: body.city,
      responsibleInstitution: body.responsibleInstitution,
      type: body.type,
      description: body.description,
      educationLevel: body.educationLevel,
      ageRange: body.ageRange,
      languageRequirements: body.languageRequirements,
      specificRequirements: body.specificRequirements,
      applicationFee: body.applicationFee,
      scholarshipType: body.scholarshipType,
      scholarshipCoverage: body.scholarshipCoverage,
      extraCosts: body.extraCosts,
      duration: body.duration,
      applicationDeadline: body.applicationDeadline,
      selectionSteps: body.selectionSteps,
      applicationProcess: body.applicationProcess,
      officialLink: body.officialLink,
      contact: body.contact,
    })

    if (!success) {
      return c.json({ message: "Failed to create opportunity." }, 500)
    }

    return c.json({ message: "Opportunity created successfully." }, 201)
  }
)
