import { getBoxes } from "./boxes.js";



export async function loadComponents() {
  const view = document.getElementById("view");

  view.innerHTML = `
    <div class="page-title">🔩 Components</div>

    <div class="section">
      <div class="card">
        <h3>Add Component</h3>
        <input id="compName" placeholder="Component name">
        <input id="compQty" type="number" placeholder="Quantity">
        <button id="addCompBtn">Add Component</button>
      </div>
    </div>

    <div class="section" id="compList"></div>
  `;

  document.getElementById("addCompBtn").onclick = async () => {
    const name = compName.value.trim();
    const qty = Number(compQty.value);

    if (!name || !qty) return alert("Fill all fields");

    

    loadComponents();
  };

  const comps = await getComponents();
  document.getElementById("compList").innerHTML =
    comps.length
      ? comps.map(c =>
          `<div class="card">🔩 ${c.name} (Qty: ${c.quantity})</div>`
        ).join("")
      : `<p>No components added yet</p>`;
}
