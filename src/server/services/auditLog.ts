import fs from 'fs';
import path from 'path';
import { config } from '../config';
import { db } from '../db';
import { insertAuditLog } from '../db/repositories/auditRepo';

export type AuditAction = 'login' | 'logout' | 'admin-info';

export interface AuditEntry {
  timestamp: string;
  action: AuditAction;
  username?: string;
  ip?: string;
  success: boolean;
  detail?: string;
}

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'audit.log');

// Fallback sink when the DB is not configured or a DB write fails.
function writeAuditFile(entry: AuditEntry): void {
  const line = JSON.stringify(entry);
  if (config.isProd) {
    try {
      fs.mkdirSync(LOG_DIR, { recursive: true });
      fs.appendFileSync(LOG_FILE, `${line}\n`);
    } catch (error) {
      console.error('[audit] Failed to write audit log file:', error);
    }
  } else {
    console.log('[audit]', line);
  }
}

export const logAudit = (entry: Omit<AuditEntry, 'timestamp'>): void => {
  const full: AuditEntry = { ...entry, timestamp: new Date().toISOString() };

  if (!db) {
    writeAuditFile(full);
    return;
  }

  // Best-effort async write to the DB; fall back to the file on any failure.
  insertAuditLog({
    action: full.action,
    username: full.username ?? null,
    ip: full.ip ?? null,
    success: full.success,
    detail: full.detail ?? null,
  }).catch((error) => {
    console.error('[audit] DB write failed, falling back to file:', error);
    writeAuditFile(full);
  });
};