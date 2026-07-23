import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { goldFaqs } from "@/data/faqs";
import { company } from "@/data/content";

export default function FaqSection() {
  return (
    <section className="py-10 sm:py-16" id="faq">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader title="Gold in Uganda & Africa: common questions" />
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {company.name} is a licensed gold dealer and exporter in Kampala,
          developing a proposed refining and assay platform. We coordinate
          assay-verified gold supply for institutional buyers and individual
          savers across East and Central Africa.
        </p>
        <div className="divide-y divide-border rounded-lg border border-border bg-white">
          {goldFaqs.map((faq) => (
            <details key={faq.question} className="group px-5 py-4 sm:px-6">
              <summary className="cursor-pointer list-none text-sm font-semibold text-primary marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/gold-in-uganda"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            Gold in Uganda guide
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            Our gold services
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
          >
            Contact us
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}