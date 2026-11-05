"use client";

import { useState } from "react";

const fieldClass =
  "mt-2 w-full rounded-md border border-white/20 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-[#74b8df] focus:ring-2 focus:ring-[#74b8df]/30";

export default function BusinessRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello, I would like a quote to register a company in Uganda.",
      `Name: ${String(data.get("name") ?? "").trim()}`,
      `Country: ${String(data.get("country") ?? "").trim()}`,
      `Package: ${String(data.get("package") ?? "").trim()}`,
      `Business: ${String(data.get("business") ?? "").trim()}`,
    ].join("\n");

    setSubmitted(true);
    window.open(
      `https://wa.me/256704833021?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-[#74b8df]/40 bg-white/10 p-6 text-white">
        <h3 className="text-xl font-semibold">Your WhatsApp message is ready</h3>
        <p className="mt-2 text-sm leading-6 text-white/75">
          If WhatsApp did not open, message our registration desk directly on{" "}
          <a className="font-semibold text-[#a6d7f1] underline" href="tel:+256704833021">
            +256 704 833 021
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-semibold text-[#a6d7f1] underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-white" htmlFor="business-name">
          Your name
          <input className={fieldClass} id="business-name" name="name" autoComplete="name" required />
        </label>
        <label className="text-sm font-semibold text-white" htmlFor="business-country">
          Country you are in
          <input className={fieldClass} id="business-country" name="country" autoComplete="country-name" required />
        </label>
      </div>
      <label className="text-sm font-semibold text-white" htmlFor="business-package">
        Package
        <select className={fieldClass} id="business-package" name="package" defaultValue="Business Ready">
          <option>Starter — US$450 service fee</option>
          <option>Business Ready — US$650 service fee</option>
          <option>Investor — US$950 service fee</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="text-sm font-semibold text-white" htmlFor="business-activity">
        What will the company do?
        <input
          className={fieldClass}
          id="business-activity"
          name="business"
          placeholder="For example: trading, agriculture, technology"
          required
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded-md bg-[#74b8df] px-5 py-3 text-sm font-semibold text-[#102c3d] transition hover:bg-[#a6d7f1]"
      >
        Send quote request on WhatsApp
      </button>
      <p className="text-xs leading-5 text-white/65">
        Service fees exclude government and third-party costs. We confirm those
        costs before filing.
      </p>
    </form>
  );
}
