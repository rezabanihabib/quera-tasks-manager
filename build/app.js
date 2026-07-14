import { toggleSidebar } from "./modules/sidebar/toggleSidebar.js";
import { toggleTheme } from "./modules/theme/toggleTheme.js";
import { currentDate } from "./modules/date/currentDate.js";
import { taskForm } from "./modules/tasks/taskForm.js";

// toggle sidebar
toggleSidebar({
  menuBtn: document.getElementById("menu-btn"),
  sidebar: document.getElementById("sidebar"),
  overlay: document.getElementById("sidebar-overlay"),
  closeBtn: document.getElementById("close-sidebar-btn"),
}).init();

// toggle theme
toggleTheme({
  lightBtn: document.getElementById("light-btn"),
  darkBtn: document.getElementById("dark-btn"),
}).init();

// current date
currentDate({
  headerEl: document.getElementById("user-profile-current-date"),
  sidebarEl: document.getElementById("sidebar-user-profile-current-date"),
});

// task form
const createTaskBtn = document.getElementById("create-task-btn-el");
const taskBtnSection = document.getElementById("create-task-btn-section");

createTaskBtn.addEventListener("click", () => {
  if (document.querySelector("#task-form")) return;
  taskBtnSection.classList.add("hidden");

  taskBtnSection.after(
    taskForm({
      mode: "create",
      onCloseForm(form) {
        form.remove();
        taskBtnSection.classList.remove("hidden");
      },
      onSubmitForm(form) {
        form.remove();
        // TODO: implement task create / update
      },
    }),
  );
});
