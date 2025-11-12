import { listTasks, createTask } from '../services/taskService.js';

export const getTasks = async (req, res, next) => {
  try {
    const { studentId, status } = req.query;
    const tasks = await listTasks({ studentId, status });
    return res.json({ tasks });
  } catch (error) {
    return next(error);
  }
};

export const postTask = async (req, res, next) => {
  try {
    const { title, dueDate, course, studentId } = req.body;
    if (!title || !dueDate || !studentId) {
      return res.status(400).json({
        error: { message: 'title, dueDate and studentId are required' }
      });
    }

    const task = await createTask({ title, dueDate, course, studentId });
    return res.status(201).json({ task });
  } catch (error) {
    return next(error);
  }
};

export default {
  getTasks,
  postTask
};
