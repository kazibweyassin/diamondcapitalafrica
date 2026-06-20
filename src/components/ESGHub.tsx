import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { esgCards } from "@/data/content";

export default function ESGHub() {
  return (
    <section className="bg-section-alt py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title="Our ESG transparency hub" />
        <p className="mb-10 max-w-3xl leading-relaxed text-muted">
          We are committed to being responsible stewards of the environments in
          which we operate, the gold entrusted to us by our mining partners, and
          the capital provided by our stakeholders. Sustainability is embedded
          in our business as a driver for long-term value and community trust.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {esgCards.map((card) => (
            <Link
              key={card.title}
              href="/sustainability"
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-primary">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {card.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition group-hover:text-gold">
                  Read more
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}