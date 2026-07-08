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
