"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { navItems } from "@/data/content";
import BrandLogo from "./BrandLogo";
import SearchModal from "./SearchModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary shadow-lg">
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
            <Link href="/" className="flex items-center">
              <BrandLogo priority className="h-9 w-auto sm:h-10 md:h-11" />
            </Link>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="hidden text-white/70 transition hover:text-gold md:block"
              >
                <Search size={20} />
              </button>
              <Link
                href="/network"
                className="hidden text-sm font-semibold text-white/90 transition hover:text-gold lg:block"
              >
                Institutional Network
              </Link>
              <Link
                href="/contact?subject=Gold%20Buying%20Enquiry"
                className="hidden rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light md:block"
              >
                Get a Quote
              </Link>
              <button
                type="button"
                aria-label="Toggle menu"
                className="text-white lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden lg:block">
          <div className="mx-auto max-w-7xl px-8">
            <ul className="flex">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-3.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-gold"
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} />}
                  </Link>
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full min-w-[220px] bg-white shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-foreground transition hover:bg-section-alt hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {mobileOpen && (
          <nav className="border-t border-white/10 bg-primary-dark lg:hidden">
            <ul className="px-4 py-2">
              <li className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileOpen(false);
                  }}
                  className="flex w-full items-center gap-2 py-3 text-sm font-medium text-white"
                >
                  <Search size={16} />
                  Search
                </button>
              </li>
              {navItems.map((item) => (
                <li key={item.label} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    className="block py-3 text-sm font-medium text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="pb-2 pl-4">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block py-2 text-sm text-white/70"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="px-0 py-3">
                <Link
                  href="/network"
                  className="flex min-h-11 items-center justify-center rounded border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  Institutional Network
                </Link>
              </li>
              <li className="px-0 py-4">
                <Link
                  href="/contact?subject=Gold%20Buying%20Enquiry"
                  className="flex min-h-11 items-center justify-center rounded bg-gold px-4 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}