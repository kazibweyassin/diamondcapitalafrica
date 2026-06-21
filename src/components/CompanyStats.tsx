import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { company, companyStats } from "@/data/content";

export default function CompanyStats() {
  return (
    <section className="bg-section-alt py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
            The world of {company.name}
          </h2>
          <p className="mb-6 leading-relaxed text-muted">
            {company.name} is a leading gold dealing and refining company
            across East and Central Africa, operating collection centres and
            exporting LBMA-standard gold bars to international markets. We
            combine regional expertise with global standards to deliver value at
            every stage of the gold value chain.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Corporate profile
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/operations"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Our operations
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-muted">
          As at 31 December 2025
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companyStats.map((stat) => (
            <div
              key={stat.label}
              className="border-l-4 border-gold bg-white p-6 shadow-sm"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.suffix}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}