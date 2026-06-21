"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ServiceNavItem {
  id: string;
  shortTitle: string;
}

interface ServiceSectionNavProps {
  items: ServiceNavItem[];
}

export default function ServiceSectionNav({ items }: ServiceSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

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
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Service sections"
      className="sticky top-14 z-40 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 lg:top-[6.5rem]"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={`/services#${item.id}`}
                  className={`block rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-section-alt hover:text-primary"
                  }`}
                >
                  {item.shortTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}