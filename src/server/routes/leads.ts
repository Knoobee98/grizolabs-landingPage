import express from 'express';
import { Request, Response } from 'express';
import { db } from '../db';
import { createLead, CreateLeadInput } from '../db/repositories/leadsRepo';
import { validateBody, createLeadSchema } from '../middleware/validate';

export const leadsRouter = express.Router();

leadsRouter.post('/', validateBody(createLeadSchema), async (req: Request, res: Response) => {
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

    const input: CreateLeadInput = {
      leadType,
      businessName: businessName || null,
      contactName: contactName || null,
      whatsapp: whatsapp || null,
      email: email || null,
      channel: channel || null,
      preferredDate: preferredDate || null,
      preferredTime: preferredTime || null,
      notes: notes || null,
      sourceData: sourceData || null,
    };

    const row = await createLead(input);
    return res.status(201).json({ success: true, lead: row });
  } catch (error) {
    console.error('Error in /api/leads:', error);
    return res.status(500).json({ error: 'Failed to save lead' });
  }
});