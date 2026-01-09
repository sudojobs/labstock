import { db, auth } from "./firebase.js";
import {
  collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function getComponents() {
  const q = query(
    collection(db, "components"),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function loadComponents() {
  const view = document.getElementById("view");

  view.innerHTML = `
    <div class="card">
      <h3>Add Component</h3>
      <input id="compName" placeholder="Component name">
      <input id="compQty" type="number" placeholder="Quantity">
      <button id="addCompBtn">Add Component</button>
    </div>
    <div id="compList"></div>
  `;

  document.getElementById("addCompBtn").onclick = async () => {
    await addDoc(collection(db, "components"), {
      name: compName.value,
      quantity: Number(compQty.value),
      ownerId: auth.currentUser.uid,
      createdAt: Date.now()
    });
    loadComponents();
  };

  const comps = await getComponents();
  document.getElementById("compList").innerHTML =
    comps.map(c => `<div class="card">🔩 ${c.name} (${c.quantity})</div>`).join("") ||
    `<p>No components yet</p>`;
}
