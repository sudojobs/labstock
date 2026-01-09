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
