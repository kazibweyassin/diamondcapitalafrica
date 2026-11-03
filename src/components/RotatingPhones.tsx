"use client";

import { company } from "@/data/content";
import { useActiveInquiryLine } from "@/lib/whatsapp";

type Variant = "footer" | "contact" | "card";

export default function RotatingPhones({ variant }: { variant: Variant }) {
  const { active, fallback } = useActiveInquiryLine();
  const getLineLabel = (tel: string) =>
    tel === company.phoneAltTel ? "International/WhatsApp line" : "Uganda line";

  if (variant === "footer") {
    return (
      <span className="flex flex-col gap-1">
        <a href={`tel:${active.tel}`} className="transition hover:text-gold">
          {company.contactName}: {getLineLabel(active.tel)} {active.display}
        </a>
        <a href={`tel:${fallback.tel}`} className="transition hover:text-gold">
          {getLineLabel(fallback.tel)} {fallback.display}
        </a>
      </span>
    );
  }

  if (variant === "contact") {
    return (
      <div>
        <p className="font-semibold">{company.contactName}</p>
        <a
          href={`tel:${active.tel}`}
          className="block text-sm text-muted transition hover:text-gold"
        >
          {getLineLabel(active.tel)}: {active.display}
        </a>
        <a
          href={`tel:${fallback.tel}`}
          className="mt-1 block text-sm text-muted transition hover:text-gold"
        >
          {getLineLabel(fallback.tel)}: {fallback.display}
        </a>
      </div>
    );
  }

  return (
    <>
      <p className="mb-1 text-sm font-semibold text-foreground">
        <a href={`tel:${active.tel}`} className="hover:text-gold">
          {getLineLabel(active.tel)}: {active.display}
        </a>
      </p>
      <p className="mb-1 text-sm text-muted">
        <a href={`tel:${fallback.tel}`} className="hover:text-gold">
          {getLineLabel(fallback.tel)}: {fallback.display}
        </a>
      </p>
    </>
  );
}