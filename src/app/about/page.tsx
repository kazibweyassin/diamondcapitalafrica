import Image from "next/image";
import { leadership, values, company, companyFacts } from "@/data/content";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";
import { Shield, Award, Globe, Users } from "lucide-react";

export const metadata = pageMetadata({
  title: "About Us | Licensed Gold Company Uganda",
  description: `${company.name} corporate profile: licensed gold dealer and refinery in Kampala, Uganda since ${company.founded}. Leadership, compliance, and investor information.`,
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
              single Kampala buying desk into one of the region&apos;s most trusted gold
              dealers and refiners. We serve over 2,400 licensed artisanal miners,
              export to 12 countries, and maintain the highest standards of
              purity, traceability, and compliance.
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
                desc: "99.99% Good Delivery gold bar certification",
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

        <section id="investors" className="mt-20 rounded-lg bg-primary p-8 text-white md:p-12">
          <h2 className="mb-4 text-2xl font-bold">Investor Information</h2>
          <p className="mb-6 max-w-2xl leading-relaxed text-white/80">
            {company.name} is a privately held company with a strong track
            record of growth and profitability. For investor enquiries, partnership
            opportunities, or access to our data room, please contact our corporate
            team. Retail savers can also join our{" "}
            <a href="/gold-savings" className="font-semibold text-gold underline hover:text-gold-light">
              Gold Savings programme
            </a>{" "}
            to accumulate physical bullion from $20 via USDT.
          </p>
          <p className="text-gold-light">
            Email: {company.investorsEmail}
          </p>
        </section>
      </div>
    </>
  );
}