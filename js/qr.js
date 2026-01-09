import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm";

export async function generateBoxQR(boxId) {
  const url = `${location.origin}/?box=${boxId}`;
  return await QRCode.toDataURL(url, { width: 300 });
}

import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm";
import { getBoxes } from "./boxes.js";

export async function loadQR() {
  const view = document.getElementById("view");
  const boxes = await getBoxes();

  view.innerHTML = boxes.map(b => `
    <div class="card">
      <h3>${b.name}</h3>
      <img id="qr-${b.id}">
    </div>
  `).join("");

  boxes.forEach(async b => {
    const url = `${location.origin}/?box=${b.id}`;
    document.getElementById(`qr-${b.id}`).src =
      await QRCode.toDataURL(url);
  });
}
