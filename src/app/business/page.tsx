import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BusinessRegistrationForm from "@/components/BusinessRegistrationForm";
import { company } from "@/data/content";

const canonicalUrl = "https://invest.diamondcapitalafrica.com/";
const registrationDesk = "+256 704 833 021";
const registrationTel = "+256704833021";
const registrationWa = "256704833021";

const instructionMessage =
  "Hello, I want to register a company in Uganda. Please send the document checklist and the government fees.";

const whatsappUrl = `https://wa.me/${registrationWa}?text=${encodeURIComponent(instructionMessage)}`;

const anchorClass =
  "rounded-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#74b8df] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17382e]";

export const metadata: Metadata = {
  title: { absolute: "Register a Company in Uganda | Diamond Capital Africa" },
  description:
    "Fixed-fee company registration in Uganda for foreign investors, expats and diaspora founders. Name reservation, incorporation and TIN from a Kampala desk.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Register a Company in Uganda | Diamond Capital Africa",
    description:
      "Fixed-fee company registration in Uganda. Name reservation, incorporation and TIN from a Kampala desk.",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

const packages = [
  {
    name: "Starter",
    price: "US$450",
    items: [
      "Name search and reservation",
      "Company registration filing",
      "Certificate of incorporation",
      "URA tax registration (TIN)",
    ],
  },
  {
    name: "Business Ready",
    price: "US$650",
    featured: true,
    items: [
      "Everything in Starter",
      "Bank introduction and the account document pack",
      "Registered office coordination in Kampala",
      "Post-incorporation compliance setup",
    ],
  },
  {
    name: "Investor",
    price: "US$950",
    items: [
      "Everything in Business Ready",
      "Work-permit brief for the directors",
      "Sector introductions for your activity",
      "A written plan for banking, tax and the first operating approvals",
    ],
  },
];

const steps = [
  ["Instruct us", "Share the package, the activity and the proposed names."],
  ["Documents", "We send the checklist and prepare the forms from your passports and addresses."],
  ["Filing", "We lodge the application, track it and keep you informed."],
  ["Company file", "You receive the certificate, TIN details and the next actions in one pack."],
];

const deliverables = [
  "Company name search and reservation",
  "Certificate of incorporation",
  "URA tax registration (TIN)",
  "Bank introduction and the account document pack (Business Ready and Investor)",
  "Work-permit brief (Investor)",
];

const afterIncorporation = [
  "Sector brief for your activity",
  "Introductions to relevant local contacts",
  "Approvals your activity must clear",
  "Follow-up from the Kampala desk",
];

const filingNeeds = [
  "Passport copy for each director and shareholder",
  "Proof of address for each director",
  "Two or three proposed company names",
  "A short description of the company activity",
  "Email and phone number for each director",
];

const audiences = [
  "Foreign investors entering the Ugandan market",
  "Expats living in Uganda",
  "Diaspora founders setting up from abroad",
  "Traders and exporters needing a local company",
];

const investorServices = [
  {
    number: "01",
    title: "Understand the market",
    text: "A focused orientation on your sector, location, customer and operating model before you commit to setup costs.",
    deliverable: "Sector and market-entry brief",
  },
  {
    number: "02",
    title: "Plan the setup",
    text: "A practical checklist covering ownership, company structure, tax, banking, staffing and the first approvals to investigate.",
    deliverable: "Project setup checklist",
  },
  {
    number: "03",
    title: "Establish the company",
    text: "Name reservation, incorporation filing, TIN coordination and a consolidated company file from a Kampala desk.",
    deliverable: "Certificate and company file",
  },
  {
    number: "04",
    title: "Prepare for compliance",
    text: "We help you identify the licences, permits, standards, immigration or environmental questions relevant to your activity.",
    deliverable: "Authority and approvals map",
  },
  {
    number: "05",
    title: "Activate operations",
    text: "Introductions to relevant local contacts, suppliers or service providers, followed by practical Kampala coordination.",
    deliverable: "Introductions and next actions",
  },
  {
    number: "06",
    title: "Support the next phase",
    text: "Return for help with a new location, additional activity, partner conversation or a bottleneck in your setup journey.",
    deliverable: "Follow-up coordination",
  },
];

const questions = [
  ["Can a foreigner register a company in Uganda?", "Yes. A foreign national can incorporate and own a Ugandan company. Before we file, we confirm the shareholding, the director rules and any restriction on your activity."],
  ["Can I do this from outside Uganda?", "Yes. We run the filing from Kampala on documents you send. We tell you at the start if your case needs an original signature or a visit."],
  ["How much does it cost in total?", "The package fee above, plus government and bank charges. We send that second figure and wait for your approval before anything is lodged."],
  ["How long does it take?", "We give you the working-day range for your case once the names and passports are in. Name approval and authority processing sit outside the service fee."],
];

function packageWhatsAppUrl(packageName: string) {
  const message = `Hello, I want to start the ${packageName} company registration package in Uganda. Please send the document checklist and the government fees.`;
  return `https://wa.me/${registrationWa}?text=${encodeURIComponent(message)}`;
}

export default function BusinessRegistrationPage() {
  return (
    <div className="business-landing bg-white text-[#18372e]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#17382e] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-14">
          <Link href="#top" aria-label="Diamond Capital Africa" className={`flex items-center ${anchorClass}`}>
            <Image src="/Logo.png" alt="" width={168} height={68} priority className="h-12 w-auto object-contain" />
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-white/75 lg:flex">
            <a className={`${anchorClass} hover:text-white`} href="#services">Services</a>
            <a className={`${anchorClass} hover:text-white`} href="#packages">Packages</a>
            <a className={`${anchorClass} hover:text-white`} href="#process">Process</a>
            <a className={`${anchorClass} hover:text-white`} href="#documents">Documents</a>
            <a className={`${anchorClass} hover:text-white`} href="#faq">FAQ</a>
          </nav>
          <a href="#quote" className={`hidden shrink-0 border border-[#74b8df] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#74b8df] hover:text-[#102c3d] sm:inline-flex ${anchorClass}`}>
            Instruct the desk
          </a>
          <details className="relative lg:hidden">
            <summary className={`cursor-pointer list-none border border-white/30 px-3 py-2 text-sm ${anchorClass}`}>Menu</summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-12 z-30 flex w-56 flex-col gap-1 border border-[#dce3dc] bg-white p-3 text-sm text-[#18372e] shadow-xl">
              <a className="px-3 py-2 hover:bg-[#eef3f7]" href="#services">Services</a>
              <a className="px-3 py-2 hover:bg-[#eef3f7]" href="#packages">Packages</a>
              <a className="px-3 py-2 hover:bg-[#eef3f7]" href="#process">Process</a>
              <a className="px-3 py-2 hover:bg-[#eef3f7]" href="#documents">Documents</a>
              <a className="px-3 py-2 hover:bg-[#eef3f7]" href="#faq">FAQ</a>
              <a className="mt-1 bg-[#17382e] px-3 py-2 font-semibold text-white" href="#quote">Instruct the desk</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="top">
        <section className="bg-[#102c25] text-white">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:px-14 lg:py-24">
            <div>
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#a6d7f1]">
                <span className="h-px w-9 bg-[#74b8df]" /> Company formation · Kampala
              </p>
              <h1 className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Register your Ugandan company from anywhere.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Diamond Capital Africa reserves the name, files the incorporation, and returns the certificate and TIN details in one company file. Fixed fees for foreign investors, expats and diaspora founders.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#74b8df] px-6 py-3 text-sm font-semibold text-[#102c3d] transition hover:bg-[#a6d7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  Instruct us on WhatsApp <ArrowRight size={16} />
                </a>
                <a href="#quote" className="inline-flex min-h-12 items-center justify-center border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df]">
                  Send an instruction
                </a>
              </div>
              <p className="mt-6 text-sm text-white/60">We reply the same business day.</p>
            </div>

            <aside className="border border-white/15 bg-white text-[#18372e]">
              <div className="flex items-center justify-between border-b border-[#e4ebe6] px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#397ba0]">What you receive</p>
                <p className="font-serif text-xs tracking-wide text-[#397ba0]">DCA · Kampala</p>
              </div>
              <div className="px-6 py-6">
                <h2 className="text-2xl font-medium tracking-[-0.02em]">Certificate, TIN and the next actions</h2>
                <ol className="mt-6 divide-y divide-[#e4ebe6] border-y border-[#e4ebe6]">
                  {deliverables.map((item, index) => (
                    <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3.5 text-sm leading-6">
                      <span className="font-serif text-[#397ba0]">0{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="border-t border-[#e4ebe6] px-6 py-4 text-xs leading-5 text-[#5b6c63]">
                The service fee is confirmed in writing before filing.
              </p>
            </aside>
          </div>
        </section>

        <section className="border-b border-[#e4ebe6]">
          <div className="mx-auto grid max-w-[1440px] md:grid-cols-3">
            {[
              ["Kampala desk", "Plot 42, Nakasero Road, Kampala."],
              ["Fee agreed first", "The service fee is confirmed in writing before filing."],
              ["Instruct from abroad", "Directors can instruct us and sign from outside Uganda."],
            ].map(([title, text], index) => (
              <div key={title} className={`px-5 py-7 sm:px-8 lg:px-14 ${index > 0 ? "md:border-l md:border-[#e4ebe6]" : ""}`}>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[#5b6c63]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-[#eef3f7] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">The investor journey</p>
                <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                  More than incorporation: a clear route into Uganda
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#5b6c63] lg:justify-self-end">
                Use us at the stage where you need help. We turn an early
                question into a short brief, checklist, introduction or
                follow-up action. Official agencies make the decisions; we
                help you prepare, coordinate and keep the work moving.
              </p>
            </div>
            <div className="mt-12 grid border-t border-[#cfdad4] sm:grid-cols-2 lg:grid-cols-3">
              {investorServices.map((service) => (
                <article key={service.number} className="border-b border-[#cfdad4] py-7 sm:px-6 sm:odd:border-r lg:px-8 lg:nth-[3n+1]:border-r lg:nth-[3n+2]:border-r lg:first:pl-0 lg:nth-[3n+1]:pl-0">
                  <span className="font-serif text-sm text-[#397ba0]">{service.number}</span>
                  <h3 className="mt-4 text-lg font-medium">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5b6c63]">{service.text}</p>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#397ba0]">{service.deliverable}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-4 border-l-2 border-[#74b8df] pl-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-[#40584d]">
                We are an independent private service, not a government
                one-stop centre. Licences, permits, incentives and approvals
                remain subject to the relevant Ugandan authorities.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#18372e] hover:text-[#397ba0]">
                Discuss your project <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section id="packages" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-[1440px] border-b border-[#e4ebe6] pb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">The outcome</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
              A company file that moves your business forward
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5b6c63] sm:text-base">
              Registration is the starting point. We organize the filing,
              explain what happens next, and help you move from incorporation
              toward practical operations in Uganda.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                ["Clarity before filing", "Know the ownership route, documents, timeline and government charges before work begins."],
                ["A complete company file", "Receive the incorporation documents and TIN information together, with the next actions explained."],
                ["Support beyond registration", "Get sector orientation, relevant introductions and an approval checklist for your operating model."],
              ].map(([title, text]) => (
                <div key={title} className="border-t-2 border-[#74b8df] pt-4">
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5b6c63]">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Then, the fees</p>
              <h2 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                Choose the level of support that fits your next move.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5b6c63] lg:justify-self-end">
              Tell us the ownership, the activity and the package. We confirm the scope, then we file. Government and third-party fees sit outside the service fee. We confirm them in writing before filing.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-[1440px] border border-[#dce2da] lg:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`flex flex-col border-b border-[#dce2da] p-7 last:border-b-0 sm:p-8 lg:border-b-0 lg:border-r lg:last:border-r-0 ${item.featured ? "bg-[#18372e] text-white" : "bg-white"}`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${item.featured ? "text-[#a6d7f1]" : "text-transparent"}`} aria-hidden={item.featured ? undefined : true}>
                  Standard engagement
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em]">{item.name}</h3>
                <p className="mt-5 text-4xl font-medium tracking-[-0.03em]">
                  {item.price}
                  <span className={`mt-2 block text-xs font-normal uppercase tracking-[0.16em] ${item.featured ? "text-white/55" : "text-[#758178]"}`}>
                    Service fee
                  </span>
                </p>
                <ul className={`mt-8 flex-1 divide-y text-sm leading-6 ${item.featured ? "divide-white/15 text-white/85" : "divide-[#e4ebe6] text-[#40584d]"}`}>
                  {item.items.map((feature) => (
                    <li key={feature} className="py-3">{feature}</li>
                  ))}
                </ul>
                <a
                  href={packageWhatsAppUrl(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df] ${item.featured ? "text-[#a6d7f1] hover:text-white" : "text-[#18372e] hover:text-[#397ba0]"}`}
                >
                  Start with {item.name} <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="scroll-mt-20 bg-[#102c25] px-5 py-20 text-white sm:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a6d7f1]">The engagement</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">The filing sequence</h2>
            <ol className="mt-12 grid border-y border-white/15 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(([title, text], index) => (
                <li key={title} className="border-b border-white/15 py-7 md:px-6 md:odd:border-r lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                  <span className="font-serif text-sm text-[#a6d7f1]">0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-medium">{title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">After incorporation</p>
              <h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                From the company file to the first operating steps
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#5b6c63] sm:text-base">
                After incorporation, we brief you on the sector, introduce relevant local contacts, and list the approvals your activity must clear.
              </p>
              <p className="mt-8 border-l-2 border-[#74b8df] pl-5 text-lg font-medium leading-7 tracking-[-0.02em]">
                One Kampala desk from the instruction to the company file.
              </p>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#5b6c63]">
                Start with registration. We then take the next step for your sector, ownership and operating model.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-[#74b8df] pb-1 text-sm font-semibold hover:text-[#397ba0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df]">
                Instruct us on WhatsApp <ArrowRight size={15} />
              </a>
            </div>
            <ol className="border-y border-[#dce2da]">
              {afterIncorporation.map((item, index) => (
                <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[#dce2da] py-5 last:border-b-0">
                  <span className="font-serif text-sm text-[#397ba0]">0{index + 1}</span>
                  <span className="text-sm leading-6 text-[#40584d]">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="documents" className="scroll-mt-20 border-t border-[#e4ebe6] bg-[#eef3f7] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">To file</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.025em]">What we need to file</h2>
              <ol className="mt-8 border-t border-[#d5e0e8]">
                {filingNeeds.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-[#d5e0e8] py-4 text-sm leading-6">
                    <span className="font-serif text-[#397ba0]">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Clients</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.025em]">Who this is for</h2>
              <ul className="mt-8 border-t border-[#d5e0e8]">
                {audiences.map((item) => (
                  <li key={item} className="border-b border-[#d5e0e8] py-4 text-sm leading-6">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Questions</p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">Common questions</h2>
            </div>
            <div className="border-t border-[#dce2da]">
              {questions.map(([question, answer]) => (
                <details key={question} className="group border-b border-[#dce2da]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#74b8df]">
                    {question}
                    <span className="font-serif text-lg text-[#397ba0] group-open:hidden" aria-hidden="true">+</span>
                    <span className="hidden font-serif text-lg text-[#397ba0] group-open:inline" aria-hidden="true">–</span>
                  </summary>
                  <p className="max-w-2xl pb-6 text-sm leading-7 text-[#5b6c63]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="quote" className="scroll-mt-20 bg-[#eef3f7] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397ba0]">Instruction</p>
              <h2 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-[-0.025em] sm:text-4xl">
                Instruct the registration desk
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#5b6c63] sm:text-base">
                Send your name, country, package and activity. We reply on WhatsApp with the document checklist and the government fees for your case.
              </p>
              <div className="mt-9 border-l-2 border-[#74b8df] pl-5 text-sm leading-6 text-[#5b6c63]">
                <p className="font-semibold text-[#18372e]">Diamond Capital Africa</p>
                <p className="mt-2">{company.address}</p>
                <a className="mt-2 inline-block underline decoration-[#74b8df] underline-offset-4 hover:text-[#18372e]" href={`mailto:${company.email}`}>{company.email}</a>
                <p className="mt-2">
                  Registration desk: <a className="font-semibold text-[#18372e]" href={`tel:${registrationTel}`}>{registrationDesk}</a>
                </p>
                <p className="mt-3 text-[#18372e]">We reply the same business day.</p>
              </div>
            </div>
            <BusinessRegistrationForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#102c25] px-5 py-10 text-white sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-7 border-b border-white/15 pb-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.12em]">DIAMOND CAPITAL AFRICA</p>
              <p className="mt-2 text-xs text-white/60">{company.address}</p>
              <p className="mt-2 text-xs text-white/60">
                <a className="underline-offset-4 hover:text-white hover:underline" href={`mailto:${company.email}`}>{company.email}</a>
                <span className="mx-2 text-white/30">·</span>
                <a className="underline-offset-4 hover:text-white hover:underline" href={`tel:${registrationTel}`}>{registrationDesk}</a>
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/70">
              <a className="underline-offset-4 hover:text-white hover:underline" href="https://www.diamondcapitalafrica.com/legal/privacy">Privacy policy</a>
              <a className="underline-offset-4 hover:text-white hover:underline" href="https://www.diamondcapitalafrica.com/">Main website</a>
              <a className="underline-offset-4 hover:text-white hover:underline" href="https://ugandainvest.go.ug/" target="_blank" rel="noopener noreferrer">Uganda Investment Authority</a>
            </div>
          </div>
          <p className="max-w-3xl pt-6 text-[11px] leading-5 text-white/50">
            Diamond Capital Africa prepares and files company and tax applications from Kampala. We do not issue licences, grant investment approvals, or give legal, tax or immigration advice. Government fees are confirmed before filing.
          </p>
        </div>
      </footer>
    </div>
  );
}
