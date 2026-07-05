"use client";

import { useState } from "react";
import Link from "next/link";
import InstitutionalPaymentInstructions from "@/components/InstitutionalPaymentInstructions";
import { buyerTypes } from "@/data/network";

const inputClass =
  "w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";

export default function InstitutionalAccessForm() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    buyerType: buyerTypes[0] as string,
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.companyName.trim()) next.companyName = "Required";
    if (!form.contactName.trim()) next.contactName = "Required";
    if (!form.email.trim()) next.email = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/network/institutional", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) {
        setServerError(json.error ?? "Submission failed");
        return;
      }
      setReference(json.data.reference);
    } catch {
      setServerError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="space-y-8">
        <div className="rounded-lg border border-gold/30 bg-gold/10 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-primary">Access request received</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            DCA will review your application. Complete membership payment below
            using your reference. Portal credentials are emailed after payment
            is confirmed.
          </p>
          <Link
            href="/network/login"
            className="mt-5 inline-block text-sm font-semibold text-gold-dark underline"
          >
            Already have credentials? Sign in
          </Link>
        </div>
        <InstitutionalPaymentInstructions reference={reference} showTierSummary={false} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </p>
      )}
      {(
        [
          ["companyName", "Institution / company name"],
          ["contactName", "Contact name"],
          ["email", "Email", "email"],
          ["phone", "Phone", "tel"],
          ["country", "Country"],
        ] as const
      ).map(([key, label, type = "text"]) => (
        <div key={key}>
          <label className="mb-1 block text-sm font-medium">{label}</label>
          <input
            type={type}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={inputClass}
          />
          {errors[key] && (
            <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
          )}
        </div>
      ))}
      <div>
        <label className="mb-1 block text-sm font-medium">Buyer type</label>
        <select
          value={form.buyerType}
          onChange={(e) => setForm({ ...form, buyerType: e.target.value })}
          className={inputClass}
        >
          {buyerTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">
          Brief requirements (optional)
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass}
          placeholder="Volumes, delivery terms, assay requirements..."
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Request institutional access"}
      </button>
    </form>
  );
}