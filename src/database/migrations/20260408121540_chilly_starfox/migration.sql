ALTER TABLE "favorite_college_lists" DROP CONSTRAINT "favorite_college_lists_college_list_id_college_lists_id_fkey";--> statement-breakpoint
DROP TABLE "college_lists";--> statement-breakpoint
DROP TABLE "favorite_college_lists";--> statement-breakpoint
ALTER TABLE "opportunities" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "national_opportunities" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();