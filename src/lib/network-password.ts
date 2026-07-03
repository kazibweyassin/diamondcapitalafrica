export function generatePortalPassword() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}