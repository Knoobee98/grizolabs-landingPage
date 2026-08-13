import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';

export const leads = pgTable(
  'leads',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    leadType: text('lead_type', { enum: ['consultation', 'diagnostic', 'prd'] }).notNull(),
    businessName: text('business_name'),
    contactName: text('contact_name'),
    whatsapp: text('whatsapp'),
    email: text('email'),
    channel: text('channel', { enum: ['whatsapp', 'meeting'] }),
    preferredDate: text('preferred_date'),
    preferredTime: text('preferred_time'),
    notes: text('notes'),
    sourceData: jsonb('source_data').$type<Record<string, unknown>>(),
    status: text('status', { enum: ['new', 'contacted', 'converted', 'closed'] })
      .notNull()
      .default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('leads_status_idx').on(table.status),
    index('leads_created_at_idx').on(table.createdAt),
    index('leads_lead_type_idx').on(table.leadType),
    index('leads_contact_name_idx').on(table.contactName),
  ]
);

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectCode: text('project_code').notNull().unique(),
    clientName: text('client_name').notNull(),
    projectName: text('project_name').notNull(),
    package: text('package'),
    status: text('status', { enum: ['In Progress', 'Under Review', 'Completed', 'On Hold'] })
      .notNull()
      .default('In Progress'),
    progressPercent: integer('progress_percent').notNull().default(0),
    startDate: text('start_date'),
    targetDate: text('target_date'),
    leadArchitect: text('lead_architect'),
    budgetIDR: text('budget_idr'),
    currentMilestone: text('current_milestone'),
    milestonesCompleted: integer('milestones_completed').notNull().default(0),
    milestonesTotal: integer('milestones_total').notNull().default(0),
    contactPhone: text('contact_phone'),
    notes: text('notes'),
    liveUrl: text('live_url'),
    liveStatus: text('live_status', { enum: ['ONLINE', 'STAGING', 'MAINTENANCE', 'OFFLINE'] }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('projects_status_idx').on(table.status),
    index('projects_client_name_idx').on(table.clientName),
    index('projects_live_status_idx').on(table.liveStatus),
  ]
);

export const complaints = pgTable(
  'complaints',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    ticketCode: text('ticket_code').notNull().unique(),
    clientName: text('client_name').notNull(),
    projectName: text('project_name').notNull(),
    date: text('date'),
    category: text('category', { enum: ['Bug / Error', 'Delay / Schedule', 'Scope Request', 'Billing / Payment'] })
      .notNull(),
    priority: text('priority', { enum: ['High', 'Medium', 'Low'] }).notNull(),
    status: text('status', { enum: ['Open', 'In Investigation', 'Resolved'] })
      .notNull()
      .default('Open'),
    subject: text('subject').notNull(),
    description: text('description').notNull(),
    adminResponse: text('admin_response'),
    resolvedAt: text('resolved_at'),
    reportedBy: text('reported_by'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('complaints_status_idx').on(table.status),
    index('complaints_priority_idx').on(table.priority),
    index('complaints_category_idx').on(table.category),
  ]
);

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
    action: text('action').notNull(),
    username: text('username'),
    ip: text('ip'),
    success: boolean('success').notNull().default(false),
    detail: text('detail'),
  },
  (table) => [
    index('audit_logs_timestamp_idx').on(table.timestamp),
    index('audit_logs_action_idx').on(table.action),
  ]
);
