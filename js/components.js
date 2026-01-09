import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

/* =========================
   FETCH COMPONENTS (DATA)
========================= */
export async function getComponents() {
  const q = query(
    collection(db, "components"),
    where("ownerId", "==", auth.currentUser.uid)
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* =========================
   LOAD COMPONENTS UI
========================= */
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
    const name = document.getElementById("compName").value.trim();
    const qty = Number(document.getElementById("compQty").value);

    if (!name || !qty) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "components"), {
      name,
      quantity: qty,
      ownerId: auth.currentUser.uid,
      createdAt: Date.now()
    });

    loadComponents(); // reload list
  };

  const comps = await getComponents();

  document.getElementById("compList").innerHTML =
    comps.length
      ? comps.map(c =>
          `<div class="card">🔩 ${c.name} (Qty: ${c.quantity})</div>`
        ).join("")
      : `<p>No components added yet</p>`;
}
