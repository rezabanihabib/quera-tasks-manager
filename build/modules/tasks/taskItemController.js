import { taskForm } from "./taskform.js";
import { renderTask } from "./renderTask.js";
import { PRIORITY_MAP } from "./constants.js";
import {
  toggleTaskComplete,
  deleteTask,
  checkActionType,
} from "./taskService.js";
import {
  placeTaskItem,
  updateDynamicUI,
  closeAllDropdowns,
} from "./taskDom.js";

export function wireTaskItem(itemEl, task, refs) {
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
