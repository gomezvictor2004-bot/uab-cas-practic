import { generateDailyBriefing } from '../services/briefingService.js';
import { createHttpError } from '../utils/httpError.js';

export const getBriefing = async ({ query }) => {
  const { studentId } = query;
  if (!studentId) {
    throw createHttpError(400, 'studentId query parameter is required');
  }

  const briefing = await generateDailyBriefing({ studentId });
  return {
    statusCode: 200,
    body: { briefing }
  };
};

export default {
  getBriefing
};
