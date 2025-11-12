import { addDocument, listDocuments } from '../services/documentService.js';
import { summarizeDocument, generateStudyQuestions } from '../services/summaryService.js';

export const summarize = async (req, res, next) => {
  try {
    const { title, content, studentId } = req.body;
    if (!title || !content || !studentId) {
      return res.status(400).json({
        error: {
          message: 'title, content and studentId are required'
        }
      });
    }

    const summary = await summarizeDocument(content);
    const questions = await generateStudyQuestions(content, { count: 5 });
    const document = await addDocument({ title, content, studentId, summary });

    return res.status(201).json({
      document,
      summary,
      questions
    });
  } catch (error) {
    return next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    const { studentId } = req.query;
    const documents = await listDocuments({ studentId });
    return res.json({ documents });
  } catch (error) {
    return next(error);
  }
};

export default {
  summarize,
  list
};
