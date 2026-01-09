import { db, auth } from "./firebase.js";
import {
  collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function getShelves() {
  const q = query(
    collection(db, "shelves"),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function loadShelves() {
  const view = document.getElementById("view");

  view.innerHTML = `
    <div class="card">
      <h3>Add Shelf</h3>
      <input id="shelfName" placeholder="Shelf name">
      <button id="addShelfBtn">Add Shelf</button>
    </div>
    <div id="shelfList"></div>
  `;

  document.getElementById("addShelfBtn").onclick = async () => {
    const name = document.getElementById("shelfName").value;
    if (!name) return alert("Enter shelf name");

    await addDoc(collection(db, "shelves"), {
      name,
      ownerId: auth.currentUser.uid,
      createdAt: Date.now()
    });

    loadShelves();
  };

  const shelves = await getShelves();
  const list = document.getElementById("shelfList");

  list.innerHTML = shelves.length
    ? shelves.map(s => `<div class="card">📚 ${s.name}</div>`).join("")
    : `<p>No shelves yet</p>`;
}

