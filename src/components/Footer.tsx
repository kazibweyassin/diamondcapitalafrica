import Link from "next/link";
import { company, navItems } from "@/data/content";
import { Mail, Phone, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <BrandLogo className="h-11 w-auto" />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              {company.description}
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="shrink-0 text-gold" />
                {company.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href={`tel:${company.phoneTel}`} className="transition hover:text-gold">
                  {company.contactName}: {company.phone}
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
              <li>
                <Link
                  href="/services#export"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Buy Gold Bars
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-buy"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  How to Buy Gold
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Buyer Guides
                </Link>
              </li>
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
              <li>
                <Link
                  href="/gold-savings"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Gold Savings
                </Link>
              </li>
              <li>
                <Link
                  href="/network"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Institutional Network
                </Link>
              </li>
              <li>
                <Link
                  href="/gold-in-uganda"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Gold in Uganda
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Gold FAQ
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-white/50 sm:gap-4 md:flex-row md:text-left lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {company.name} Ltd. All rights
            reserved.
          </p>
          <p className="max-w-md md:max-w-none">
            Licensed by the Ministry of Energy & Mineral Development, Uganda
          </p>
        </div>
      </div>
    </footer>
  );
}