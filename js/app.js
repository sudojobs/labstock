import { auth } from "./firebase.js";
import { logout } from "./auth.js";
import { initRouter, navigate } from "./router.js";
import { loadComponents } from "./components.js";

const logoutBtn = document.getElementById("logoutBtn");

// Auth guard
auth.onAuthStateChanged(user => {
  if (!user) {
    location.href = "/login.html";
    return;
  }

  // Start router after auth
  initRouter();

  // Handle QR deep links
  const params = new URLSearchParams(location.search);

  if (params.get("box")) {
    navigate("components");
    loadComponents({ boxId: params.get("box") });
    history.replaceState({}, "", "/");
  }

  if (params.get("shelf")) {
    navigate("components");
    loadComponents({ shelfId: params.get("shelf") });
    history.replaceState({}, "", "/");
  }
});

if (logoutBtn) {
  logoutBtn.onclick = logout;
}
