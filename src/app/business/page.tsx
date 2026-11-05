import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileText, MessageCircle, ShieldCheck } from "lucide-react";
import BusinessRegistrationForm from "@/components/BusinessRegistrationForm";
import { company } from "@/data/content";

const canonicalUrl = "https://business.diamondcapitalafrica.com/";

export const metadata: Metadata = {
  title: { absolute: "Register a Company in Uganda | Diamond Capital Africa" },
  description:
    "Fixed-price company registration support in Uganda for foreign investors, expats and diaspora founders. Company, TIN and business setup guidance from a Kampala team.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Register a Company in Uganda | Diamond Capital Africa",
    description:
      "Fixed-price company registration support in Uganda for foreign investors, expats and diaspora founders.",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

const packages = [
  {
    name: "Starter",
    price: "US$450",
    items: ["Name search and reservation", "Company registration filing", "Certificate of incorporation", "Tax registration guidance"],
  },
  {
    name: "Business Ready",
    price: "US$650",
    featured: true,
    items: ["Everything in Starter", "Bank account guidance", "Registered address coordination", "Tax and compliance setup guidance"],
  },
  {
    name: "Investor",
    price: "US$950",
    items: ["Everything in Business Ready", "Investor and work-permit guidance", "Local introductions where relevant", "Practical next-step coordination"],
  },
];

const steps = [
  ["Message us", "Tell us your business, country and preferred package."],
  ["Send documents", "Share the documents on the checklist so we can confirm the route."],
  ["We file", "We submit, follow up and update you as the application moves."],
  ["Receive your file", "Get your company documents, TIN information and next steps together."],
];

const whatsappUrl =
  "https://wa.me/256791462554?text=Hello%20Tim%2C%20I%20would%20like%20a%20quote%20to%20register%20a%20company%20in%20Uganda.";

function packageWhatsAppUrl(packageName: string) {
  const message = `Hello Tim, I would like a quote for the ${packageName} company registration package in Uganda.`;
  return `https://wa.me/256791462554?text=${encodeURIComponent(message)}`;
}

export default function BusinessRegistrationPage() {
  return (
    <div className="business-landing bg-[#f2f6f5] text-[#14211f]">
      <header className="bg-[#083331] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="#top" className="font-semibold tracking-tight">
            Diamond Capital <span className="text-gold">Africa</span>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-[#1b1403]">
            WhatsApp Tim
          </a>
        </div>
      </header>

      <main id="top">
        <section className="bg-[#0e4a47] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-24">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-gold-light">
                Kampala, Uganda
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Register your company in Uganda. We handle the paperwork.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Fixed-price support for foreign investors, expats and diaspora
                founders. Send your documents and our Kampala team coordinates
                the registration process and next steps.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-gold px-5 py-3 text-sm font-semibold text-[#1b1403] hover:bg-gold-light">
                  Get a quote on WhatsApp
                </a>
                <a href="#quote" className="rounded-md border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                  Request a quote
                </a>
              </div>
            </div>
            <div className="rounded-lg border-t-4 border-gold bg-white p-6 text-[#14211f] shadow-2xl">
              <h2 className="text-xl font-semibold">Your Uganda company file</h2>
              <p className="mt-1 text-sm text-muted">What the setup process can cover</p>
              <ul className="mt-5 space-y-3">
                {["Company name search and reservation", "Certificate of incorporation", "Tax registration guidance", "Bank account guidance (Business Ready+)", "Work-permit guidance (Investor)"].map((item) => (
                  <li key={item} className="flex items-start gap-3 border-t border-border pt-3 text-sm">
                    <Check className="mt-0.5 size-5 shrink-0 text-[#0e4a47]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 sm:px-8 md:grid-cols-3">
            {[
              ["Based in Kampala", "A local team you can reach on WhatsApp."],
              ["Fixed service fees", "The package fee is clear before work starts."],
              ["Works from abroad", "Many documents can be sent and signed digitally."],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <ShieldCheck className="size-6 shrink-0 text-gold-dark" />
                <p className="text-sm text-muted"><strong className="block text-[#14211f]">{title}</strong>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="packages" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">Choose the level of support you need</h2>
          <p className="mt-4 max-w-2xl text-muted">Every package starts with a conversation so we can confirm the right route for your ownership, sector and documents.</p>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {packages.map((item) => (
              <article key={item.name} className={`flex flex-col rounded-lg border bg-white p-6 ${item.featured ? "border-2 border-[#0e4a47] shadow-lg" : "border-border"}`}>
                {item.featured && <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#0e4a47]">Most chosen</p>}
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="mt-3 text-4xl font-semibold tracking-tight">{item.price}<span className="ml-2 text-sm font-normal text-muted">service fee</span></p>
                <ul className="mt-5 flex-1 space-y-3 text-sm text-muted">{item.items.map((feature) => <li key={feature} className="flex gap-2"><Check className="size-5 shrink-0 text-[#0e4a47]" />{feature}</li>)}</ul>
                <a href={packageWhatsAppUrl(item.name)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-[#0e4a47] px-4 py-3 text-sm font-semibold text-white hover:bg-[#083331]">
                  Ask about {item.name} <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">Service fees exclude government fees and third-party costs. We quote those separately and confirm them before filing.</p>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-4">
              {steps.map(([title, text], index) => (
                <div key={title} className="rounded-lg border-l-4 border-gold bg-[#f2f6f5] p-5">
                  <p className="text-2xl font-semibold text-gold-dark">0{index + 1}</p>
                  <h3 className="mt-2 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">What we need from you</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {["Passport copy for each director and shareholder", "Proof of address for each director", "Two or three proposed company names", "A short description of the company activity", "Email and phone number for each director"].map((item) => <li key={item} className="flex gap-2"><FileText className="size-5 shrink-0 text-gold-dark" />{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Who this is for</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {["Foreign investors entering the Ugandan market", "Expats living in Uganda", "Diaspora founders setting up from abroad", "Traders and exporters needing a local company"].map((item) => <li key={item} className="flex gap-2"><Check className="size-5 shrink-0 text-gold-dark" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section id="faq" className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="text-3xl font-semibold tracking-tight">Common questions</h2>
            <div className="mt-7 max-w-3xl space-y-3">
              {[
                ["Can a foreigner register a company in Uganda?", "Foreign ownership and director requirements depend on the structure and activity. We confirm the route and current requirements before filing."],
                ["Can I do this from outside Uganda?", "Many steps can be handled remotely, but we confirm whether your case requires an original signature, visit or additional verification."],
                ["How much does it cost in total?", "You pay the selected service fee plus applicable government and third-party costs. We confirm the full amount before filing anything."],
                ["How long does it take?", "Timing depends on name approval, document quality, authority processing and how quickly you respond. We give a realistic estimate after reviewing your case."],
              ].map(([question, answer]) => <details key={question} className="rounded-md border border-border p-4"><summary className="cursor-pointer font-semibold">{question}</summary><p className="mt-3 text-sm leading-6 text-muted">{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section id="quote" className="bg-[#0e4a47]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="text-white">
              <MessageCircle className="size-9 text-gold" />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">Get your quote today</h2>
              <p className="mt-4 leading-7 text-white/75">Share four details and WhatsApp will open with a prepared message for Tim.</p>
              <p className="mt-6 text-sm text-white/70">Uganda line: <a className="font-semibold text-gold-light" href="tel:+256791462554">+256 791 462 554</a></p>
              <p className="mt-2 text-sm text-white/70">International/WhatsApp line: <a className="font-semibold text-gold-light" href="tel:+905368976110">+90 536 897 6110</a></p>
            </div>
            <BusinessRegistrationForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#083331] px-5 py-8 text-sm text-white/65 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p><strong className="text-white">{company.name}</strong> · {company.address}</p>
          <p>General information only; confirm legal, tax and regulatory requirements with qualified advisers.</p>
        </div>
      </footer>
    </div>
  );
}
