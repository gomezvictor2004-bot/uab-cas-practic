import puppeteer from 'puppeteer';
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

export const scrapeUniversityData = async () => {
  if (config.mockScraper) {
    logger.info('scraping_mock_data_used');
    return mockSchedule();
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.goto(config.campusNewsUrl, { waitUntil: 'networkidle0' });
    // Implement scraping logic here based on specific campus portal markup.
    // This placeholder returns the mock structure to keep the API consistent.
    const data = mockSchedule();
    return data;
  } finally {
    await browser.close();
  }
};

export default {
  scrapeUniversityData
};
