import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { config } from './src/server/config';
import { createApp } from './src/server/app';

const app = createApp();

async function startServer() {
  if (config.dbEnabled && config.nodeEnv !== 'production') {
    try {
      const { migrate } = await import('drizzle-orm/node-postgres/migrator');
      const { getDb } = await import('./src/server/db');
      await migrate(getDb(), { migrationsFolder: path.join(process.cwd(), 'drizzle') });
      console.log('[db] Migrations applied (dev)');
    } catch (error) {
      console.error('[db] Dev migration failed:', error);
    }
  }

  if (config.nodeEnv !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(config.port, '0.0.0.0', () => {
    console.log(`Grizolabs Server running on http://0.0.0.0:${config.port}`);
  });
}

startServer();