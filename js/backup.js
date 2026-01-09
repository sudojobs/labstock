import { getShelves } from "./shelves.js";
import { getBoxes } from "./boxes.js";
import { getComponents } from "./components.js";
import { getBoards } from "./boards.js";
import { db } from "./firebase.js";
import { addDoc, collection } from
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function loadBackup() {
  const view = document.getElementById("view");

  view.innerHTML = `
    <div class="card">
      <h2>Backup / Restore</h2>
      <button id="export">Export Backup</button>
      <input type="file" id="importFile">
    </div>
  `;

  export.onclick = async () => {
    const data = {
      shelves: await getShelves(),
      boxes: await getBoxes(),
      components: await getComponents(),
      boards: await getBoards()
    };
    download(data);
  };

  importFile.onchange = async e => {
    const file = e.target.files[0];
    const data = JSON.parse(await file.text());
    for (const k in data) {
      for (const item of data[k]) {
        delete item.id;
        await addDoc(collection(db, k), item);
      }
    }
    alert("Restore complete");
  };
}

function download(obj) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(obj, null, 2)])
  );
  a.download = "labstock-backup.json";
  a.click();
}
