import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../src/server/app';

const app = createApp();

export const config = {
  maxDuration: 30,
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as any, res as any);
}