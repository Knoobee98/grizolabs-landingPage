import { auditLogs } from '../schema';
import { getDb } from '../index';

export interface AuditLogInput {
  action: string;
  username?: string | null;
  ip?: string | null;
  success: boolean;
  detail?: string | null;
}

export const insertAuditLog = async (input: AuditLogInput) => {
  const db = getDb();
  const [row] = await db.insert(auditLogs).values(input).returning();
  return row;
};