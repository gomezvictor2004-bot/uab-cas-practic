import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

const mockSchedule = () => ({
  events: [
    {
      title: 'Teoría de datos - Aula 101',
      datetime: new Date().toISOString(),
      location: 'Aula 101',
      course: 'Teoría de datos'
    }
  ],
  tasks: [
    {
      title: 'Entrega práctica 2',
      dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
      course: 'Teoría de datos'
    }
  ],
  news: [
    {
      title: 'Nueva sala de estudio disponible',
      url: `${config.campusNewsUrl}/nueva-sala`,
      summary: 'La biblioteca amplía horarios y habilita una sala 24/7.'
    }
  ]
});

let puppeteerModulePromise;

const loadPuppeteer = async () => {
  if (!puppeteerModulePromise) {
    puppeteerModulePromise = (async () => {
      try {
        const module = await import('puppeteer');
        return module.default ?? module;
      } catch (error) {
        logger.warn('puppeteer_not_available_using_mock', { message: error.message });
        return null;
      }
    })();
  }

  return puppeteerModulePromise;
};

export const scrapeUniversityData = async () => {
  if (config.mockScraper) {
    logger.info('scraping_mock_data_used');
    return mockSchedule();
  }

  const puppeteer = await loadPuppeteer();
  if (!puppeteer) {
    return mockSchedule();
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.goto(config.campusNewsUrl, { waitUntil: 'networkidle0' });
    const data = mockSchedule();
    return data;
  } finally {
    await browser.close();
  }
};

export default {
  scrapeUniversityData
};
