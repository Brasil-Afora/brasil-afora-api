CREATE TABLE "college_list" (
	"id" uuid PRIMARY KEY NOT NULL,
	"official_link" text NOT NULL,
	"name" text NOT NULL,
	"acronym" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"setting" text NOT NULL,
	"national_ranking" integer,
	"acceptance_rate" real,
	"sat_range" text,
	"act_range" text,
	"graduation_rate_4_years" real,
	"median_salary_6_years" real,
	"tuition" real,
	"room_board" real,
	"average_cost_after_aid" real,
	"average_need_based_aid_package" real,
	"financial_policy" text,
	"proficiency_tests" text,
	"total_students" integer,
	"international_percentage" real,
	"main_majors" text,
	"application_fee" real,
	"application_platform" text,
	"application_types" text,
	"contact" text
);
--> statement-breakpoint
CREATE TABLE "opportunities" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"country" text NOT NULL,
	"city" text NOT NULL,
	"responsible_institution" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"education_level" text NOT NULL,
	"age_range" text NOT NULL,
	"language_requirements" text NOT NULL,
	"specific_requirements" text NOT NULL,
	"application_fee" text NOT NULL,
	"scholarship_type" text NOT NULL,
	"scholarship_coverage" text NOT NULL,
	"extra_costs" text NOT NULL,
	"duration" text NOT NULL,
	"application_deadline" date NOT NULL,
	"selection_steps" text NOT NULL,
	"application_process" text NOT NULL,
	"official_link" text NOT NULL,
	"contact" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;