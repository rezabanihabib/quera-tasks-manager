import { taskForm } from "./taskform.js";
import { renderTask } from "./renderTask.js";

const STORAGE_KEY = "tasks";
const LAST_ID_KEY = "last-task-id";

const PRIORITY_MAP = {
  low: { text: "پایین", class: "badge-success" },
  normal: { text: "متوسط", class: "badge-warning" },
  high: { text: "بالا", class: "badge-danger" },
};

/* ---------------------------------------------------
 * HELPERS
 * --------------------------------------------------- */

// id generator
function getNextId() {
  const lastId = Number(localStorage.getItem(LAST_ID_KEY)) || 0;
  const nextId = lastId + 1;
  localStorage.setItem(LAST_ID_KEY, String(nextId));
  return nextId;
}

// get all tasks from storage
function getTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const tasks = raw ? JSON.parse(raw) : [];
    return Array.isArray(tasks) ? tasks : [];
  } catch {
    return [];
  }
}

// save all tasks to storage
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// get task index
function findTaskIndex(tasks, id) {
  return tasks.findIndex((t) => t.id === id);
}

// check action type
function checkActionType(data) {
  if (data.id) {
    return editTask(data.id, data);
  }
  return createTask(data);
}

// close all task settings dropdown menu
function closeAllDropdowns(container) {
  container
    .querySelectorAll("#task-dropdown")
    .forEach((d) => d.classList.add("hidden"));
}

/* ---------------------------------------------------
 * CRUD
 * --------------------------------------------------- */

// create task
function createTask({ title, description, priority }) {
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

// edit task
function editTask(id, { title, description, priority }) {
  const tasks = getTasks();
  const index = findTaskIndex(tasks, id);
  if (index === -1) return null;

  tasks[index] = { ...tasks[index], title, description, priority };
  saveTasks(tasks);
  return tasks[index];
}

//delete task
function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
}

/* ---------------------------------------------------
 * SETTING ACTIONS
 * --------------------------------------------------- */

// toggle task status
function toggleTaskComplete(id) {
  const tasks = getTasks();
  const index = findTaskIndex(tasks, id);
  if (index === -1) return null;

  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  return tasks[index];
}

// dropdown باز/بسته شدن + هندل کردن ویرایش و حذف
function wireTaskItem(itemEl, task, { container, onCloseAllDropdowns }) {
  const moreBtn = itemEl.querySelector("#task-more-btn");
  const dropdown = itemEl.querySelector("#task-dropdown");
  const checkbox = itemEl.querySelector('input[type="checkbox"]');
  const editBtn = itemEl.querySelector("#task-edit-btn");
  const deleteBtn = itemEl.querySelector("#task-delete-btn");

  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains("hidden");
    onCloseAllDropdowns();
    if (isHidden) dropdown.classList.remove("hidden");
  });

  checkbox.addEventListener("change", () => {
    toggleTaskComplete(task.id);
  });

  deleteBtn.addEventListener("click", () => {
    dropdown.classList.add("hidden");
    deleteTask(task.id);
    itemEl.remove();
  });

  editBtn.addEventListener("click", () => {
    if (document.querySelector("#task-form")) {
      document.querySelector("#task-form").remove();
    }
    dropdown.classList.add("hidden");

    const editForm = taskForm({
      mode: "edit",
      task,
      onCloseForm(form) {
        form.remove();
      },
      onSubmitForm(data) {
        const updated = checkActionType({ ...data, id: task.id });
        if (!updated) return;

        const newItem = renderTask(updated, PRIORITY_MAP);
        wireTaskItem(newItem, updated, { container, onCloseAllDropdowns });
        itemEl.replaceWith(newItem);
      },
    });

    itemEl.after(editForm);
  });
}

/* ---------------------------------------------------
 * RENDER
 * --------------------------------------------------- */

//  render all task
export function renderTaskList(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "";

  const tasks = getTasks();
  const onCloseAllDropdowns = () => closeAllDropdowns(container);

  tasks.forEach((task) => {
    const itemEl = renderTask(task, PRIORITY_MAP);
    wireTaskItem(itemEl, task, { container, onCloseAllDropdowns });
    container.appendChild(itemEl);
  });

  document.addEventListener("click", () => closeAllDropdowns(container));
}

// add task to list and save to storage
export function addTaskToList(containerSelector, data) {
  const container = document.querySelector(containerSelector);
  if (!container) return null;

  const task = checkActionType(data);
  const itemEl = renderTask(task, PRIORITY_MAP);
  const onCloseAllDropdowns = () => closeAllDropdowns(container);

  wireTaskItem(itemEl, task, { container, onCloseAllDropdowns });
  container.prepend(itemEl);

  return task;
}

export { getTasks, deleteTask, toggleTaskComplete, checkActionType };
