const assignments = [
 { id: 1, title: "Read Chapter 2: Introduction to Psychology", dueDate: "2026-11-10", completed: false },
 { id: 2, title: "Submit Calculus Problem Set 3", dueDate: "2026-11-12", completed: false },
 { id: 3, title: "Prepare Biology Lab Notes", dueDate: "2026-11-14", completed: true },
 { id: 4, title: "Write a short history reflection", dueDate: "2026-11-18", completed: false }
];
let currentFilter = "all";
const list = document.querySelector("#assignment-list");
const count = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
function renderAssignments() {
 const visible = assignments.filter(task => currentFilter === "all" || (currentFilter === "pending" && !task.completed) || (currentFilter === "completed" && task.completed));
 list.replaceChildren();
 visible.forEach(task => {
  const item = document.createElement("li");
  item.className = `assignment${task.completed ? " is-complete" : ""}`;
  const checkbox = document.createElement("input"); checkbox.className = "check"; checkbox.type = "checkbox"; checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark ${task.title} as completed`);
  checkbox.addEventListener("change", () => { task.completed = checkbox.checked; renderAssignments(); });
  const copy = document.createElement("div"); copy.className = "task-copy";
  const title = document.createElement("span"); title.className = "task-title"; title.textContent = task.title;
  const due = document.createElement("span"); due.className = "task-due"; due.textContent = `Due ${dateFormatter.format(new Date(`${task.dueDate}T00:00:00Z`))}`;
  copy.append(title, due);
  const status = document.createElement("span"); status.className = `status${task.completed ? " done" : ""}`; status.textContent = task.completed ? "Completed" : "Pending";
  item.append(checkbox, copy, status); list.append(item);
 });
 emptyState.hidden = visible.length > 0;
 count.textContent = `${assignments.filter(task => !task.completed).length} pending`;
}
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
 currentFilter = button.dataset.filter;
 document.querySelectorAll(".filter").forEach(filter => { const selected = filter === button; filter.classList.toggle("active", selected); filter.setAttribute("aria-pressed", String(selected)); });
 renderAssignments();
}));
renderAssignments();
