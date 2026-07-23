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

const INVESTMENT_POPUP_DISMISSED_KEY = "dca_investment_popup_dismissed";
const INVESTMENT_POPUP_SESSION_KEY = "dca_investment_popup_session";
const DISMISS_DAYS = 30;

/** Returns true if the investment popup should stay hidden (30-day dismissal). */
export function isInvestmentPopupDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(INVESTMENT_POPUP_DISMISSED_KEY);
    if (!raw) return false;
    const dismissedAt = new Date(raw).getTime();
    if (Number.isNaN(dismissedAt)) return false;
    const expires = dismissedAt + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() < expires;
  } catch {
    return false;
  }
}

export function setInvestmentPopupDismissed() {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    INVESTMENT_POPUP_DISMISSED_KEY,
    new Date().toISOString()
  );
}

export function wasInvestmentPopupShownThisSession(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(INVESTMENT_POPUP_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markInvestmentPopupShownThisSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(INVESTMENT_POPUP_SESSION_KEY, "1");
  } catch {
    // sessionStorage may be unavailable
  }
}

export function setContactFormSuccessFlag() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem("dca_contact_form_success", "1");
  } catch {
    // ignore
  }
}

export function isContactFormSuccessSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem("dca_contact_form_success") === "1";
  } catch {
    return false;
  }
}