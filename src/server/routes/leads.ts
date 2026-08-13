import express from 'express';
import { Request, Response } from 'express';
import { db } from '../db';
import { createLead, CreateLeadInput, LeadType } from '../db/repositories/leadsRepo';

export const leadsRouter = express.Router();

const LEAD_TYPES: LeadType[] = ['consultation', 'diagnostic', 'prd'];

const str = (v: unknown, max = 255): string | null =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

leadsRouter.post('/', async (req: Request, res: Response) => {
  if (!db) {
    return res.status(503).json({ error: 'Database is not configured' });
  }

  try {
    const {
      leadType,
      businessName,
      contactName,
      whatsapp,
      email,
      channel,
      preferredDate,
      preferredTime,
      notes,
      sourceData,
    } = req.body;

    if (!leadType || !LEAD_TYPES.includes(leadType)) {
      return res.status(400).json({ error: 'leadType must be consultation, diagnostic or prd' });
    }

    const input: CreateLeadInput = {
      leadType,
      businessName: str(businessName),
      contactName: str(contactName),
      whatsapp: str(whatsapp),
      email: str(email, 320),
      channel: channel === 'meeting' || channel === 'whatsapp' ? channel : null,
      preferredDate: str(preferredDate),
      preferredTime: str(preferredTime, 100),
      notes: typeof notes === 'string' && notes.trim() ? notes.trim().slice(0, 4000) : null,
      sourceData:
        sourceData && typeof sourceData === 'object' && !Array.isArray(sourceData)
          ? sourceData
          : null,
    };

    const row = await createLead(input);
    return res.status(201).json({ success: true, lead: row });
  } catch (error) {
    console.error('Error in /api/leads:', error);
    return res.status(500).json({ error: 'Failed to save lead' });
  }
});