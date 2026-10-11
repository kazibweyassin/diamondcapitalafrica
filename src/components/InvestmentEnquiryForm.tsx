"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const sectors = [
  "Agriculture & agro-processing",
  "Manufacturing & industrial equipment",
  "Food processing & value addition",
  "Energy & infrastructure",
  "Logistics & distribution",
  "Other",
];

const fieldClass =
  "mt-2 w-full rounded-sm border border-[#cfd8cf] bg-white px-4 py-3 text-sm text-[#18372e] outline-none transition placeholder:text-[#87938b] focus:border-[#587762] focus:ring-2 focus:ring-[#587762]/15";
const labelClass = "block text-sm font-medium text-[#28483c]";

export default function InvestmentEnquiryForm() {
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "uganda_investment",
          name: String(data.get("name") ?? "").trim(),
          companyName: String(data.get("companyName") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          country: String(data.get("country") ?? "").trim(),
          sector: String(data.get("sector") ?? ""),
          investmentRange: String(data.get("investmentRange") ?? ""),
          message: String(data.get("message") ?? "").trim(),
          consent: data.get("consent") === "yes",
          companyUrl: String(data.get("companyUrl") ?? ""),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error ?? "We could not submit your enquiry. Please try again.");
        return;
      }
      setReference(result.data.id);
      form.reset();
    } catch {
      setError("Connection error. Please check your internet connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (reference) {
    return (
      <div role="status" className="border border-[#c8d6c9] bg-white p-7 sm:p-9">
        <CheckCircle2 className="text-[#477451]" size={28} aria-hidden="true" />
        <h3 className="mt-5 text-xl font-semibold text-[#18372e]">Thank you. Your enquiry is with our team.</h3>
        <p className="mt-3 text-sm leading-6 text-[#5b6c63]">We have saved your message. Keep this reference for follow-up: <strong className="text-[#18372e]">{reference}</strong>.</p>
        <button type="button" onClick={() => setReference("")} className="mt-6 text-sm font-semibold text-[#42694b] underline underline-offset-4">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#d5ddd4] bg-white p-5 shadow-[0_24px_60px_-48px_rgba(20,55,42,0.45)] sm:p-8" aria-describedby={error ? "invest-form-error" : undefined}>
      {error && <p id="invest-form-error" role="alert" className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={labelClass} htmlFor="invest-name">Full name <span aria-hidden="true">*</span></label><input className={fieldClass} id="invest-name" name="name" autoComplete="name" minLength={2} maxLength={200} required /></div>
        <div><label className={labelClass} htmlFor="invest-company">Company name <span aria-hidden="true">*</span></label><input className={fieldClass} id="invest-company" name="companyName" autoComplete="organization" maxLength={200} required /></div>
        <div><label className={labelClass} htmlFor="invest-email">Business email <span aria-hidden="true">*</span></label><input className={fieldClass} id="invest-email" name="email" type="email" autoComplete="email" maxLength={320} required /></div>
        <div><label className={labelClass} htmlFor="invest-country">Country <span aria-hidden="true">*</span></label><input className={fieldClass} id="invest-country" name="country" autoComplete="country-name" maxLength={100} required /></div>
        <div><label className={labelClass} htmlFor="invest-sector">Industry or sector <span aria-hidden="true">*</span></label><select className={fieldClass} id="invest-sector" name="sector" defaultValue="" required><option value="" disabled>Select a sector</option>{sectors.map((sector) => <option key={sector}>{sector}</option>)}</select></div>
        <div><label className={labelClass} htmlFor="invest-range">Estimated investment range <span className="font-normal text-[#78877e]">(optional)</span></label><select className={fieldClass} id="invest-range" name="investmentRange" defaultValue=""><option value="">Prefer not to say</option><option>Under US$100,000</option><option>US$100,000–US$1 million</option><option>US$1 million–US$10 million</option><option>Above US$10 million</option><option>Still assessing</option></select></div>
        <div className="sm:col-span-2"><label className={labelClass} htmlFor="invest-message">What are you exploring in Uganda? <span aria-hidden="true">*</span></label><textarea className={fieldClass} id="invest-message" name="message" rows={5} minLength={20} maxLength={3000} placeholder="Share the opportunity or market questions you are considering." required /></div>
      </div>
      <div className="mt-5 flex items-start gap-3"><input id="invest-consent" name="consent" type="checkbox" value="yes" required className="mt-1 size-4 shrink-0 accent-[#315b42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df]" /><label htmlFor="invest-consent" className="text-xs leading-5 text-[#5b6c63]">I agree that Diamond Capital Africa may contact me about this enquiry. Read the <a className="font-semibold underline underline-offset-2" href="https://www.diamondcapitalafrica.com/legal/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.</label></div>
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden"><label htmlFor="invest-company-url">Leave this field empty</label><input id="invest-company-url" name="companyUrl" type="text" tabIndex={-1} autoComplete="off" /></div>
      <button type="submit" disabled={busy} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-[#244c3a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#17382e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto">{busy ? "Submitting…" : "Discuss Uganda opportunities"}<ArrowRight size={16} aria-hidden="true" /></button>
      <p className="mt-4 text-[11px] leading-5 text-[#78877e]">Your enquiry is stored securely so our team can review it. We do not guarantee a specific outcome or response timeframe.</p>
    </form>
  );
}
