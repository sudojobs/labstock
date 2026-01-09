import { db } from "./firebase.js";
import {
  collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { auth } from "./firebase.js";

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
