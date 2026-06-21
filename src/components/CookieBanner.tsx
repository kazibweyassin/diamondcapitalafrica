"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookieConsent, setCookieConsent } from "@/lib/storage";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) return null;

  function accept() {
    setCookieConsent(true);
    setVisible(false);
  }

  function decline() {
    setCookieConsent(false);
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-border bg-white p-4 shadow-lg pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          We use essential local storage for form submissions and market data
          caching. See our{" "}
          <Link href="/legal/cookies" className="text-gold-dark underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={decline}
            className="rounded border border-border px-4 py-2 text-sm font-medium transition hover:bg-section-alt"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded bg-gold px-4 py-2 text-sm font-semibold text-primary transition hover:bg-gold-light"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}