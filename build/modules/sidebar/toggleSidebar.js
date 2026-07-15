export function toggleSidebar({ menuBtn, sidebar, overlay, closeBtn }) {
  function open() {
    overlay.classList.remove("hidden");

    requestAnimationFrame(() => {
      overlay.classList.remove("opacity-0");
      overlay.classList.add("opacity-100");
    });

    sidebar.classList.replace("translate-x-full", "translate-x-0");
  }

  function close() {
    sidebar.classList.replace("translate-x-0", "translate-x-full");

    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0");

    overlay.addEventListener(
      "transitionend",
      () => {
        overlay.classList.add("hidden");
      },
      { once: true },
    );
  }

  function init() {
    menuBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);
  }

  return { init, open, close };
}
