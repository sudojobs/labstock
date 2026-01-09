import { db } from "./firebase.js";
import {
  collection, addDoc, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { auth } from "./firebase.js";

import { emptyState } from "./ui.js";

export async function loadShelves() {
  const view = document.getElementById("view");
  const shelves = await getShelves();

  if (!shelves.length) {
    view.innerHTML = emptyState(
      "No Shelves Yet",
      "Create your first shelf to organize components"
    );
    return;
  }

  view.innerHTML = shelves.map(s => `
    <div class="card">
      <h3>${s.name}</h3>
      <p>${s.description || ""}</p>
    </div>
  `).join("");
}

export async function addShelf(name, description) {
  await addDoc(collection(db, "shelves"), {
    name,
    description,
    ownerId: auth.currentUser.uid,
    createdAt: Date.now()
  });
}

export async function getShelves() {
  const q = query(
    collection(db, "shelves"),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
