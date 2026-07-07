//sidebar//
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");
const closeBtn = document.getElementById("close-sidebar");

function openSidebar() {
  sidebar.classList.remove("translate-x-full");
  overlay.classList.remove("opacity-0", "invisible");
}

function closeSidebar() {
  sidebar.classList.add("translate-x-full");
  overlay.classList.add("opacity-0", "invisible");
}

menuBtn?.addEventListener("click", openSidebar);
closeBtn?.addEventListener("click", closeSidebar);
overlay?.addEventListener("click", closeSidebar);
//sidebar//

//date//
const today = new Date();

const date = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  day: "numeric",
  month: "long",
}).format(today);

document.getElementById("current-date-mobile").textContent = `امروز، ${date}`;
document.getElementById("current-date-desktop").textContent = date;
//date//

//dark-btn  light-btn//
const html = document.documentElement;

const lightBtn = document.getElementById("light-btn");
const darkBtn = document.getElementById("dark-btn");

function setLight() {
  html.classList.remove("dark");

  lightBtn.classList.add("bg-white", "shadow");
  darkBtn.classList.remove("bg-zinc-700", "text-white");
}

function setDark() {
  html.classList.add("dark");

  darkBtn.classList.add("bg-zinc-700", "text-white");
  lightBtn.classList.remove("bg-white", "shadow");
}

lightBtn.addEventListener("click", setLight);
darkBtn.addEventListener("click", setDark);

if (html.classList.contains("dark")) {
  setDark();
} else {
  setLight();
}
