import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { config } from './src/server/config';
import { createApp } from './src/server/app';

const app = createApp();

async function startServer() {
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