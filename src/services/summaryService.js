import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

let openAiClientPromise;

const loadOpenAiClient = async () => {
  if (!config.openAiApiKey) {
    return null;
  }

  if (!openAiClientPromise) {
    openAiClientPromise = (async () => {
      try {
        const module = await import('openai');
        const OpenAI = module.default ?? module.OpenAI;
        if (!OpenAI) {
          throw new Error('OpenAI SDK is not available');
        }
        return new OpenAI({ apiKey: config.openAiApiKey });
      } catch (error) {
        logger.warn('openai_sdk_not_available', { message: error.message });
        return null;
      }
    })();
  }

  return openAiClientPromise;
};

const heuristicSummary = (content) => {
  const sentences = content
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  const limit = Math.max(1, Math.floor(sentences.length / 3));
  return sentences.slice(0, limit).join(' ');
};

export const summarizeDocument = async (content, { prompt } = {}) => {
  const client = await loadOpenAiClient();
  if (!client) {
    if (!config.openAiApiKey) {
      logger.warn('openai_key_missing_using_heuristic');
    }
    return heuristicSummary(content);
  }

  try {
    const completion = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: 'Eres un asistente que resume apuntes universitarios de forma clara y concisa.'
        },
        {
          role: 'user',
          content: `${prompt ?? 'Resume el siguiente contenido en español destacando ideas clave.'}\n\n${content}`
        }
      ]
    });

    const message = completion.output_text ?? heuristicSummary(content);
    return message.trim();
  } catch (error) {
    logger.error('openai_summary_failed', { message: error.message });
    return heuristicSummary(content);
  }
};

export const generateStudyQuestions = async (content, { count = 3 } = {}) => {
  const client = await loadOpenAiClient();
  if (!client) {
    if (!config.openAiApiKey) {
      logger.warn('openai_key_missing_generating_heuristic_questions');
    }
    const sentences = content.split(/(?<=[.!?])\s+/).filter(Boolean);
    return sentences.slice(0, count).map((sentence, index) => ({
      id: `question-${index + 1}`,
      question: `¿Por qué es importante: ${sentence.trim()}?`
    }));
  }

  try {
    const completion = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: 'Genera preguntas cortas tipo test sobre el temario proporcionado.'
        },
        {
          role: 'user',
          content: `Crea ${count} preguntas tipo test sobre el siguiente texto:\n\n${content}`
        }
      ]
    });

    const text = completion.output_text ?? '';
    return text
      .split(/\n+/)
      .filter(Boolean)
      .map((question, index) => ({ id: `question-${index + 1}`, question: question.trim() }));
  } catch (error) {
    logger.error('openai_questions_failed', { message: error.message });
    return [];
  }
};

export default {
  summarizeDocument,
  generateStudyQuestions
};
