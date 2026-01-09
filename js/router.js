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
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.onclick = () => navigate(btn.dataset.view);
  });

  navigate("dashboard");
}

export function navigate(view) {
  document.getElementById("view").innerHTML = "";
  routes[view]?.();
}
