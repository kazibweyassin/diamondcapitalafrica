"use client";

import { useState } from "react";
import { company } from "@/data/content";
import { goldSavings } from "@/data/gold-savings";

export default function GoldSavingsWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "I would like to join the Gold Savings waitlist.",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!form.phone.trim()) next.phone = "Phone number is required";
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
          ...form,
          subject: goldSavings.waitlistSubject,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setServerError(json.error ?? "Failed to submit");
        return;
      }

      setReferenceId(json.data.id);
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-gold bg-section-alt p-6 md:p-8">
        <p className="text-lg font-semibold text-primary">
          You&apos;re on the waitlist
        </p>
        <p className="mt-2 text-sm text-muted">
          Reference{" "}
          <strong className="text-foreground">{referenceId}</strong>. We&apos;ll
          contact you at {form.email} when Gold Savings accounts open.
        </p>
        <p className="mt-4 text-sm text-muted">
          Questions? Email{" "}
          <a
            href={`mailto:${company.investorsEmail}`}
            className="font-semibold text-gold-dark underline hover:text-gold"
          >
            {company.investorsEmail}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-white p-6 shadow-sm md:p-8"
      noValidate
    >
      <h3 className="mb-1 text-lg font-bold text-primary">Join the waitlist</h3>
      <p className="mb-6 text-sm text-muted">
        Accounts are opening soon. Register your interest to be notified first.
      </p>

      {serverError && (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="waitlist-name" className="mb-1 block text-sm font-medium">
            Full name
          </label>
          <input
            id="waitlist-name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="waitlist-email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="waitlist-phone" className="mb-1 block text-sm font-medium">
            Phone (WhatsApp preferred)
          </label>
          <input
            id="waitlist-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Join waitlist"}
      </button>
    </form>
  );
}