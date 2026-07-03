"use client";

import { useState } from "react";
import { productTypes, volumeRanges } from "@/data/network";

const inputClass =
  "w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";

export default function SupplierApplyForm() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    location: "",
    productType: productTypes[0] as string,
    volumeRange: volumeRanges[0] as string,
    notes: "",
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
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.location.trim()) next.location = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/network/suppliers", {
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
      <div className="rounded-lg border border-gold/30 bg-gold/10 p-8 text-center">
        <h2 className="text-xl font-bold text-primary">Application received</h2>
        <p className="mt-2 text-sm text-muted">
          Reference: <span className="font-mono font-semibold">{reference}</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          DCA will review your license and product details. Verified suppliers
          are listed on the Exchange at no upfront cost.
        </p>
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
          ["companyName", "Company / entity name"],
          ["contactName", "Contact name"],
          ["email", "Email", "email"],
          ["phone", "Phone", "tel"],
          ["licenseNumber", "Mining or trade license no. (if applicable)"],
          ["location", "Location (district / region)"],
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
        <label className="mb-1 block text-sm font-medium">Product type</label>
        <select
          value={form.productType}
          onChange={(e) => setForm({ ...form, productType: e.target.value })}
          className={inputClass}
        >
          {productTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Typical volume</label>
        <select
          value={form.volumeRange}
          onChange={(e) => setForm({ ...form, volumeRange: e.target.value })}
          className={inputClass}
        >
          {volumeRanges.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Additional notes</label>
        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit supplier application"}
      </button>
    </form>
  );
}