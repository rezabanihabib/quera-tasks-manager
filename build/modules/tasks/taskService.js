import {
  getTasks,
  saveTasks,
  getNextId,
  findTaskIndex,
} from "./taskStorage.js";

export function createTask({ title, description, priority }) {
  const tasks = getTasks();
  const task = {
    id: getNextId(),
    title,
    description,
    priority,
    completed: false,
  };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

export function editTask(id, { title, description, priority }) {
  const tasks = getTasks();
  const index = findTaskIndex(tasks, id);
  if (index === -1) return null;

  tasks[index] = { ...tasks[index], title, description, priority };
  saveTasks(tasks);
  return tasks[index];
}

export function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
}

export function toggleTaskComplete(id) {
  const tasks = getTasks();
  const index = findTaskIndex(tasks, id);
  if (index === -1) return null;

  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  return tasks[index];
}

export function checkActionType(data) {
  if (data.id) {
    return editTask(data.id, data);
  }
  return createTask(data);
}
