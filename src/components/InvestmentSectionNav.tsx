"use client";

import { useEffect, useState } from "react";
import { investmentSectionNav } from "@/data/investment";

export default function InvestmentSectionNav() {
  const items = investmentSectionNav;
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const hash = window.location.hash.replace("#", "");
    if (hash && items.some((item) => item.id === hash)) {
      setActiveId(hash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.4, 0.6, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Investment page sections"
      className="sticky top-14 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:top-[4.5rem]"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <ul className="flex snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:py-2.5 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="shrink-0 snap-start">
                <a
                  href={`#${item.id}`}
                  className={`block rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-section-alt hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
