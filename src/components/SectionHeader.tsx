import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  href?: string;
  id?: string;
}

export default function SectionHeader({ title, href, id }: SectionHeaderProps) {
  return (
    <div id={id} className="mb-8 flex items-center justify-between border-b border-border pb-4">
      <h2 className="text-xl font-bold text-primary md:text-2xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold"
        >
          See all
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}