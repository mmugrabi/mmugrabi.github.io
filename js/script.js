const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function showTab(tab) {
  tabs.forEach((t) => {
    const active = t === tab;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", active);
    t.tabIndex = active ? 0 : -1;
  });

  panels.forEach((p) => {
    const active = p.id === "panel-" + tab.dataset.target;
    p.classList.toggle("active", active);
    p.hidden = !active;
  });
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => showTab(tab));

  // Left/Right arrow keys move between tabs
  tab.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    showTab(next);
  });
});

/* Theme picker */
const toggle = document.getElementById("theme-toggle");
const menu = document.getElementById("theme-menu");
const options = menu.querySelectorAll("button");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  options.forEach((o) => o.classList.toggle("selected", o.dataset.theme === theme));
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
}

function closeMenu() {
  menu.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
}

toggle.addEventListener("click", () => {
  const open = menu.hidden;
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", open);
});

options.forEach((o) =>
  o.addEventListener("click", () => {
    setTheme(o.dataset.theme);
    closeMenu();
  })
);

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Mark the current theme in the menu on load
setTheme(document.documentElement.dataset.theme);