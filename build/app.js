import { toggleSidebar } from "./modules/sidebar/toggleSidebar.js";
import { toggleTheme } from "./modules/theme/toggleTheme.js";
import { currentDate } from "./modules/date/currentDate.js";

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

// current date
currentDate({
  headerEl: document.getElementById("user-profile-current-date"),
  sidebarEl: document.getElementById("sidebar-user-profile-current-date"),
});
