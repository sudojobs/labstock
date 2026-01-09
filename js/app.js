import { auth } from "./firebase.js";
import { logout } from "./auth.js";

auth.onAuthStateChanged(user => {
  if (!user) location.href = "/login.html";
});

logoutBtn.onclick = logout;

// QR AUTO FILTER
const params = new URLSearchParams(location.search);
if (params.get("box")) {
  document.getElementById("view").innerHTML =
    `<h2>Components in Box ${params.get("box")}</h2>`;
}
