import { toggleSidebar } from "./modules/sidebar/toggleSidebar.js";
import { toggleTheme } from "./modules/theme/toggleTheme.js";

// toggle sidebar
toggleSidebar({
  menuBtn: document.getElementById("menu-btn"),
  sidebar: document.getElementById("sidebar"),
  overlay: document.getElementById("sidebar-overlay"),
  closeBtn: document.getElementById("close-sidebar-btn"),
}).init();

// theme toggle
toggleTheme({
  lightBtn: document.getElementById("light-btn"),
  darkBtn: document.getElementById("dark-btn"),
}).init();

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
