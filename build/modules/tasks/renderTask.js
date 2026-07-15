export function renderTask(task, PRIORITY_MAP) {
  const wrapper = document.createElement("div");
  wrapper.className = "w-full";
  wrapper.dataset.taskId = task.id;

  const priority = PRIORITY_MAP[task.priority] ?? PRIORITY_MAP.normal;

  wrapper.innerHTML = `
    <div class="task group relative">
      <span class="${priority.spanClass} w-1 rounded-e-lg h-[80%] absolute top-1/2 -translate-y-1/2 inset-s-0"></span>

      <label for="task-status-chckbox-${task.id}">
        <input
          type="checkbox"
          name="task"
          id="task-status-chckbox-${task.id}"
          class="cursor-pointer hidden"
          ${task.completed ? "checked" : ""}
        />

        <div
          class="w-5 h-5 border rounded relative border-[#CCCCCC] group-has-[input:checked]:bg-primary-light group-has-[input:checked]:border-none cursor-pointer"
        >
          <span class="absolute inset-0 hidden items-center justify-center group-has-[input:checked]:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="size-3 stroke-white"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
        </div>
      </label>

      <div class="grow">
        <div class="flex flex-col md:flex-row gap-2 items-start justify-start">
          <p class="text-sm lg:text-base font-semibold dark:text-white group-has-[input:checked]:line-through">
            ${task.title}
          </p>

          <span class="badge ${priority.badgeClass} group-has-[input:checked]:hidden">
            ${priority.text}
          </span>
        </div>

        <p class="text-xs lg:text-sm text-[#7D7D7F] mt-2 group-has-[input:checked]:hidden">
          ${task.description}
        </p>
      </div>

      <div class="relative">
        <button
          type="button"
          id="task-more-btn"
          class="cursor-pointer text-[#525252] dark:text-white"
        >
          <svg width="4" height="18" viewBox="0 0 4 18" fill="none" class="fill-current">
            <circle cx="2" cy="2" r="2" />
            <circle cx="2" cy="9" r="2" />
            <circle cx="2" cy="16" r="2" />
          </svg>
        </button>

        <div
          id="task-dropdown"
          class="flex hidden absolute inset-e-5 top-0 mt-1 w-28 rounded-lg border border-neutral-200 dark:border-[#3D3D3D] bg-card-light dark:bg-[#0B192D] shadow-[0px_12px_24px_-6px_#1414190F] z-10 overflow-hidden items-center py-2"
        >
          <button
            type="button"
            id="task-edit-btn"
            class="w-full text-black dark:text-white cursor-pointer border-e border-e-gray-400"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mx-auto stroke-current">
              <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            id="task-delete-btn"
            class="w-full text-black dark:text-white cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="stroke-current mx-auto">
              <path d="M4 7H20M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7M10 12L14 16M14 12L10 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  return wrapper;
}
