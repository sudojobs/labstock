// js/firebase.js  (NO <script> TAGS, EVER)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBERvTvOgSm5LMhZnyvLeuBbxzfp4cEnp4",
  authDomain: "labstock-b7155.firebaseapp.com",
  projectId: "labstock-b7155",
  storageBucket: "labstock-b7155.appspot.com",
  messagingSenderId: "618343315522",
  appId: "1:618343315522:web:0e34a62c3efb2fb3aa55db"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
/script>
