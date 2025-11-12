import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const loadDotEnv = () => {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
      continue;
    }

    const unwrapped = rawValue.replace(/^['"]|['"]$/g, '');
    process.env[key] = unwrapped;
  }
};

loadDotEnv();

const numberFromEnv = (value, fallback) => {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const booleanFromEnv = (value, fallback) => {
  if (value === undefined) return fallback;
  const normalized = value.toString().toLowerCase();
  if (['true', '1', 'yes', 'y'].includes(normalized)) return true;
  if (['false', '0', 'no', 'n'].includes(normalized)) return false;
  return fallback;
};

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: numberFromEnv(process.env.PORT, 3000),
  openAiApiKey: process.env.OPENAI_API_KEY ?? '',
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL ?? '',
  campusNewsUrl: process.env.CAMPUS_NEWS_URL ?? 'https://campus.example.edu/news',
  mockScraper: booleanFromEnv(process.env.MOCK_SCRAPER, true),
  dailyBriefCron: process.env.DAILY_BRIEF_CRON ?? '0 6 * * *'
};

export default config;
