import express from 'express';
import { Request, Response } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { db } from '../db';
import {
  listProjects,
  createProject,
  updateProjectByCode,
  deleteProjectByCode,
} from '../db/repositories/projectsRepo';
import {
  listComplaints,
  createComplaint,
  updateComplaint,
} from '../db/repositories/complaintsRepo';
import { listLeads, updateLeadStatus, LeadStatus } from '../db/repositories/leadsRepo';
import { projectToInsert, projectToClient, complaintToInsert, complaintToClient } from '../db/mappers';

export const adminRouter = express.Router();

adminRouter.use(authenticateToken, requireAdmin);

const dbUnavailable = (res: Response) =>
  res.status(503).json({ error: 'Database is not configured' });

// ─── Projects ─────────────────────────────────────────────────────────
adminRouter.get('/projects', async (_req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const rows = await listProjects();
    res.json({ success: true, projects: rows.map(projectToClient) });
  } catch (error) {
    console.error('Error listing projects:', error);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

adminRouter.post('/projects', async (req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const row = await createProject(projectToInsert(req.body));
    res.status(201).json({ success: true, project: projectToClient(row) });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

adminRouter.patch('/projects/:id', async (req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const row = await updateProjectByCode(req.params.id, projectToInsert(req.body));
    if (!row) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true, project: projectToClient(row) });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

adminRouter.delete('/projects/:id', async (req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const row = await deleteProjectByCode(req.params.id);
    if (!row) return res.status(404).json({ error: 'Project not found' });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ─── Complaints ───────────────────────────────────────────────────────
adminRouter.get('/complaints', async (_req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const rows = await listComplaints();
    res.json({ success: true, complaints: rows.map(complaintToClient) });
  } catch (error) {
    console.error('Error listing complaints:', error);
    res.status(500).json({ error: 'Failed to load complaints' });
  }
});

adminRouter.post('/complaints', async (req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const row = await createComplaint(complaintToInsert(req.body));
    res.status(201).json({ success: true, complaint: complaintToClient(row) });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ error: 'Failed to create complaint' });
  }
});

adminRouter.patch('/complaints/:id', async (req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const row = await updateComplaint(req.params.id, complaintToInsert(req.body));
    if (!row) return res.status(404).json({ error: 'Complaint not found' });
    res.json({ success: true, complaint: complaintToClient(row) });
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({ error: 'Failed to update complaint' });
  }
});

// ─── Leads ────────────────────────────────────────────────────────────
adminRouter.get('/leads', async (_req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const rows = await listLeads();
    res.json({ success: true, leads: rows });
  } catch (error) {
    console.error('Error listing leads:', error);
    res.status(500).json({ error: 'Failed to load leads' });
  }
});

adminRouter.patch('/leads/:id', async (req: Request, res: Response) => {
  if (!db) return dbUnavailable(res);
  try {
    const { status } = req.body;
    if (!status || !['new', 'contacted', 'converted', 'closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid lead status' });
    }
    const row = await updateLeadStatus(req.params.id, status as LeadStatus);
    if (!row) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true, lead: row });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});