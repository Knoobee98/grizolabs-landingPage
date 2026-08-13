import type { AdminProject, ClientComplaint } from '../../types';
import type { ProjectRow, ProjectInsert } from './repositories/projectsRepo';
import type { ComplaintRow, ComplaintInsert } from './repositories/complaintsRepo';

// ─── Projects ─────────────────────────────────────────────────────────
export const projectToInsert = (p: AdminProject): ProjectInsert => ({
  projectCode: p.id,
  clientName: p.clientName,
  projectName: p.projectName,
  package: p.package,
  status: p.status,
  progressPercent: p.progressPercent,
  startDate: p.startDate,
  targetDate: p.targetDate,
  leadArchitect: p.leadArchitect,
  budgetIDR: p.budgetIDR,
  currentMilestone: p.currentMilestone,
  milestonesCompleted: p.milestonesCount?.completed ?? 0,
  milestonesTotal: p.milestonesCount?.total ?? 0,
  contactPhone: p.contactPhone,
  notes: p.notes,
  liveUrl: p.liveUrl ?? null,
  liveStatus: p.liveStatus ?? null,
});

export const projectToClient = (row: ProjectRow): AdminProject => ({
  id: row.projectCode,
  uuid: row.id,
  clientName: row.clientName,
  projectName: row.projectName,
  package: row.package ?? 'Custom',
  status: row.status,
  progressPercent: row.progressPercent,
  startDate: row.startDate ?? '',
  targetDate: row.targetDate ?? '',
  leadArchitect: row.leadArchitect ?? '',
  budgetIDR: row.budgetIDR ?? '',
  currentMilestone: row.currentMilestone ?? '',
  milestonesCount: { completed: row.milestonesCompleted, total: row.milestonesTotal },
  contactPhone: row.contactPhone ?? '',
  notes: row.notes ?? '',
  liveUrl: row.liveUrl ?? undefined,
  liveStatus: row.liveStatus ?? undefined,
});

// ─── Complaints ───────────────────────────────────────────────────────
export const complaintToInsert = (c: ClientComplaint): ComplaintInsert => ({
  ticketCode: c.ticketCode,
  clientName: c.clientName,
  projectName: c.projectName,
  date: c.date ?? null,
  category: c.category,
  priority: c.priority,
  status: c.status,
  subject: c.subject,
  description: c.description,
  adminResponse: c.adminResponse ?? null,
  resolvedAt: c.resolvedAt ?? null,
  reportedBy: c.reportedBy,
});

export const complaintToClient = (row: ComplaintRow): ClientComplaint => ({
  id: row.id,
  ticketCode: row.ticketCode,
  clientName: row.clientName,
  projectName: row.projectName,
  date: row.date ?? '',
  category: row.category,
  priority: row.priority,
  status: row.status,
  subject: row.subject,
  description: row.description,
  adminResponse: row.adminResponse ?? undefined,
  resolvedAt: row.resolvedAt ?? undefined,
  reportedBy: row.reportedBy,
});