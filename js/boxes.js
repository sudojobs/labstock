import { getShelves } from "./shelves.js";


export async function loadBoxes() {
  const view = document.getElementById("view");

  const shelves = await getShelves();

view.innerHTML = `
  <div class="page-title">📦 Boxes</div>

  <div class="card">
    <h3>Add Box</h3>
    <input id="boxName" placeholder="Box name">

    <select id="boxShelf">
      <option value="">Select Shelf</option>
      ${shelves.map(s => `
        <option value="${s.id}">${s.name}</option>
      `).join("")}
    </select>

    <button id="addBoxBtn">Add Box</button>
  </div>

  <div id="boxList"></div>
`;

  await addDoc(collection(db, "boxes"), {
  name,
  shelfId: boxShelf.value,
  ownerId: auth.currentUser.uid,
  createdAt: Date.now()
});

  view.innerHTML = `
    <div class="page-title">📦 Boxes</div>

    <div class="section">
      <div class="card">
        <h3>Add Box</h3>
        <input id="boxName" placeholder="Box name">
        <button id="addBoxBtn">Add Box</button>
      </div>
    </div>

    <div class="section" id="boxList"></div>
  `;

  
  document.getElementById("addBoxBtn").onclick = async () => {
    const name = document.getElementById("boxName").value.trim();
    if (!name) return alert("Enter box name");

    await addDoc(collection(db, "boxes"), {
      name,
      ownerId: auth.currentUser.uid,
      createdAt: Date.now()
    });

    loadBoxes();
  };

  const boxes = await getBoxes();
  document.getElementById("boxList").innerHTML =
    boxes.length
      ? boxes.map(b => `<div class="card">📦 ${b.name}</div>`).join("")
      : `<p>No boxes yet</p>`;
}
