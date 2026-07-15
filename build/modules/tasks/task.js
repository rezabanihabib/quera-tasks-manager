import { taskForm } from "./taskform.js";
import { renderTask } from "./renderTask.js";
import { renderTaskTitle } from "./renderTaskTitle.js";

const STORAGE_KEY = "tasks";
const LAST_ID_KEY = "last-task-id";

const PRIORITY_MAP = {
  low: { text: "پایین", spanClass: "bg-success", badgeClass: "badge-success" },
  normal: {
    text: "متوسط",
    spanClass: "bg-warning",
    badgeClass: "badge-warning",
  },
  high: { text: "بالا", spanClass: "bg-danger", badgeClass: "badge-danger" },
};

const TODAY_TITLE_ID = "today-tasks-title";
const COMPLETED_TITLE_ID = "completed-tasks-title";
const PLACEHOLDER_ID = "tasks-placeholder";

const CREATE_BTN_SECTION_SELECTOR = "#create-task-btn-section";
const COMPLETED_SECTION_SELECTOR = "#completed-tasks-section";

/* ---------------------------------------------------
 * HELPERS
 * --------------------------------------------------- */

function getNextId() {
  const lastId = Number(localStorage.getItem(LAST_ID_KEY)) || 0;
  const nextId = lastId + 1;
  localStorage.setItem(LAST_ID_KEY, String(nextId));
  return nextId;
}

function getTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const tasks = raw ? JSON.parse(raw) : [];
    return Array.isArray(tasks) ? tasks : [];
  } catch {
    return [];
  }
}

function getPendingTasks() {
  return getTasks().filter((t) => !t.completed);
}

function getCompletedTasks() {
  return getTasks().filter((t) => t.completed);
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function findTaskIndex(tasks, id) {
  return tasks.findIndex((t) => t.id === id);
}

function checkActionType(data) {
  if (data.id) {
    return editTask(data.id, data);
  }
  return createTask(data);
}

function closeAllDropdowns() {
  document
    .querySelectorAll("#task-dropdown")
    .forEach((d) => d.classList.add("hidden"));
}

/* ---------------------------------------------------
 * CRUD
 * --------------------------------------------------- */

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

function editTask(id, { title, description, priority }) {
  const tasks = getTasks();
  const index = findTaskIndex(tasks, id);
  if (index === -1) return null;

  tasks[index] = { ...tasks[index], title, description, priority };
  saveTasks(tasks);
  return tasks[index];
}

function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
}

/* ---------------------------------------------------
 * SETTING ACTIONS
 * --------------------------------------------------- */

function toggleTaskComplete(id) {
  const tasks = getTasks();
  const index = findTaskIndex(tasks, id);
  if (index === -1) return null;

  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  return tasks[index];
}

/* ---------------------------------------------------
 * DYNAMIC SECTIONS
 * --------------------------------------------------- */

function getSectionRefs(pendingContainer) {
  return {
    createBtnSection: document.querySelector(CREATE_BTN_SECTION_SELECTOR),
    pendingContainer,
    completedContainer: document.querySelector(COMPLETED_SECTION_SELECTOR),
  };
}

function renderPlaceholder() {
  const section = document.createElement("section");
  section.id = PLACEHOLDER_ID;
  section.className = "mt-12 px-4";
  section.innerHTML = `
    <div class="flex flex-col items-center justify-center text-center">
      <img
        src="./src/assets/img/tasks-placeholder.png"
        alt="tasks-placeholder"
        class="w-53 h-43 mb-8 lg:w-71 lg:h-58"
      />
      <h3 class="font-extrabold text-[#7D7D7F]">
        چه کارهایی امروز برای انجام داری؟
      </h3>
      <p class="mt-3 max-w-sm text-sm font-semibold text-[#AFAEB2] leading-6">
        میتونی الان تسک‌هاتو اینجا بنویسی و برنامه ریزی رو شروع کنی!
      </p>
    </div>
  `;
  return section;
}

function updateDynamicUI(refs) {
  const tasks = getTasks();
  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  // placeholder
  let placeholder = document.getElementById(PLACEHOLDER_ID);
  if (tasks.length === 0) {
    if (!placeholder) {
      refs.createBtnSection?.after(renderPlaceholder());
    }
  } else if (placeholder) {
    placeholder.remove();
  }

  // today task title
  let todayTitle = document.getElementById(TODAY_TITLE_ID);
  if (!todayTitle) {
    todayTitle = renderTaskTitle({
      title: "تسک های امروز",
      count: pending.length,
      label:
        pending.length > 0
          ? "تسک را باید انجام دهید"
          : "تسکی برای انجام ندارید",
    });
    todayTitle.id = TODAY_TITLE_ID;
    refs.createBtnSection?.before(todayTitle);
  } else {
    const countEl = todayTitle.querySelector("p");
    if (countEl)
      countEl.textContent =
        pending.length > 0
          ? `${pending.length ? pending.length : ""} تسک را باید انجام دهید`
          : "تسکی برای انجام ندارید";
  }

  // completed tasks section
  let completedTitle = document.getElementById(COMPLETED_TITLE_ID);
  if (completed.length > 0) {
    if (!completedTitle) {
      completedTitle = renderTaskTitle({
        title: "تسک های انجام شده",
        count: completed.length,
        label: "تسک انجام شده",
      });
      completedTitle.id = COMPLETED_TITLE_ID;
      refs.completedContainer?.prepend(completedTitle);
    } else {
      const countEl = completedTitle.querySelector("p");
      if (countEl) countEl.textContent = `${completed.length} تسک انجام شده`;
      if (refs.completedContainer?.firstElementChild !== completedTitle) {
        refs.completedContainer?.prepend(completedTitle);
      }
    }
  } else if (completedTitle) {
    completedTitle.remove();
  }
}

function placeTaskItem(itemEl, task, refs, { prependIfPending = false } = {}) {
  if (task.completed) {
    refs.completedContainer?.appendChild(itemEl);
  } else if (prependIfPending) {
    refs.pendingContainer?.prepend(itemEl);
  } else {
    refs.pendingContainer?.appendChild(itemEl);
  }
}

/* ---------------------------------------------------
 * WIRE ITEM
 * --------------------------------------------------- */

function wireTaskItem(itemEl, task, refs) {
  const moreBtn = itemEl.querySelector("#task-more-btn");
  const dropdown = itemEl.querySelector("#task-dropdown");
  const checkbox = itemEl.querySelector('input[type="checkbox"]');
  const editBtn = itemEl.querySelector("#task-edit-btn");
  const deleteBtn = itemEl.querySelector("#task-delete-btn");

  moreBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains("hidden");
    closeAllDropdowns();
    if (isHidden) dropdown.classList.remove("hidden");
  });

  checkbox.addEventListener("change", () => {
    const updated = toggleTaskComplete(task.id);
    if (!updated) return;

    itemEl.remove();
    const newItem = renderTask(updated, PRIORITY_MAP);
    wireTaskItem(newItem, updated, refs);
    placeTaskItem(newItem, updated, refs);
    updateDynamicUI(refs);
  });

  deleteBtn.addEventListener("click", () => {
    dropdown.classList.add("hidden");
    deleteTask(task.id);
    itemEl.remove();
    updateDynamicUI(refs);
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
        wireTaskItem(newItem, updated, refs);
        itemEl.replaceWith(newItem);
      },
    });

    itemEl.after(editForm);
  });
}

/* ---------------------------------------------------
 * RENDER
 * --------------------------------------------------- */

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
