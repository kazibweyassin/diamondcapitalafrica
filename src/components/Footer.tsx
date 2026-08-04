import type { ReactNode } from "react";
import Link from "next/link";
import { company, navItems, socialLinks } from "@/data/content";
import { Mail, Phone, MapPin } from "lucide-react";
import BrandLogo from "./BrandLogo";

function SocialSvg({
  className,
  path,
}: {
  className?: string;
  path: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

const iconClass = "h-[18px] w-[18px]";

const socialIcons: Record<(typeof socialLinks)[number]["id"], ReactNode> = {
  linkedin: (
    <SocialSvg
      className={iconClass}
      path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  ),
  x: (
    <SocialSvg
      className={iconClass}
      path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
    />
  ),
  facebook: (
    <SocialSvg
      className={iconClass}
      path="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.953.93-1.953 1.886v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
    />
  ),
};

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
              <p className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                <span className="flex flex-col gap-1">
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="transition hover:text-gold"
                  >
                    {company.contactName}: {company.phone}
                  </a>
                  <a
                    href={`tel:${company.phoneAltTel}`}
                    className="transition hover:text-gold"
                  >
                    Alt: {company.phoneAlt}
                  </a>
                </span>
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

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
                Follow us
              </p>
              <ul className="flex flex-wrap items-center gap-2">
                {socialLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`${company.name} on ${link.label}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 text-white/80 transition hover:border-gold hover:text-gold"
                    >
                      {socialIcons[link.id]}
                    </a>
                  </li>
                ))}
              </ul>
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
                  href="/investors/investment-opportunity"
                  className="text-sm text-white/70 transition hover:text-gold"
                >
                  Investment Opportunity
                </Link>
              </li>
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
