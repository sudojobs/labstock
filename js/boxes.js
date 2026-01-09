import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

/* =========================
   FETCH BOXES (DATA LAYER)
========================= */
export async function getBoxes() {
  const q = query(
    collection(db, "boxes"),
    where("ownerId", "==", auth.currentUser.uid)
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* =========================
   LOAD BOXES UI
========================= */
export async function loadBoxes() {
  const view = document.getElementById("view");

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
    if (!name) {
      alert("Enter box name");
      return;
    }

    await addDoc(collection(db, "boxes"), {
      name,
      ownerId: auth.currentUser.uid,
      createdAt: Date.now()
    });

    loadBoxes(); // reload list
  };

  const boxes = await getBoxes();

  document.getElementById("boxList").innerHTML =
    boxes.length
      ? boxes.map(b =>
          `<div class="card">📦 ${b.name}</div>`
        ).join("")
      : `<p>No boxes yet</p>`;
}
