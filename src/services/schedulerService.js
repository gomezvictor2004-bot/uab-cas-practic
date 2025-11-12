import cron from 'node-cron';
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

export const scheduleRecurringJobs = () => {
  logger.info('scheduling_jobs', { cron: config.dailyBriefCron });
  cron.schedule(config.dailyBriefCron, async () => {
    logger.info('daily_job_triggered');
    await syncAcademicData();
    await dispatchDailyBriefings();
  });
};

export default {
  syncAcademicData,
  dispatchDailyBriefings,
  scheduleRecurringJobs
};
