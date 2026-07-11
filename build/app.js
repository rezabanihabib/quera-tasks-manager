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

//open task form
const openTaskFormBtn = document.getElementById("open-task-form");
const taskForm = document.getElementById("task-form");

openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.remove("hidden");
  openTaskFormBtn.classList.add("hidden");
});
