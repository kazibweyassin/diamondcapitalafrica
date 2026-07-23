"use client";

import { useState } from "react";
import Link from "next/link";
import { investmentRanges, investorTypes } from "@/data/investment";
import { trackEvent } from "@/lib/analytics";

const inputClass =
  "w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold focus-visible:ring-2";

const initialForm = {
  name: "",
  organisation: "",
  position: "",
  email: "",
  country: "",
  investorType: investorTypes[0] as string,
  investmentRange: investmentRanges[0] as string,
  website: "",
  phone: "",
  message: "",
  consent: false,
  /** Honeypot — must stay empty */
  companyUrl: "",
};

export default function InvestorEnquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Full name is required";
    }
    if (!form.organisation.trim()) next.organisation = "Organisation is required";
    if (!form.position.trim()) next.position = "Position or role is required";
    if (!form.email.trim()) next.email = "Business email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.country.trim()) next.country = "Country is required";
    if (!form.investorType) next.investorType = "Select an investor type";
    if (!form.investmentRange) next.investmentRange = "Select an investment range";
    if (!form.consent) {
      next.consent = "Consent is required to submit this enquiry";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "investor",
          name: form.name.trim(),
          organisation: form.organisation.trim(),
          position: form.position.trim(),
          email: form.email.trim(),
          country: form.country.trim(),
          investorType: form.investorType,
          investmentRange: form.investmentRange,
          website: form.website.trim() || undefined,
          phone: form.phone.trim() || undefined,
          message: form.message.trim() || undefined,
          consent: form.consent,
          companyUrl: form.companyUrl,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setServerError(json.error ?? "Failed to submit enquiry");
        return;
      }

      setReferenceId(json.data.id);
      trackEvent("investor_enquiry_submitted", {
        investor_type: form.investorType,
      });
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceId) {
    return (
      <div
        className="rounded-lg border border-gold bg-section-alt p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-primary">Thank you for your interest</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Our team will review your information and contact you regarding the
          NDA, preliminary KYC and access to the confidential memorandum.
        </p>
        <p className="mt-3 text-sm text-muted">
          Reference:{" "}
          <strong className="text-foreground">{referenceId}</strong>
        </p>
        <button
          type="button"
          onClick={() => {
            setReferenceId("");
            setForm(initialForm);
            setErrors({});
          }}
          className="mt-6 text-sm font-semibold text-gold-dark transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {serverError && (
        <p
          className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          role="alert"
        >
          {serverError}
        </p>
      )}

      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="investor-company-url">Company website</label>
        <input
          id="investor-company-url"
          type="text"
          name="companyUrl"
          tabIndex={-1}
          autoComplete="off"
          value={form.companyUrl}
          onChange={(e) => setForm({ ...form, companyUrl: e.target.value })}
        />
      </div>

      {(
        [
          ["name", "Full name", "text", true],
          ["organisation", "Organisation", "text", true],
          ["position", "Position or role", "text", true],
          ["email", "Business email", "email", true],
          ["country", "Country", "text", true],
          ["website", "Company website or LinkedIn profile", "url", false],
          ["phone", "Telephone or WhatsApp", "tel", false],
        ] as const
      ).map(([key, label, type, required]) => (
        <div key={key}>
          <label htmlFor={`investor-${key}`} className="mb-1 block text-sm font-medium">
            {label}
            {required ? (
              <span className="text-gold-dark"> *</span>
            ) : (
              <span className="text-muted"> (optional)</span>
            )}
          </label>
          <input
            id={`investor-${key}`}
            type={type}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={inputClass}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={errors[key] ? `investor-${key}-error` : undefined}
            required={required}
            autoComplete={
              key === "email"
                ? "email"
                : key === "name"
                  ? "name"
                  : key === "phone"
                    ? "tel"
                    : key === "country"
                      ? "country-name"
                      : key === "organisation"
                        ? "organization"
                        : undefined
            }
          />
          {errors[key] && (
            <p id={`investor-${key}-error`} className="mt-1 text-xs text-red-500" role="alert">
              {errors[key]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="investor-type" className="mb-1 block text-sm font-medium">
          Investor type <span className="text-gold-dark">*</span>
        </label>
        <select
          id="investor-type"
          value={form.investorType}
          onChange={(e) => setForm({ ...form, investorType: e.target.value })}
          className={inputClass}
          required
          aria-invalid={Boolean(errors.investorType)}
        >
          {investorTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.investorType && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {errors.investorType}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="investor-range" className="mb-1 block text-sm font-medium">
          Indicative investment range <span className="text-gold-dark">*</span>
        </label>
        <select
          id="investor-range"
          value={form.investmentRange}
          onChange={(e) => setForm({ ...form, investmentRange: e.target.value })}
          className={inputClass}
          required
          aria-invalid={Boolean(errors.investmentRange)}
        >
          {investmentRanges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.investmentRange && (
          <p className="mt-1 text-xs text-red-500" role="alert">
            {errors.investmentRange}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="investor-message" className="mb-1 block text-sm font-medium">
          Message <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="investor-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="rounded border border-border bg-section-alt p-4">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-1 h-4 w-4 shrink-0 rounded border-border text-gold focus:ring-gold"
            required
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            I consent to Diamond Capital Africa contacting me regarding this
            enquiry. I understand that this page is for preliminary discussion
            and does not constitute an offer of securities or a guarantee of
            returns. See our{" "}
            <Link
              href="/legal/privacy"
              className="font-semibold text-gold-dark underline hover:text-gold"
            >
              Privacy Policy
            </Link>
            . <span className="text-gold-dark">*</span>
          </span>
        </label>
        {errors.consent && (
          <p className="mt-2 text-xs text-red-500" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-11 w-full items-center justify-center rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Submitting…" : "Request confidential memorandum"}
      </button>
    </form>
  );
}
