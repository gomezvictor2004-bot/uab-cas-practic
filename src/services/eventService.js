import { randomUUID } from 'node:crypto';
import { getState, updateState } from './dataStore.js';

export const listEvents = async ({ studentId } = {}) => {
  const state = await getState();
  return state.events.filter((event) => {
    if (studentId && event.studentId !== studentId) return false;
    return true;
  });
};

export const getEventsForDay = async ({ date = new Date(), studentId } = {}) => {
  const target = new Date(date);
  return (await listEvents({ studentId })).filter((event) => {
    const eventDate = new Date(event.datetime);
    return (
      eventDate.getFullYear() === target.getFullYear() &&
      eventDate.getMonth() === target.getMonth() &&
      eventDate.getDate() === target.getDate()
    );
  });
};

export const createEvent = async (eventInput) => {
  const newEvent = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...eventInput
  };

  await updateState((draft) => {
    draft.events.push(newEvent);
  });

  return newEvent;
};

export default {
  listEvents,
  getEventsForDay,
  createEvent
};
