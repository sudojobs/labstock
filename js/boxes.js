import { db } from "./firebase.js";
import {
  collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { auth } from "./firebase.js";
import { emptyState } from "./ui.js";

export async function loadBoxes() {
  const view = document.getElementById("view");
  const boxes = await getBoxes();

  if (!boxes.length) {
    view.innerHTML = emptyState(
      "No Boxes Created",
      "Create boxes and print QR codes"
    );
    return;
  }

  view.innerHTML = boxes.map(b => `
    <div class="card">
      <h3>${b.name}</h3>
      <p>Shelf: ${b.shelfId || "—"}</p>
    </div>
  `).join("");
}

export async function addBox(name, shelfId) {
  await addDoc(collection(db, "boxes"), {
    name,
    shelfId,
    ownerId: auth.currentUser.uid,
    createdAt: Date.now()
  });
}

export async function getBoxes() {
  const q = query(
    collection(db, "boxes"),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
