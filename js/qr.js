import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm";
import { getBoxes } from "./boxes.js";

export async function loadQR() {
  const view = document.getElementById("view");
  const boxes = await getBoxes();

  if (!boxes.length) {
    view.innerHTML = `<p>Create boxes first to generate QR codes</p>`;
    return;
  }

  view.innerHTML = boxes.map(b => `
    <div class="card">
      <h4>${b.name}</h4>
      <img id="qr-${b.id}">
    </div>
  `).join("");

  for (const b of boxes) {
    const url = `${location.origin}/?box=${b.id}`;
    document.getElementById(`qr-${b.id}`).src =
      await QRCode.toDataURL(url);
  }
}
