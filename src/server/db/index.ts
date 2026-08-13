import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { config } from '../config';
import * as schema from './schema';

export type Database = NodePgDatabase<typeof schema>;

const createPool = () => {
  const useSsl = !config.databaseUrl.includes('sslmode=disable');
  return new Pool({
    connectionString: config.databaseUrl,
    ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    max: 10,
  });
};

export const db: Database | null = config.dbEnabled
  ? drizzle(createPool(), { schema })
  : null;

export const getDb = (): Database => {
  if (!db) {
    throw new Error('DATABASE_URL is not configured');
  }
  return db;
};
