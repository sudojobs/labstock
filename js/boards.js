import { db } from "./firebase.js";
import {
  collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { auth } from "./firebase.js";

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
