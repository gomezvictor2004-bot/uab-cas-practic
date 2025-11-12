import { config } from '../config/env.js';

export const getStatus = () => ({
  statusCode: 200,
  body: {
    name: 'Smart UniBot',
    status: 'ok',
    environment: config.env,
    timestamp: new Date().toISOString()
  }
});

export default {
  getStatus
};
