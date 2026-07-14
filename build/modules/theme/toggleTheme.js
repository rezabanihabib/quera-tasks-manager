export function toggleTheme({ lightBtn, darkBtn }) {
  function apply(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    syncButtons(theme);
  }

  function syncButtons(theme) {
    darkBtn.classList.toggle("sidebar-theme-btn-active", theme === "dark");
    lightBtn.classList.toggle("sidebar-theme-btn-active", theme !== "dark");
  }

  function getCurrentTheme() {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  function init() {
    lightBtn.addEventListener("click", () => apply("light"));
    darkBtn.addEventListener("click", () => apply("dark"));

    syncButtons(getCurrentTheme());
  }

  return { init, apply };
}
