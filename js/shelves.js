export async function loadShelves() {
  const view = document.getElementById("view");

  view.innerHTML = `
    <div class="page-title">📚 Shelves</div>

    <div class="section">
      <div class="card">
        <h3>Add Shelf</h3>
        <input id="shelfName" placeholder="Shelf name">
        <button id="addShelfBtn">Add Shelf</button>
      </div>
    </div>

    <div class="section" id="shelfList"></div>
  `;

  document.getElementById("addShelfBtn").onclick = async () => {
    const name = document.getElementById("shelfName").value.trim();
    if (!name) return alert("Enter shelf name");

    await addDoc(collection(db, "shelves"), {
      name,
      ownerId: auth.currentUser.uid,
      createdAt: Date.now()
    });

    loadShelves();
  };

  const shelves = await getShelves();
  const list = document.getElementById("shelfList");

  list.innerHTML = shelves.length
    ? shelves.map(s => `
        <div class="card">📚 ${s.name}</div>
      `).join("")
    : `<p>No shelves created yet</p>`;
}
