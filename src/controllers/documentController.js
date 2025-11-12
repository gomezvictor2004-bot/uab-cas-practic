import { addDocument, listDocuments } from '../services/documentService.js';
import { summarizeDocument, generateStudyQuestions } from '../services/summaryService.js';
import { createHttpError } from '../utils/httpError.js';

export const summarize = async ({ body }) => {
  const { title, content, studentId } = body ?? {};
  if (!title || !content || !studentId) {
    throw createHttpError(400, 'title, content and studentId are required');
  }

  const summary = await summarizeDocument(content);
  const questions = await generateStudyQuestions(content, { count: 5 });
  const document = await addDocument({ title, content, studentId, summary });

  return {
    statusCode: 201,
    body: {
      document,
      summary,
      questions
    }
  };
};

export const list = async ({ query }) => {
  const { studentId } = query;
  const documents = await listDocuments({ studentId });
  return {
    statusCode: 200,
    body: { documents }
  };
};

export default {
  summarize,
  list
};
