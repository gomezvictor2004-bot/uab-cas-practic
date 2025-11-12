import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import router from './routes/index.js';
import { requestLogger } from './utils/requestLogger.js';
import { errorHandler } from './utils/errorHandler.js';

export const createServer = () => {
  const app = express();
  app.use(express.json({ limit: '5mb' }));
  app.use(requestLogger);
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const publicDir = path.resolve(__dirname, '../public');
  app.use(express.static(publicDir));
  app.use('/api', router);
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    return res.sendFile(path.join(publicDir, 'index.html'));
  });
  app.use(errorHandler);
  return app;
};

export default createServer;
