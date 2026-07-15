import { renderTaskTitle } from "./renderTaskTitle.js";
import {
  TODAY_TITLE_ID,
  COMPLETED_TITLE_ID,
  PLACEHOLDER_ID,
  CREATE_BTN_SECTION_SELECTOR,
  COMPLETED_SECTION_SELECTOR,
} from "./constants.js";
import { getTasks } from "./taskStorage.js";

export function getSectionRefs(pendingContainer) {
  return {
    createBtnSection: document.querySelector(CREATE_BTN_SECTION_SELECTOR),
    pendingContainer,
    completedContainer: document.querySelector(COMPLETED_SECTION_SELECTOR),
  };
}

export function closeAllDropdowns() {
  document
    .querySelectorAll("#task-dropdown")
    .forEach((d) => d.classList.add("hidden"));
}

export function renderPlaceholder() {
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

export function updateDynamicUI(refs) {
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

export function placeTaskItem(
  itemEl,
  task,
  refs,
  { prependIfPending = false } = {},
) {
  if (task.completed) {
    refs.completedContainer?.appendChild(itemEl);
  } else if (prependIfPending) {
    refs.pendingContainer?.prepend(itemEl);
  } else {
    refs.pendingContainer?.appendChild(itemEl);
  }
}
