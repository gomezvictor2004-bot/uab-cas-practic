import { randomUUID } from 'node:crypto';
import { getState, updateState } from './dataStore.js';

export const addDocument = async ({ title, content, studentId, summary }) => {
  const document = {
    id: randomUUID(),
    title,
    content,
    studentId,
    summary,
    createdAt: new Date().toISOString()
  };

  await updateState((draft) => {
    draft.documents.push(document);
  });

  return document;
};

export const listDocuments = async ({ studentId } = {}) => {
  const state = await getState();
  return state.documents.filter((doc) => {
    if (studentId && doc.studentId !== studentId) return false;
    return true;
  });
};

export default {
  addDocument,
  listDocuments
};
