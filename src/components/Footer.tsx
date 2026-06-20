import Link from "next/link";
import { company, navItems } from "@/data/content";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-gold">
                <span className="text-lg font-bold text-primary">GC</span>
              </div>
              <span className="font-semibold">{company.name}</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              Uganda&apos;s leading licensed gold dealer and refiner, delivering
              traceable, high-purity gold to global markets since {company.founded}.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-gold" />
                {company.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href="tel:+256700123456" className="transition hover:text-gold">
                  {company.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-gold" />
                <a
                  href={`mailto:${company.email}`}
                  className="transition hover:text-gold"
                >
                  {company.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Company
            </h3>
            <ul className="space-y-2">
              {navItems.slice(0, 3).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Investors
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/news"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  News & Announcements
                </Link>
              </li>
              <li>
                <Link
                  href="/#market-prices"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Market Data
                </Link>
              </li>
              <li>
                <Link
                  href="/#annual-reports"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  ESG Transparency
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about#compliance"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Compliance & Licensing
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-white/50 md:flex-row lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {company.name} Ltd. All rights
            reserved.
          </p>
          <p>Licensed by the Ministry of Energy & Mineral Development, Uganda</p>
        </div>
      </div>
    </footer>
  );
}