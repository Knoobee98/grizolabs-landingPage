CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"action" text NOT NULL,
	"username" text,
	"ip" text,
	"success" boolean DEFAULT false NOT NULL,
	"detail" text
);
--> statement-breakpoint
CREATE TABLE "complaints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticket_code" text NOT NULL,
	"client_name" text NOT NULL,
	"project_name" text NOT NULL,
	"date" text,
	"category" text NOT NULL,
	"priority" text NOT NULL,
	"status" text DEFAULT 'Open' NOT NULL,
	"subject" text NOT NULL,
	"description" text NOT NULL,
	"admin_response" text,
	"resolved_at" text,
	"reported_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "complaints_ticket_code_unique" UNIQUE("ticket_code")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_type" text NOT NULL,
	"business_name" text,
	"contact_name" text,
	"whatsapp" text,
	"email" text,
	"channel" text,
	"preferred_date" text,
	"preferred_time" text,
	"notes" text,
	"source_data" jsonb,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_code" text NOT NULL,
	"client_name" text NOT NULL,
	"project_name" text NOT NULL,
	"package" text,
	"status" text DEFAULT 'In Progress' NOT NULL,
	"progress_percent" integer DEFAULT 0 NOT NULL,
	"start_date" text,
	"target_date" text,
	"lead_architect" text,
	"budget_idr" text,
	"current_milestone" text,
	"milestones_completed" integer DEFAULT 0 NOT NULL,
	"milestones_total" integer DEFAULT 0 NOT NULL,
	"contact_phone" text,
	"notes" text,
	"live_url" text,
	"live_status" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_project_code_unique" UNIQUE("project_code")
);
--> statement-breakpoint
CREATE INDEX "audit_logs_timestamp_idx" ON "audit_logs" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "complaints_status_idx" ON "complaints" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "projects_status_idx" ON "projects" USING btree ("status");