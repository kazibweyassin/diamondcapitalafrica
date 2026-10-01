import { portalMinLevel } from "@/data/network";

export function generateNetworkReference(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

export function verificationLabel(level: number) {
  if (level >= 5) return "Level 5: Chain of custody";
  if (level >= 4) return "Level 4: Assay verified";
  if (level >= 3) return "Level 3: Product verified";
  if (level >= 2) return "Level 2: License verified";
  if (level >= 1) return "Level 1: Identity verified";
  return "Pending verification";
}

export function isPortalVisible(level: number) {
  return level >= portalMinLevel;
}

/** Buyers only see a country. A single place name is treated as a site and hidden. */
export function anonymizeLocation(location: string) {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const country = parts[parts.length - 1];
    if (country.length >= 3) return country;
  }
  return "East Africa";
}

/** Drop a buyer-facing summary that names the supplier. */
export function buyerVisibleSummary(
  summary: string | null,
  supplierName: string,
) {
  const trimmed = summary?.trim() ?? "";
  if (!trimmed) return null;
  const name = supplierName.trim().toLowerCase();
  if (name.length >= 3 && trimmed.toLowerCase().includes(name)) return null;
  return trimmed;
}