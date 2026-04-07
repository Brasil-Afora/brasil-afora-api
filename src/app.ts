import { addFavoriteCollegeList } from "@/http/routes/add-favorite-college-list"
import { addFavoriteNationalOpportunity } from "@/http/routes/add-favorite-national-opportunity"
import { addFavoriteOpportunity } from "@/http/routes/add-favorite-opportunity"
import { createCollegeList } from "@/http/routes/create-college-list"
import { createNationalOpportunity } from "@/http/routes/create-national-opportunity"
import { createOpportunity } from "@/http/routes/create-opportunity"
import { deleteCollegeList } from "@/http/routes/delete-college-list"
import { deleteFavoriteCollegeList } from "@/http/routes/delete-favorite-college-list"
import { deleteFavoriteNationalOpportunity } from "@/http/routes/delete-favorite-national-opportunity"
import { deleteFavoriteOpportunity } from "@/http/routes/delete-favorite-opportunity"
import { deleteNationalOpportunity } from "@/http/routes/delete-national-opportunity"
import { deleteOpportunity } from "@/http/routes/delete-opportunity"
import { getCollegeLists } from "@/http/routes/get-college-lists"
import { getFavoriteCollegeLists } from "@/http/routes/get-favorite-college-lists"
import { getFavoriteNationalOpportunities } from "@/http/routes/get-favorite-national-opportunities"
import { getFavoriteOpportunities } from "@/http/routes/get-favorite-opportunities"
import { getNationalOpportunities } from "@/http/routes/get-national-opportunities"
import { getOpportunities } from "@/http/routes/get-opportunities"
import { updateCollegeList } from "@/http/routes/update-college-list"
import { updateNationalOpportunity } from "@/http/routes/update-national-opportunity"
import { updateOpportunity } from "@/http/routes/update-opportunity"
import { auth } from "@/lib/auth"
import { env } from "@/lib/env"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()
const allowedOrigins = env.CORS_ORIGIN

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) {
        return
      }

      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return origin
      }

      return
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
)

app.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))

app.get("/health", (c) => c.text("ok"))

app.route("/", createOpportunity)
app.route("/", getOpportunities)
app.route("/", updateOpportunity)
app.route("/", deleteOpportunity)
app.route("/", addFavoriteOpportunity)
app.route("/", deleteFavoriteOpportunity)
app.route("/", getFavoriteOpportunities)

app.route("/", createCollegeList)
app.route("/", getCollegeLists)
app.route("/", updateCollegeList)
app.route("/", deleteCollegeList)
app.route("/", addFavoriteCollegeList)
app.route("/", getFavoriteCollegeLists)
app.route("/", deleteFavoriteCollegeList)

app.route("/", createNationalOpportunity)
app.route("/", getNationalOpportunities)
app.route("/", updateNationalOpportunity)
app.route("/", deleteNationalOpportunity)
app.route("/", addFavoriteNationalOpportunity)
app.route("/", getFavoriteNationalOpportunities)
app.route("/", deleteFavoriteNationalOpportunity)

export default app
