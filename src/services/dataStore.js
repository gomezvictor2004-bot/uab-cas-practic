import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const statePath = resolve(__dirname, '../../data/state.json');

const readStateFromDisk = async () => {
  const content = await readFile(statePath, 'utf8');
  return JSON.parse(content);
};

const writeStateToDisk = async (state) => {
  await writeFile(statePath, JSON.stringify(state, null, 2));
};

export const getState = async () => {
  const state = await readStateFromDisk();
  return state;
};

export const updateState = async (updater) => {
  const state = await readStateFromDisk();
  const draft = structuredClone(state);
  const result = await updater(draft);
  const finalState = result ?? draft;
  await writeStateToDisk(finalState);
  return finalState;
};

export default {
  getState,
  updateState
};
