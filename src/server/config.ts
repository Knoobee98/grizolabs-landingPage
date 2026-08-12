import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin@grizolabs.app',
    password: process.env.ADMIN_PASSWORD || 'ChangeThis123!',
  },
};