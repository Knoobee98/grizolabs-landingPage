import dotenv from 'dotenv';

dotenv.config();

export interface AdminUser {
  username: string;
  password: string;
}

const isProd = process.env.NODE_ENV === 'production';

// Supports multiple admins via ADMIN_USERS (JSON array). Falls back to the
// legacy single ADMIN_USERNAME / ADMIN_PASSWORD pair for backwards compat.
function loadAdminUsers(): AdminUser[] {
  const raw = process.env.ADMIN_USERS;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((user: AdminUser) => ({
          username: String(user.username),
          password: String(user.password),
        }));
      }
    } catch (error) {
      console.error('[config] Invalid ADMIN_USERS JSON, falling back to ADMIN_USERNAME/ADMIN_PASSWORD');
    }
  }
  return [
    {
      username: process.env.ADMIN_USERNAME || 'admin@grizolabs.app',
      password: process.env.ADMIN_PASSWORD || 'ChangeThis123!',
    },
  ];
}

const corsOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd,
  port: Number(process.env.PORT) || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || '',
  dbEnabled: Boolean(process.env.DATABASE_URL),
  // Locked-down CORS allowlist. Disallowed origins receive no CORS headers.
  corsOrigins,
  // Set true when running behind a reverse proxy (e.g. Cloud Run) so
  // rate-limiters key on the real client IP via X-Forwarded-For.
  trustProxy: process.env.TRUST_PROXY === 'true',
  rateLimit: {
    apiWindowMs: 15 * 60 * 1000, // 15 minutes
    apiMax: Number(process.env.API_RATE_LIMIT_MAX) || 300,
    authMax: Number(process.env.AUTH_RATE_LIMIT_MAX) || 5,
  },
  adminUsers: loadAdminUsers(),
};
