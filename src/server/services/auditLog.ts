import fs from 'fs';
import path from 'path';
import { config } from '../config';

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

function writeAudit(entry: AuditEntry): void {
  const line = JSON.stringify(entry);
  if (config.isProd) {
    try {
      fs.mkdirSync(LOG_DIR, { recursive: true });
      fs.appendFileSync(LOG_FILE, `${line}\n`);
    } catch (error) {
      console.error('[audit] Failed to write audit log:', error);
    }
  } else {
    console.log('[audit]', line);
  }
}

export const logAudit = (entry: Omit<AuditEntry, 'timestamp'>): void => {
  writeAudit({ ...entry, timestamp: new Date().toISOString() });
};
