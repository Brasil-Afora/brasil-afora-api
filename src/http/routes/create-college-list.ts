import { createCollegeList as createCollegeListFunction } from "@/functions/create-college-list"
import { authMiddleware } from "@/http/middleware/auth"
import { Hono } from "hono"

export const createCollegeList = new Hono().post(
  "/college-lists",
  authMiddleware,
  async (c) => {
    const user = c.var.user
    const { role } = user

    if (role !== "admin") {
      return c.json({ message: "Forbidden." }, 403)
    }

    const body = await c.req.json()
    const { success } = await createCollegeListFunction({
      officialLink: body.officialLink,
      name: body.name,
      acronym: body.acronym,
      state: body.state,
      city: body.city,
      setting: body.setting,
      nationalRanking: body.nationalRanking,
      acceptanceRate: body.acceptanceRate,
      satRange: body.satRange,
      actRange: body.actRange,
      graduationRate4Years: body.graduationRate4Years,
      medianSalary6Years: body.medianSalary6Years,
      tuition: body.tuition,
      roomBoard: body.roomBoard,
      averageCostAfterAid: body.averageCostAfterAid,
      averageNeedBasedAidPackage: body.averageNeedBasedAidPackage,
      financialPolicy: body.financialPolicy,
      proficiencyTests: body.proficiencyTests,
      totalStudents: body.totalStudents,
      internationalPercentage: body.internationalPercentage,
      mainMajors: body.mainMajors,
      applicationFee: body.applicationFee,
      applicationPlatform: body.applicationPlatform,
      applicationTypes: body.applicationTypes,
      contact: body.contact,
    })

    if (!success) {
      return c.json({ message: "Failed to create college list." }, 500)
    }

    return c.json({ message: "College list created successfully." }, 201)
  }
)
