"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { company } from "@/data/content";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import TrustPrequalBlock from "@/components/TrustPrequalBlock";
import { setContactFormSuccessFlag } from "@/lib/storage";

const subjects = [
  "Gold Buying Enquiry",
  "Refining Services",
  "Assay & Testing",
  "Export Services",
  "Gold Savings Deposit",
  "Institutional Network Access",
  "Verified Supplier Application",
  "Investor Relations",
  "Media Enquiry",
  "Other",
];

function ContactForm() {
  const searchParams = useSearchParams();
  const defaultSubject = searchParams.get("subject") ?? subjects[0];

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: "",
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
    if (!form.message.trim()) next.message = "Message is required";
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
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!json.success) {
        setServerError(json.error ?? "Failed to submit enquiry");
        return;
      }

      setReferenceId(json.data.id);
      setContactFormSuccessFlag();
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-gold bg-section-alt p-8">
        <p className="text-lg font-semibold text-primary">
          Thank you for your enquiry
        </p>
        <p className="mt-2 text-sm text-muted">
          Your reference number is{" "}
          <strong className="text-foreground">{referenceId}</strong>. Our team
          has received your message and will respond within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              subject: subjects[0],
              message: "",
            });
          }}
          className="mt-6 text-sm font-semibold text-gold-dark transition hover:text-gold"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {serverError && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverError}
        </p>
      )}
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Full Name
        </label>
        <input
          id="name"
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
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email Address
        </label>
        <input
          id="email"
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
        <label htmlFor="phone" className="mb-1 block text-sm font-medium">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium">
          Subject
        </label>
        <select
          id="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
        >
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded border border-border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded bg-gold px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="relative h-64 bg-primary md:h-80">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 max-w-xl text-white/80">
            Get in touch for gold price quotes, refining enquiries, or
            partnership opportunities.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-primary">
              Get in touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="mt-1 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold">Head Office</p>
                  <p className="text-sm text-muted">{company.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="mt-1 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold">{company.contactName}</p>
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="text-sm text-muted transition hover:text-gold"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <WhatsAppIcon className="mt-1 size-5 shrink-0 text-[#25D366]" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <a
                    href={company.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition hover:text-gold"
                  >
                    Chat with {company.contactName}
                  </a>
                </div>
              </div>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#20bd5a] sm:w-auto"
              >
                <WhatsAppIcon className="size-5" />
                Message on WhatsApp
              </a>
              <div className="flex items-start gap-4">
                <Mail size={20} className="mt-1 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-muted transition hover:text-gold"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={20} className="mt-1 shrink-0 text-gold" />
                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-sm text-muted">
                    Mon-Fri: 8:00 AM-6:00 PM EAT
                  </p>
                  <p className="text-sm text-muted">
                    Sat: 9:00 AM-1:00 PM EAT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<p className="text-sm text-muted">Loading form...</p>}>
            <ContactForm />
          </Suspense>
        </div>

        <section className="mt-16 border-t border-border pt-12">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                For gold export buyers
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Help us prioritise serious enquiries. Include volume, destination,
                and delivery preference. Full procedure on{" "}
                <Link
                  href="/how-to-buy"
                  className="font-semibold text-gold-dark hover:text-gold"
                >
                  How to buy gold
                </Link>
                .
              </p>
            </div>
            <Link
              href="/how-to-buy"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Buying procedure
              <ArrowRight size={14} />
            </Link>
          </div>
          <TrustPrequalBlock compact showProcedureLink={false} />
        </section>
      </div>
    </>
  );
}