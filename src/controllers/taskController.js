import { listTasks, createTask } from '../services/taskService.js';
import { createHttpError } from '../utils/httpError.js';

export const getTasks = async ({ query }) => {
  const { studentId, status } = query;
  const tasks = await listTasks({ studentId, status });
  return {
    statusCode: 200,
    body: { tasks }
  };
};

export const postTask = async ({ body }) => {
  const { title, dueDate, course, studentId } = body ?? {};
  if (!title || !dueDate || !studentId) {
    throw createHttpError(400, 'title, dueDate and studentId are required');
  }

  const task = await createTask({ title, dueDate, course, studentId });
  return {
    statusCode: 201,
    body: { task }
  };
};

export default {
  getTasks,
  postTask
};
