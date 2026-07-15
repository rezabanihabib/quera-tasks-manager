import { renderTask } from "./renderTask.js";
import { PRIORITY_MAP } from "./constants.js";
import { getTasks, getPendingTasks, getCompletedTasks } from "./taskStorage.js";
import {
  deleteTask,
  toggleTaskComplete,
  checkActionType,
} from "./taskService.js";
import {
  getSectionRefs,
  updateDynamicUI,
  placeTaskItem,
  closeAllDropdowns,
} from "./taskDom.js";
import { wireTaskItem } from "./taskItemController.js";

export function renderTaskList(containerSelector) {
  const pendingContainer = document.querySelector(containerSelector);
  if (!pendingContainer) return;

  pendingContainer.innerHTML = "";

  const refs = getSectionRefs(pendingContainer);
  if (refs.completedContainer) refs.completedContainer.innerHTML = "";

  const tasks = getTasks();

  tasks
    .filter((t) => !t.completed)
    .forEach((task) => {
      const itemEl = renderTask(task, PRIORITY_MAP);
      wireTaskItem(itemEl, task, refs);
      pendingContainer.appendChild(itemEl);
    });

  tasks
    .filter((t) => t.completed)
    .forEach((task) => {
      const itemEl = renderTask(task, PRIORITY_MAP);
      wireTaskItem(itemEl, task, refs);
      refs.completedContainer?.appendChild(itemEl);
    });

  updateDynamicUI(refs);

  if (!renderTaskList._bound) {
    document.addEventListener("click", () => closeAllDropdowns());
    renderTaskList._bound = true;
  }
}

export function addTaskToList(containerSelector, data) {
  const pendingContainer = document.querySelector(containerSelector);
  if (!pendingContainer) return null;

  const refs = getSectionRefs(pendingContainer);
  const task = checkActionType(data);
  const itemEl = renderTask(task, PRIORITY_MAP);

  wireTaskItem(itemEl, task, refs);
  placeTaskItem(itemEl, task, refs, { prependIfPending: true });

  updateDynamicUI(refs);

  return task;
}

export {
  getTasks,
  getPendingTasks,
  getCompletedTasks,
  deleteTask,
  toggleTaskComplete,
  checkActionType,
};
