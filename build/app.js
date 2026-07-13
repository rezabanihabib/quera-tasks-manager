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
//task checkbox
const todoList = document.querySelector("#todo-list .w-full");
const completedList = document.querySelector("#completed-list .w-full");

document.addEventListener("change", function (e) {
  if (
    e.target.id !== "task-status-chckbox" &&
    e.target.id !== "task-status-chckbox-comleted"
  ) {
    return;
  }

  const task = e.target.closest(".task");

  if (e.target.checked) {
    completedList.appendChild(task);
  } else {
    todoList.appendChild(task);
  }
});
//counter
function updateCounters() {
  const todoCount = document.querySelectorAll("#todo-list .task").length;

  const completedCount = document.querySelectorAll(
    "#completed-list .task",
  ).length;

  const todoText = document.getElementById("todo-count");
  const completedText = document.getElementById("completed-count");

  // متن تسک‌های امروز
  const savedTodo = localStorage.getItem("todoTasks");

  const savedCompleted = localStorage.getItem("completedTasks");

  if (savedTodo) {
    document.getElementById("todo-list").innerHTML = savedTodo;
  }

  if (savedCompleted) {
    document.getElementById("completed-list").innerHTML = savedCompleted;
  }
  if (todoCount === 0) {
    todoText.textContent = "تسکی برای امروز نداری!";
  } else if (todoCount === 1) {
    todoText.textContent = "1 تسک برای امروز";
  } else {
    todoText.textContent = `${todoCount} تسک برای امروز`;
  }

  // متن تسک‌های انجام شده
  if (completedCount === 0) {
    completedText.textContent = "هنوز تسکی انجام نشده";
  } else if (completedCount === 1) {
    completedText.textContent = "1 تسک انجام شده";
  } else {
    completedText.textContent = `${completedCount} تسک انجام شده`;
  }
}
