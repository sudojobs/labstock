import { db } from "./firebase.js";
import {
  collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { auth } from "./firebase.js";

export async function addComponent(data) {
  await addDoc(collection(db, "components"), {
    ...data,
    ownerId: auth.currentUser.uid,
    updatedAt: Date.now()
  });
}

import { loadingState, emptyState } from "./ui.js";

export async function loadComponents(filter = {}) {
  const view = document.getElementById("view");
  view.innerHTML = loadingState();

  const components = await getComponents(filter);

  if (!components.length) {
    view.innerHTML = emptyState(
      "No Components",
      "Add components or scan a box QR code"
    );
    return;
  }

  view.innerHTML = components.map(c => `
    <div class="card">
      <h3>${c.name}</h3>
      <p>Qty: ${c.quantity}</p>
    </div>
  `).join("");
}

export async function getComponents(filter = {}) {
  let q = query(
    collection(db, "components"),
    where("ownerId", "==", auth.currentUser.uid)
  );

  if (filter.boxId) {
    q = query(q, where("boxId", "==", filter.boxId));
  }

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
