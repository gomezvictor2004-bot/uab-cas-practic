import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { scrapeUniversityData } from './scrapingService.js';
import { listStudents } from './studentService.js';
import { addNews } from './newsService.js';
import { createTask } from './taskService.js';
import { createEvent } from './eventService.js';
import { generateDailyBriefing } from './briefingService.js';
import { sendBriefingNotification } from './notificationService.js';

const registerEvents = async (events, studentId) => {
  await Promise.all(
    events.map((event) =>
      createEvent({
        ...event,
        studentId,
        datetime: event.datetime ?? new Date().toISOString()
      })
    )
  );
};

const registerTasks = async (tasks, studentId) => {
  await Promise.all(
    tasks.map((task) =>
      createTask({
        ...task,
        studentId,
        dueDate: task.dueDate ?? new Date(Date.now() + 86400000).toISOString()
      })
    )
  );
};

const registerNews = async (newsItems) => {
  await Promise.all(newsItems.map((item) => addNews(item)));
};

export const syncAcademicData = async () => {
  const scraped = await scrapeUniversityData();
  const students = await listStudents();

  await Promise.all(
    students.map(async (student) => {
      await registerEvents(scraped.events ?? [], student.id);
      await registerTasks(scraped.tasks ?? [], student.id);
    })
  );

  await registerNews(scraped.news ?? []);
  logger.info('sync_academic_data_completed');
};

export const dispatchDailyBriefings = async () => {
  const students = await listStudents();
  await Promise.all(
    students.map(async (student) => {
      const briefing = await generateDailyBriefing({ studentId: student.id });
      await sendBriefingNotification({ student, briefing });
    })
  );
  logger.info('daily_briefings_dispatched', { count: students.length });
};

const parseDailyCron = (expression) => {
  const parts = expression.trim().split(/\s+/);
  if (parts.length < 2) {
    return { hour: 6, minute: 0 };
  }

  const minute = Number.parseInt(parts[0], 10);
  const hour = Number.parseInt(parts[1], 10);

  if (Number.isNaN(minute) || Number.isNaN(hour)) {
    return { hour: 6, minute: 0 };
  }

  return {
    hour: Math.max(0, Math.min(23, hour)),
    minute: Math.max(0, Math.min(59, minute))
  };
};

const scheduleNextRun = (runJobs) => {
  const { hour, minute } = parseDailyCron(config.dailyBriefCron);
  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }

  const delay = next.getTime() - now.getTime();
  setTimeout(async () => {
    try {
      await runJobs();
    } finally {
      scheduleNextRun(runJobs);
    }
  }, delay);

  logger.info('jobs_scheduled', {
    nextRunIso: next.toISOString(),
    delayMs: delay
  });
};

export const scheduleRecurringJobs = () => {
  const runJobs = async () => {
    logger.info('daily_job_triggered');
    await syncAcademicData();
    await dispatchDailyBriefings();
  };

  scheduleNextRun(runJobs);
  // Ejecuta una sincronización inicial para que la demo tenga datos frescos.
  runJobs().catch((error) => {
    logger.error('initial_job_failed', { message: error.message });
  });
};

export default {
  syncAcademicData,
  dispatchDailyBriefings,
  scheduleRecurringJobs
};
