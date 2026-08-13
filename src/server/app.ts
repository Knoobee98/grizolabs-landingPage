import express, { Request, Response, NextFunction } from 'express';
import { securityMiddleware, apiRateLimit } from './middleware/security';
import { authRouter } from './routes/auth';
import { aiAdvisorRouter } from './routes/aiAdvisor';
import { prdGeneratorRouter } from './routes/prdGenerator';
import { leadsRouter } from './routes/leads';
import { adminRouter } from './routes/admin';
import { config } from './config';

export function createApp() {
  const app = express();

  if (config.trustProxy) {
    app.set('trust proxy', true);
  }

  securityMiddleware.forEach((mw) => app.use(mw));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Grizolabs IT Consulting Engine' });
  });

  app.use('/api', apiRateLimit);
  app.use('/api/auth', authRouter);
  app.use('/api/leads', leadsRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/ai-advisor', aiAdvisorRouter);
  app.use('/api/prd-generate', prdGeneratorRouter);

  // Unknown API routes → JSON 404
  app.use('/api', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' });
  });

  // Central error handler → JSON 500, never leak stack traces
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[server] Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
