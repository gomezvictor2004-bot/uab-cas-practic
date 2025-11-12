import { generateDailyBriefing } from '../services/briefingService.js';

export const getBriefing = async (req, res, next) => {
  try {
    const { studentId } = req.query;
    if (!studentId) {
      return res.status(400).json({ error: { message: 'studentId query parameter is required' } });
    }

    const briefing = await generateDailyBriefing({ studentId });
    return res.json({ briefing });
  } catch (error) {
    return next(error);
  }
};

export default {
  getBriefing
};
