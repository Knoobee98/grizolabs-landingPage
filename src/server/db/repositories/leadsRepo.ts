import { eq, desc } from 'drizzle-orm';
import { leads } from '../schema';
import { getDb } from '../index';

export type LeadType = 'consultation' | 'diagnostic' | 'prd';
export type LeadStatus = 'new' | 'contacted' | 'converted' | 'closed';

export interface CreateLeadInput {
  leadType: LeadType;
  businessName?: string | null;
  contactName?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  channel?: 'whatsapp' | 'meeting' | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  notes?: string | null;
  sourceData?: Record<string, unknown> | null;
}

export const createLead = async (input: CreateLeadInput) => {
  const db = getDb();
  const [row] = await db.insert(leads).values(input).returning();
  return row;
};

export const listLeads = async (limit = 200) => {
  const db = getDb();
  return db.query.leads.findMany({
    orderBy: (table, { desc }) => [desc(table.createdAt)],
    limit,
  });
};

export const updateLeadStatus = async (id: string, status: LeadStatus) => {
  const db = getDb();
  const [row] = await db.update(leads).set({ status }).where(eq(leads.id, id)).returning();
  return row;
};