import { getEventsForDay } from './eventService.js';
import { getUpcomingTasks } from './taskService.js';
import { listNews } from './newsService.js';
import { summarizeDocument, generateStudyQuestions } from './summaryService.js';
import { listDocuments } from './documentService.js';

export const generateDailyBriefing = async ({ studentId }) => {
  const [todayEvents, upcomingTasks, news, documents] = await Promise.all([
    getEventsForDay({ studentId }),
    getUpcomingTasks({ studentId }),
    listNews({ limit: 5 }),
    listDocuments({ studentId })
  ]);

  const latestDocument = documents.at(-1);
  let studyHelper = null;
  if (latestDocument) {
    const questions = await generateStudyQuestions(latestDocument.content, { count: 3 });
    studyHelper = {
      title: latestDocument.title,
      summary: latestDocument.summary,
      questions
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    events: todayEvents,
    tasks: upcomingTasks,
    news,
    studyHelper
  };
};

export const summarizeAndStoreDocument = async ({ title, content, studentId }) => {
  const summary = await summarizeDocument(content);
  return {
    summary,
    document: { title, content, studentId }
  };
};

export default {
  generateDailyBriefing,
  summarizeAndStoreDocument
};
