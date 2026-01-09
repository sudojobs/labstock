import { getShelves } from "./shelves.js";
import { getBoxes } from "./boxes.js";
import { getComponents } from "./components.js";
import { getBoards } from "./boards.js";

export async function loadDashboard() {
  const view = document.getElementById("view");

  const shelves = await getShelves();
  const boxes = await getBoxes();
  const components = await getComponents();
  const boards = await getBoards();

  view.innerHTML = `
    <div class="card"><h3>📚 Shelves</h3><p>${shelves.length}</p></div>
    <div class="card"><h3>📦 Boxes</h3><p>${boxes.length}</p></div>
    <div class="card"><h3>🔩 Components</h3><p>${components.length}</p></div>
    <div class="card"><h3>🧠 Boards</h3><p>${boards.length}</p></div>
  `;
}
