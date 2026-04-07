CREATE TABLE "favorite_college_lists" (
	"user_id" uuid,
	"college_list_id" uuid,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "favorite_college_lists_pkey" PRIMARY KEY("user_id","college_list_id")
);
--> statement-breakpoint
ALTER TABLE "favorite_college_lists" ADD CONSTRAINT "favorite_college_lists_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "favorite_college_lists" ADD CONSTRAINT "favorite_college_lists_college_list_id_college_lists_id_fkey" FOREIGN KEY ("college_list_id") REFERENCES "college_lists"("id");