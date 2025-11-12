import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const sendBriefingNotification = async ({ student, briefing }) => {
  if (!config.n8nWebhookUrl) {
    logger.info('n8n_webhook_not_configured', { studentId: student.id });
    return;
  }

  try {
    const response = await fetch(config.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ student, briefing })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    logger.info('n8n_webhook_sent', { studentId: student.id });
  } catch (error) {
    logger.error('n8n_webhook_failed', { message: error.message });
  }
};

export default {
  sendBriefingNotification
};
