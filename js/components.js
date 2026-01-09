import { getBoxes } from "./boxes.js";



export async function loadComponents() {
  const view = document.getElementById("view");
  const boxes = await getBoxes();

view.innerHTML = `
  <div class="page-title">🔩 Components</div>

  <div class="card">
    <h3>Add Component</h3>

    <input id="compName" placeholder="Component name">
    <input id="compQty" type="number" placeholder="Quantity">

    <select id="compBox">
      <option value="">Select Box</option>
      ${boxes.map(b => `
        <option value="${b.id}">${b.name}</option>
      `).join("")}
    </select>

    <button id="addCompBtn">Add Component</button>
  </div>

  <div id="compList"></div>
`;


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

    
    await addDoc(collection(db, "components"), {
      name,
      quantity: qty,
      ownerId: auth.currentUser.uid,
      createdAt: Date.now()
    });

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
