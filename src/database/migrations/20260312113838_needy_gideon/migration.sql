CREATE TABLE "favorite_opportunities" (
	"user_id" uuid,
	"opportunity_id" uuid,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "favorite_opportunities_pkey" PRIMARY KEY("user_id","opportunity_id")
);
--> statement-breakpoint
ALTER TABLE "favorite_opportunities" ADD CONSTRAINT "favorite_opportunities_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "favorite_opportunities" ADD CONSTRAINT "favorite_opportunities_opportunity_id_opportunities_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunities"("id");