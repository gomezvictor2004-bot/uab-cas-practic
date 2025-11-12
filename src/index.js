import http from 'node:http';
import { config } from './config/env.js';
import { logger } from './utils/logger.js';
import createServer from './server.js';
import { scheduleRecurringJobs } from './services/schedulerService.js';

const app = createServer();
const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info('server_started', { port: config.port });
  scheduleRecurringJobs();
});
