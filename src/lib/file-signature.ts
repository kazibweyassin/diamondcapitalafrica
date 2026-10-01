const allowed = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

export function isAllowedDocumentType(type: string) {
  return allowed.has(type);
}

export async function detectedFileType(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const hex = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  if (hex.startsWith("ffd8ff")) return "image/jpeg";
  if (hex.startsWith("89504e470d0a1a0a")) return "image/png";
  if (
    hex.startsWith("52494646") &&
    new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
  ) {
    return "image/webp";
  }
  if (new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-") {
    return "application/pdf";
  }
  return null;
}
