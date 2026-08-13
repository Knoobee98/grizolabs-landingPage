CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "complaints_priority_idx" ON "complaints" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "complaints_category_idx" ON "complaints" USING btree ("category");--> statement-breakpoint
CREATE INDEX "leads_lead_type_idx" ON "leads" USING btree ("lead_type");--> statement-breakpoint
CREATE INDEX "leads_contact_name_idx" ON "leads" USING btree ("contact_name");--> statement-breakpoint
CREATE INDEX "projects_client_name_idx" ON "projects" USING btree ("client_name");--> statement-breakpoint
CREATE INDEX "projects_live_status_idx" ON "projects" USING btree ("live_status");