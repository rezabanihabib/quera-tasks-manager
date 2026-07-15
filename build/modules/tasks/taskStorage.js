import { STORAGE_KEY, LAST_ID_KEY } from "./constants.js";

export function getNextId() {
  const lastId = Number(localStorage.getItem(LAST_ID_KEY)) || 0;
  const nextId = lastId + 1;
  localStorage.setItem(LAST_ID_KEY, String(nextId));
  return nextId;
}

export function getTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const tasks = raw ? JSON.parse(raw) : [];
    return Array.isArray(tasks) ? tasks : [];
  } catch {
    return [];
  }
}

export function getPendingTasks() {
  return getTasks().filter((t) => !t.completed);
}

export function getCompletedTasks() {
  return getTasks().filter((t) => t.completed);
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function findTaskIndex(tasks, id) {
  return tasks.findIndex((t) => t.id === id);
}
