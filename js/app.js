import { auth } from "./firebase.js";
import { logout } from "./auth.js";
import { initRouter } from "./router.js";

const authLoading = document.getElementById("auth-loading");
const app = document.getElementById("app");
const logoutBtn = document.getElementById("logoutBtn");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.replace("/login.html");
    return;
  }

  // AUTH OK → SHOW APP
  authLoading.style.display = "none";
  app.classList.remove("hidden");

  initRouter();
});

logoutBtn.onclick = logout;
