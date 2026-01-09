import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm";

export async function generateBoxQR(boxId) {
  const url = `${location.origin}/?box=${boxId}`;
  return await QRCode.toDataURL(url, { width: 300 });
}
