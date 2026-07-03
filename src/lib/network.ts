import { portalMinLevel } from "@/data/network";

export function generateNetworkReference(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function verificationLabel(level: number) {
  if (level >= 5) return "Level 5 — Chain of custody";
  if (level >= 4) return "Level 4 — Assay verified";
  if (level >= 3) return "Level 3 — Product verified";
  if (level >= 2) return "Level 2 — License verified";
  if (level >= 1) return "Level 1 — Identity verified";
  return "Pending verification";
}

export function isPortalVisible(level: number) {
  return level >= portalMinLevel;
}

export function anonymizeLocation(location: string) {
  const parts = location.split(",").map((p) => p.trim());
  if (parts.length > 1) return parts[parts.length - 1];
  return location;
}