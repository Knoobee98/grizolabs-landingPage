import express from 'express';
import { securityMiddleware } from './middleware/security';
import { authRouter } from './routes/auth';
import { aiAdvisorRouter } from './routes/aiAdvisor';
import { prdGeneratorRouter } from './routes/prdGenerator';

export function createApp() {
  const app = express();

  securityMiddleware.forEach((mw) => app.use(mw));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Grizolabs IT Consulting Engine' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/ai-advisor', aiAdvisorRouter);
  app.use('/api/prd-generate', prdGeneratorRouter);

  return app;
}