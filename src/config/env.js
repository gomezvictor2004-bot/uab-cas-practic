import dotenv from 'dotenv';

dotenv.config();

const numberFromEnv = (value, fallback) => {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: numberFromEnv(process.env.PORT, 3000),
  openAiApiKey: process.env.OPENAI_API_KEY ?? '',
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL ?? '',
  campusNewsUrl: process.env.CAMPUS_NEWS_URL ?? 'https://campus.example.edu/news',
  mockScraper: (process.env.MOCK_SCRAPER ?? 'true').toLowerCase() !== 'false',
  dailyBriefCron: process.env.DAILY_BRIEF_CRON ?? '0 6 * * *'
};

export default config;
