import { Lead, LeadStatus, LeadType } from '../types';

export interface PostLeadInput {
  leadType: LeadType;
  businessName?: string;
  contactName?: string;
  whatsapp?: string;
  email?: string;
  channel?: 'whatsapp' | 'meeting';
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  sourceData?: Record<string, unknown>;
}

// Fire-and-forget lead capture. Never blocks the main UX (e.g. the WhatsApp
// flow) and silently ignores failures (DB not configured / offline).
export const postLead = async (input: PostLeadInput): Promise<Lead | null> => {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(input),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.lead ?? null;
  } catch {
    return null;
  }
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'Baru',
  contacted: 'Sudah Dihubungi',
  converted: 'Konversi',
  closed: 'Closed',
};

export const LEAD_TYPE_LABELS: Record<LeadType, string> = {
  consultation: 'Konsultasi',
  diagnostic: 'Audit IT',
  prd: 'Estimasi PRD',
};