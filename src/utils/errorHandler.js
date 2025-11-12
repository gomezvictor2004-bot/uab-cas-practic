import { logger } from './logger.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  logger.error('unhandled_error', {
    message: err.message,
    stack: err.stack
  });

  if (res.headersSent) {
    return res.end();
  }

  return res.status(err.status ?? 500).json({
    error: {
      message: err.message ?? 'Unexpected error',
      details: err.details ?? undefined
    }
  });
};

export default errorHandler;
