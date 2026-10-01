import Link from "next/link";

const accounts = [
  { href: "/network/access", label: "Buyer sign up" },
  { href: "/network/login", label: "Buyer sign in" },
  { href: "/network/apply", label: "Supplier sign up" },
  { href: "/network/supplier/login", label: "Supplier sign in" },
] as const;

export default function NetworkAccountLinks({
  current,
  tone = "onDark",
}: {
  current: (typeof accounts)[number]["href"];
  tone?: "onDark" | "onLight";
}) {
  return (
    <nav aria-label="Buyer and supplier accounts" className="flex flex-wrap gap-2">
      {accounts.map((item) => {
        const active = item.href === current;
        const className = active
          ? "inline-flex min-h-11 items-center justify-center rounded bg-gold px-3 py-2 text-sm font-semibold text-primary"
          : tone === "onDark"
            ? "inline-flex min-h-11 items-center justify-center rounded border border-white/35 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            : "inline-flex min-h-11 items-center justify-center rounded border border-primary/25 px-3 py-2 text-sm font-semibold text-primary transition hover:border-gold hover:text-gold-dark";
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={className}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
