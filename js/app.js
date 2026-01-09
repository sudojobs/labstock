import { auth } from "./firebase.js";
import { logout } from "./auth.js";

auth.onAuthStateChanged(user => {
  if (!user) location.href = "/login.html";
});

logoutBtn.onclick = logout;

const view = document.getElementById("view");
const params = new URLSearchParams(location.search);

if (params.get("box")) {
  loadBox(params.get("box"));
}

async function loadBox(boxId) {
  const comps = await getComponents({ boxId });
  view.innerHTML = comps.map(c => `
    <div class="card">
      <h3>${c.name}</h3>
      <p>Qty: ${c.quantity}</p>
    </div>
  `).join("");
}

// QR AUTO FILTER
const params = new URLSearchParams(location.search);
if (params.get("box")) {
  document.getElementById("view").innerHTML =
    `<h2>Components in Box ${params.get("box")}</h2>`;
}
