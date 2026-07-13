// toggle sidebar
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const closeBtn = document.getElementById("close-sidebar-btn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-full");
  overlay.classList.remove("opacity-0", "invisible");

  sidebar.classList.add("translate-x-0");
  overlay.classList.add("opacity-100", "visible");
});

closeBtn.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);

function closeSidebar() {
  sidebar.classList.add("translate-x-full");
  overlay.classList.add("opacity-0", "invisible");

  sidebar.classList.remove("translate-x-0");
  overlay.classList.remove("opacity-100", "visible");
}

// theme toggle
const lightBtn = document.getElementById("light-btn");
const darkBtn = document.getElementById("dark-btn");

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }

  updateButtons(theme);
}

function updateButtons(theme) {
  darkBtn.classList.toggle("sidebar-theme-btn-active", theme === "dark");
  lightBtn.classList.toggle("sidebar-theme-btn-active", theme !== "dark");
}

// click events
lightBtn.addEventListener("click", () => setTheme("light"));
darkBtn.addEventListener("click", () => setTheme("dark"));

(function initTheme() {
  let savedTheme = localStorage.theme;

  if (!savedTheme) {
    savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  setTheme(savedTheme);
})();

// show today date
const today = new Date();

const parts = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).formatToParts(today);

const weekday = parts.find((p) => p.type === "weekday").value;
const day = parts.find((p) => p.type === "day").value;
const month = parts.find((p) => p.type === "month").value;
const year = parts.find((p) => p.type === "year").value;

const fullDate = `${weekday}، ${day} ${month} ${year}`;

document.getElementById("user-profile-current-date").textContent =
  `امروز، ${fullDate}`;
document.getElementById("sidebar-user-profile-current-date").textContent =
  fullDate;
//task settings btn
const menuButtons = document.querySelectorAll(".menu-btn");

menuButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".menu").forEach((menu) => {
      if (menu !== button.nextElementSibling) {
        menu.classList.add("hidden");
      }
    });
    button.nextElementSibling.classList.toggle("hidden");
  });
});

// close if click on screen
document.addEventListener("click", () => {
  document.querySelectorAll(".menu").forEach((menu) => {
    menu.classList.add("hidden");
  });
});
document.querySelectorAll(".menu").forEach((menu) => {
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
//delete task
document.querySelectorAll(".delete-task").forEach((button) => {
  button.addEventListener("click", function () {
    this.closest(".task").remove();
  });
});
//edit btn
const editButtons = document.querySelectorAll(".edit-task");

const taskForm = document.getElementById("task-form-setting");
const titleInput = document.getElementById("task-title-input");
const descriptionInput = document.getElementById("task-desc-input");

let currentTask = null;

editButtons.forEach((button) => {
  button.addEventListener("click", function () {
    currentTask = this.closest(".task");

    const title = currentTask
      .querySelector("p.font-semibold")
      .textContent.trim();
    const description = currentTask
      .querySelector("p.text-xs")
      .textContent.trim();

    titleInput.value = title;
    descriptionInput.value = description;

    taskForm.classList.remove("hidden");

    document.querySelectorAll(".menu").forEach((menu) => {
      menu.classList.add("hidden");
    });
  });
});
