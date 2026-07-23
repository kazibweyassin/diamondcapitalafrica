import Image from "next/image";
import { leadership, values, company, companyFacts } from "@/data/content";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { Shield, Award, Globe, Users } from "lucide-react";

export const metadata = pageMetadata({
  title: "About Us | Licensed Gold Dealer Uganda",
  description: `${company.name} corporate profile: licensed gold dealer and exporter in Kampala, Uganda since ${company.founded}. Developing a proposed refining and assay platform. Leadership, compliance, and investor information.`,
  path: "/about",
  image: images.pageHero.about,
});

export default function AboutPage() {
  return (
    <>
      <section className="relative h-72 bg-primary md:h-96">
        <Image
          src={images.pageHero.about}
          alt={`${company.name} corporate headquarters`}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Corporate Profile
          </h1>
          <p className="mt-2 max-w-xl text-white/80">
            {company.tagline}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">
              Who we are
            </h2>
            <p className="mb-4 leading-relaxed text-muted">
              Founded in {company.founded}, {company.name} has grown from a
              Kampala buying desk into a regional gold dealer and exporter. We
              work with mining, refining, logistics and international trading
              stakeholders while developing our own proposed processing
              infrastructure, with a focus on purity documentation, traceability
              and compliance.
            </p>
            <p className="leading-relaxed text-muted">{company.purpose}</p>
          </div>
          <div className="relative h-72 overflow-hidden rounded-lg shadow-lg lg:h-96">
            <Image
              src={images.about.corporate}
              alt="Gold refining"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <section
          id="company-facts"
          className="mt-16 rounded-lg border border-border bg-section-alt p-6 md:p-8"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content={companyFacts.legalName} />
          <meta itemProp="telephone" content={company.phoneTel} />
          <meta itemProp="email" content={companyFacts.email} />
          <h2 className="mb-4 text-xl font-bold text-primary md:text-2xl">
            Company facts
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                Business type
              </dt>
              <dd className="mt-1 text-sm text-foreground" itemProp="description">
                {companyFacts.businessType}
              </dd>
            </div>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                Headquarters
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                <span itemProp="streetAddress">{companyFacts.headquarters}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                Gold purity standard
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {companyFacts.purityStandard}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                Contact
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                {companyFacts.contactPerson} · {companyFacts.phone} ·{" "}
                {companyFacts.email}
              </dd>
            </div>
          </dl>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {companyFacts.primaryActivities.map((activity) => (
              <li key={activity} className="text-sm text-muted">
                · {activity}
              </li>
            ))}
          </ul>
        </section>

        <section id="values" className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-primary">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-border p-6"
              >
                <h3 className="mb-2 text-lg font-bold text-gold-dark">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="leadership" className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-primary">Leadership</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="rounded-lg bg-section-alt p-6"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-gold">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-bold text-primary">{person.name}</h3>
                <p className="mb-2 text-sm font-medium text-gold-dark">
                  {person.role}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="compliance" className="mt-20">
          <h2 className="mb-8 text-2xl font-bold text-primary">
            Compliance & Licensing
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Licensed Dealer",
                desc: "Ministry of Energy & Mineral Development, Uganda",
              },
              {
                icon: Award,
                title: "LBMA Standards",
                desc: "Assay documentation and institutional bar standards",
              },
              {
                icon: Globe,
                title: "OECD Aligned",
                desc: "Due Diligence Guidance for Responsible Supply Chains",
              },
              {
                icon: Users,
                title: "AML Compliant",
                desc: "Financial Intelligence Authority registered",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-lg border border-border p-6 text-center"
              >
                <item.icon size={32} className="mb-3 text-gold" />
                <h3 className="mb-1 font-bold text-primary">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="investors" className="mt-20 scroll-mt-24">
          <div className="rounded-lg bg-primary p-8 text-white md:p-12">
            <h2 className="mb-4 text-2xl font-bold">Investor Information</h2>
            <p className="mb-6 max-w-2xl leading-relaxed text-white/80">
              {company.name} is a privately held company seeking strategic
              capital to develop a proposed modern gold refinery, assay
              laboratory and responsible-sourcing platform. For investor
              enquiries, partnership opportunities, or access to confidential
              materials after screening, please contact our corporate team.
              Retail savers can also join our{" "}
              <a
                href="/gold-savings"
                className="font-semibold text-gold underline hover:text-gold-light"
              >
                Gold Savings programme
              </a>{" "}
              to accumulate physical bullion from $20 via USDT.
            </p>
            <div className="mb-8 flex flex-wrap gap-3">
              <a
                href="/investors/investment-opportunity"
                className="inline-flex min-h-11 items-center rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
              >
                Explore investment opportunity
              </a>
              <a
                href="/investors/diamond-capital-africa-investment-overview-2026.pdf"
                download="diamond-capital-africa-investment-overview-2026.pdf"
                className="inline-flex min-h-11 items-center rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Download overview PDF
              </a>
            </div>
            <p className="text-gold-light">Email: {company.investorsEmail}</p>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-white p-6 shadow-sm md:p-8">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
              Featured resource
            </p>
            <h3 className="mb-2 text-xl font-bold text-primary">
              Diamond Capital Africa Investment Overview 2026
            </h3>
            <p className="mb-3 max-w-3xl text-sm leading-relaxed text-muted">
              A public overview of the proposed integrated precious-metals
              processing platform, preliminary capital requirement, project
              components, financial projections, governance framework and
              investor engagement process.
            </p>
            <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted">
              PDF · 10 pages · July 2026
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/investors/investment-opportunity#investment-overview"
                className="inline-flex min-h-11 items-center rounded bg-gold px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-gold-light"
              >
                Read Online
              </a>
              <a
                href="/investors/diamond-capital-africa-investment-overview-2026.pdf"
                download="diamond-capital-africa-investment-overview-2026.pdf"
                className="inline-flex min-h-11 items-center rounded border border-border px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-gold hover:bg-section-alt"
              >
                Download PDF
              </a>
              <a
                href="/investors/investment-opportunity#investor-enquiry"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark transition hover:text-gold"
              >
                Request Confidential Memorandum
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}