export function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.position = "fixed";
  t.style.bottom = "20px";
  t.style.left = "50%";
  t.style.transform = "translateX(-50%)";
  t.style.background = "#333";
  t.style.color = "#fff";
  t.style.padding = "10px 16px";
  t.style.borderRadius = "6px";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

export function confirmBox(msg) {
  return confirm(msg);
}

export function emptyState(title, message) {
  return `
    <div class="card" style="text-align:center;opacity:.8">
      <img src="/assets/empty.svg" style="width:120px;margin:20px auto">
      <h3>${title}</h3>
      <p>${message}</p>
    </div>
  `;
}
