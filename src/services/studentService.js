import { getState } from './dataStore.js';

export const listStudents = async () => {
  const state = await getState();
  return state.students;
};

export default {
  listStudents
};
