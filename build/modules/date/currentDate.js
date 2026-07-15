export function currentDate({ headerEl, sidebarEl }) {
  const today = new Date();

  const parts = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(today);

  const get = (type) => parts.find((p) => p.type === type).value;

  const fullDate = `${get("weekday")}، ${get("day")} ${get("month")} ${get("year")}`;

  headerEl.textContent = `امروز، ${fullDate}`;
  sidebarEl.textContent = fullDate;
}
