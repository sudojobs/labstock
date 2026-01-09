import { auth } from "./firebase.js";
import { logout } from "./auth.js";
import { initRouter, navigate } from "./router.js";
import { loadComponents } from "./components.js";

const authLoading = document.getElementById("auth-loading");
const app = document.getElementById("app");
const logoutBtn = document.getElementById("logoutBtn");

// HARD AUTH GATE
auth.onAuthStateChanged(user => {
  if (!user) {
    // NOT logged in → go to login page
    window.location.replace("/login.html");
    return;
  }

  // Logged in → show app
  authLoading.style.display = "none";
  app.classList.remove("hidden");

  // Init router AFTER auth confirmed
  initRouter();

  // Handle QR deep links
  const params = new URLSearchParams(location.search);
  if (params.get("box")) {
    navigate("components");
    loadComponents({ boxId: params.get("box") });
    history.replaceState({}, "", "/");
  }
});

logoutBtn.onclick = logout;
