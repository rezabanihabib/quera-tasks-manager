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
  if (theme === "dark") {
    darkBtn.classList.add("bg-white", "dark:bg-zinc-700", "shadow-sm");
    lightBtn.classList.remove("bg-white", "dark:bg-zinc-700", "shadow-sm");
  } else {
    lightBtn.classList.add("bg-white", "dark:bg-zinc-700", "shadow-sm");
    darkBtn.classList.remove("bg-white", "dark:bg-zinc-700", "shadow-sm");
  }
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
