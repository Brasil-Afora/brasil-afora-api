CREATE TABLE "favorite_national_opportunities" (
	"user_id" uuid,
	"national_opportunity_id" uuid,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "favorite_national_opportunities_pkey" PRIMARY KEY("user_id","national_opportunity_id")
);
--> statement-breakpoint
CREATE TABLE "national_opportunities" (
	"id" uuid PRIMARY KEY,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"country" text NOT NULL,
	"type" text NOT NULL,
	"education_level" text NOT NULL,
	"modality" text NOT NULL,
	"application_deadline" date NOT NULL,
	"about" text NOT NULL,
	"short_description" text NOT NULL,
	"duration" text NOT NULL,
	"city_state" text NOT NULL,
	"age_range" text NOT NULL,
	"requirements" text NOT NULL,
	"specific_requirements" text NOT NULL,
	"responsible_institution" text NOT NULL,
	"application_fee" text NOT NULL,
	"benefits" text NOT NULL,
	"costs" text NOT NULL,
	"extra_costs" text NOT NULL,
	"selection_steps" text NOT NULL,
	"official_link" text NOT NULL,
	"contact" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorite_national_opportunities" ADD CONSTRAINT "favorite_national_opportunities_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "favorite_national_opportunities" ADD CONSTRAINT "favorite_national_opportunities_W3MsJe4BLntX_fkey" FOREIGN KEY ("national_opportunity_id") REFERENCES "national_opportunities"("id");