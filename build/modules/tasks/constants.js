export const STORAGE_KEY = "tasks";
export const LAST_ID_KEY = "last-task-id";

export const PRIORITY_MAP = {
  low: { text: "پایین", spanClass: "bg-success", badgeClass: "badge-success" },
  normal: {
    text: "متوسط",
    spanClass: "bg-warning",
    badgeClass: "badge-warning",
  },
  high: { text: "بالا", spanClass: "bg-danger", badgeClass: "badge-danger" },
};

export const TODAY_TITLE_ID = "today-tasks-title";
export const COMPLETED_TITLE_ID = "completed-tasks-title";
export const PLACEHOLDER_ID = "tasks-placeholder";

export const CREATE_BTN_SECTION_SELECTOR = "#create-task-btn-section";
export const COMPLETED_SECTION_SELECTOR = "#completed-tasks-section";
