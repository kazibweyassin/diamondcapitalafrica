import { randomUUID } from "crypto";

export function generatePortalPassword() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}