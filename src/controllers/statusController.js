import { config } from '../config/env.js';

export const getStatus = (req, res) => {
  res.json({
    name: 'Smart UniBot',
    status: 'ok',
    environment: config.env,
    timestamp: new Date().toISOString()
  });
};

export default {
  getStatus
};
