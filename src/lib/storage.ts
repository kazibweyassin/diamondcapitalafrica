import type { Enquiry } from "@/types";

const ENQUIRIES_KEY = "dca_enquiries";
const COOKIE_CONSENT_KEY = "dca_cookie_consent";

export function saveEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt">) {
  const record: Enquiry = {
    ...enquiry,
    id: `DCA-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };

  const existing = getEnquiries();
  existing.unshift(record);
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(existing.slice(0, 50)));
  return record;
}

export function getEnquiries(): Enquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ENQUIRIES_KEY);
    return raw ? (JSON.parse(raw) as Enquiry[]) : [];
  } catch {
    return [];
  }
}

export function setCookieConsent(accepted: boolean) {
  localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? "accepted" : "declined");
}

export function getCookieConsent(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY);
}