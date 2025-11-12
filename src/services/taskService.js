import { randomUUID } from 'node:crypto';
import { getState, updateState } from './dataStore.js';

export const listTasks = async (filters = {}) => {
  const { studentId, status } = filters;
  const state = await getState();
  return state.tasks.filter((task) => {
    if (studentId && task.studentId !== studentId) return false;
    if (status && task.status !== status) return false;
    return true;
  });
};

export const createTask = async (taskInput) => {
  const newTask = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...taskInput
  };

  await updateState((draft) => {
    draft.tasks.push(newTask);
  });

  return newTask;
};

export const getUpcomingTasks = async ({ daysAhead = 7, studentId } = {}) => {
  const tasks = await listTasks({ studentId });
  const now = new Date();
  const limit = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate >= now && dueDate <= limit;
  });
};

export default {
  listTasks,
  createTask,
  getUpcomingTasks
};
