import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import {
  prequalificationItems,
  trustSignals,
} from "@/data/buyer-education";
import { company } from "@/data/content";

type TrustPrequalBlockProps = {
  /** Compact variant for sidebars and contact column */
  compact?: boolean;
  showProcedureLink?: boolean;
};

export default function TrustPrequalBlock({
  compact = false,
  showProcedureLink = true,
}: TrustPrequalBlockProps) {
  return (
    <div
      className={
        compact
          ? "space-y-6"
          : "grid gap-8 lg:grid-cols-2 lg:gap-10"
      }
    >
      <div
        className={
          compact
            ? "rounded-xl border border-border bg-white p-5"
            : "rounded-xl border border-border bg-white p-6 md:p-8"
        }
      >
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck size={20} className="shrink-0 text-gold" />
          <h2
            className={
              compact
                ? "text-lg font-bold text-primary"
                : "text-xl font-bold text-primary md:text-2xl"
            }
          >
            Why serious buyers trust {company.shortName}
          </h2>
        </div>
        <ul className={compact ? "space-y-3" : "space-y-4"}>
          {trustSignals.map((signal) => (
            <li key={signal.title}>
              <p className="text-sm font-semibold text-foreground">
                {signal.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {signal.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={
          compact
            ? "rounded-xl border border-gold/30 bg-section-alt p-5"
            : "rounded-xl border border-gold/30 bg-section-alt p-6 md:p-8"
        }
      >
        <h2
          className={
            compact
              ? "mb-2 text-lg font-bold text-primary"
              : "mb-2 text-xl font-bold text-primary md:text-2xl"
          }
        >
          What to include in your enquiry
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted">
          We prioritise complete institutional enquiries. Incomplete \"any
          quantity, cheapest price\" messages are usually not serious buyers.
        </p>
        <ul className="space-y-2.5">
          {prequalificationItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <CheckCircle
                size={16}
                className="mt-0.5 shrink-0 text-gold"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {showProcedureLink && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/how-to-buy"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Full buying procedure
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact?subject=Export%20Services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
            >
              Contact export desk
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
