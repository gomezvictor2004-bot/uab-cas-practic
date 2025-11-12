import axios from 'axios';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const sendBriefingNotification = async ({ student, briefing }) => {
  if (!config.n8nWebhookUrl) {
    logger.info('n8n_webhook_not_configured', { studentId: student.id });
    return;
  }

  try {
    await axios.post(config.n8nWebhookUrl, {
      student,
      briefing
    });
    logger.info('n8n_webhook_sent', { studentId: student.id });
  } catch (error) {
    logger.error('n8n_webhook_failed', { message: error.message });
  }
};

export default {
  sendBriefingNotification
};
