import { loadDashboard } from "./dashboard.js";
import { loadShelves } from "./shelves.js";
import { loadBoxes } from "./boxes.js";
import { loadComponents } from "./components.js";
import { loadBoards } from "./boards.js";
import { loadQR } from "./qr.js";
import { loadBackup } from "./backup.js";

const routes = {
  dashboard: loadDashboard,
  shelves: loadShelves,
  boxes: loadBoxes,
  components: loadComponents,
  boards: loadBoards,
  qr: loadQR,
  backup: loadBackup
};

export function initRouter() {
  // Nav button clicks
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.onclick = () => {
      location.hash = btn.dataset.view;
      navigate(btn.dataset.view);
    };
  renderRoute(); // initial load
    
  });

  // Load initial route
  const initial =
    location.hash.replace("#", "") || "dashboard";

  navigate(initial);

  // Back/forward navigation
  window.addEventListener("hashchange", () => {
    const view = location.hash.replace("#", "") || "dashboard";
    navigate(view);
  });
}


function renderRoute() {
  const view = location.hash.replace("#", "") || "dashboard";

  // 👉 ACTIVE SIDEBAR HIGHLIGHT (THIS IS WHERE)
  document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });

  routes[view]?.();
}



export function navigate(view) {
  const container = document.getElementById("view");
  container.innerHTML = "";

  if (!routes[view]) {
    console.warn("Unknown route:", view);
    return;
  }

  routes[view]();
}



