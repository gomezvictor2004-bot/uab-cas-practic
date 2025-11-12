import express from 'express';
import router from './routes/index.js';
import { requestLogger } from './utils/requestLogger.js';
import { errorHandler } from './utils/errorHandler.js';

export const createServer = () => {
  const app = express();
  app.use(express.json({ limit: '5mb' }));
  app.use(requestLogger);
  app.use('/api', router);
  app.use(errorHandler);
  return app;
};

export default createServer;
