import { getShelves } from "./shelves.js";
import { getBoxes } from "./boxes.js";
import { getComponents } from "./components.js";
import { getBoards } from "./boards.js";
import { db, auth } from "./firebase.js";
import {
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export function loadBackup() {
  const view = document.getElementById("view");

  view.innerHTML = `
    <div class="card">
      <h2>Backup & Restore</h2>

      <button id="exportBtn">Export Backup</button>

      <hr style="margin:16px 0">

      <input type="file" id="importFile" accept=".json">
      <p style="font-size:14px;color:#666">
        Import only backups created from this app.
      </p>
    </div>
  `;

  document.getElementById("exportBtn").onclick = exportBackup;
  document.getElementById("importFile").onchange = importBackup;
}

async function exportBackup() {
  const data = {
    shelves: await getShelves(),
    boxes: await getBoxes(),
    components: await getComponents(),
    boards: await getBoards()
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: "application/json" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "labstock-backup.json";
  a.click();
}

async function importBackup(e) {
  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    alert("Invalid backup file");
    return;
  }

  const uid = auth.currentUser.uid;

  for (const collectionName of ["shelves", "boxes", "components", "boards"]) {
    if (!Array.isArray(data[collectionName])) continue;

    for (const item of data[collectionName]) {
      const clean = { ...item };
      delete clean.id;

      // Force correct ownership
      clean.ownerId = uid;

      await addDoc(collection(db, collectionName), clean);
    }
  }

  alert("Restore completed successfully");
}
