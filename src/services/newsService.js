import { randomUUID } from 'node:crypto';
import { getState, updateState } from './dataStore.js';

export const listNews = async ({ limit = 5 } = {}) => {
  const state = await getState();
  return state.news
    .slice()
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
};

export const addNews = async (newsItem) => {
  const item = {
    id: newsItem.id ?? randomUUID(),
    publishedAt: newsItem.publishedAt ?? new Date().toISOString(),
    ...newsItem
  };

  await updateState((draft) => {
    const existingIndex = draft.news.findIndex((entry) => entry.id === item.id);
    if (existingIndex >= 0) {
      draft.news[existingIndex] = item;
    } else {
      draft.news.push(item);
    }
  });

  return item;
};

export default {
  listNews,
  addNews
};
