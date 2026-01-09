import { db } from "./firebase.js";
import {
  collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { auth } from "./firebase.js";

import { emptyState } from "./ui.js";

export async function loadBoards() {
  const view = document.getElementById("view");
  const boards = await getBoards();

  if (!boards.length) {
    view.innerHTML = emptyState(
      "No Boards Added",
      "Add development boards you own"
    );
    return;
  }

  view.innerHTML = boards.map(b => `
    <div class="card">
      <h3>${b.name}</h3>
      <p>${b.mcu}</p>
      <p>Qty: ${b.quantity}</p>
    </div>
  `).join("");
}


export async function addBoard(data) {
  await addDoc(collection(db, "boards"), {
    ...data,
    ownerId: auth.currentUser.uid
  });
}

export async function getBoards() {
  const q = query(
    collection(db, "boards"),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
