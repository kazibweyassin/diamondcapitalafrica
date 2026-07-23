"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, X } from "lucide-react";
import { investmentOverviewPdf } from "@/data/investment";
import { trackEvent } from "@/lib/analytics";
import {
  isContactFormSuccessSession,
  isInvestmentPopupDismissed,
  markInvestmentPopupShownThisSession,
  setInvestmentPopupDismissed,
  wasInvestmentPopupShownThisSession,
} from "@/lib/storage";

const DELAY_MS = 10_000;
const SCROLL_THRESHOLD = 0.4;
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function isExcludedPath(pathname: string): boolean {
  if (pathname === "/investors/investment-opportunity") return true;
  if (pathname.startsWith("/legal")) return true;
  if (pathname === "/contact" && isContactFormSuccessSession()) return true;
  return false;
}

function isOtherOverlayOpen(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.dcaOverlayOpen === "true";
}

export default function InvestmentPopup() {
  const pathname = usePathname();
  const isClient = useIsClient();
  const reduceMotion = usePrefersReducedMotion();
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const viewedTracked = useRef(false);
  const pendingOpen = useRef(false);

  const [open, setOpen] = useState(false);

  const pagePath = pathname || "/";
  const excluded = isExcludedPath(pagePath);
  const showDialog = open && !excluded;

  const canConsiderShowing = useCallback(() => {
    if (isExcludedPath(pagePath)) return false;
    if (isInvestmentPopupDismissed()) return false;
    if (wasInvestmentPopupShownThisSession()) return false;
    return true;
  }, [pagePath]);

  const tryOpen = useCallback(() => {
    if (!canConsiderShowing()) return;
    if (isOtherOverlayOpen()) {
      pendingOpen.current = true;
      return;
    }
    pendingOpen.current = false;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    markInvestmentPopupShownThisSession();
    setOpen(true);
  }, [canConsiderShowing]);

  const dismiss = useCallback(
    (reason: "close" | "not_now" | "escape" | "overlay") => {
      setInvestmentPopupDismissed();
      setOpen(false);
      trackEvent("investment_popup_dismissed", {
        page_path: pagePath,
        reason,
      });
      previouslyFocused.current?.focus?.();
    },
    [pagePath]
  );

  // Triggers: 10s dwell or 40% scroll
  useEffect(() => {
    if (!isClient) return;
    if (!canConsiderShowing()) return;

    let opened = false;

    function openOnce() {
      if (opened) return;
      opened = true;
      tryOpen();
    }

    const timer = window.setTimeout(openOnce, DELAY_MS);

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = window.scrollY / scrollable;
      if (ratio >= SCROLL_THRESHOLD) openOnce();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isClient, canConsiderShowing, tryOpen, pagePath]);

  // When overlays close, honour pending open
  useEffect(() => {
    if (!isClient) return;

    function onOverlayChange() {
      if (!pendingOpen.current) return;
      if (isOtherOverlayOpen()) return;
      if (!canConsiderShowing()) {
        pendingOpen.current = false;
        return;
      }
      tryOpen();
    }

    window.addEventListener("dca:overlay-change", onOverlayChange);
    return () =>
      window.removeEventListener("dca:overlay-change", onOverlayChange);
  }, [isClient, canConsiderShowing, tryOpen]);

  // Analytics: viewed only when visible
  useEffect(() => {
    if (!showDialog || viewedTracked.current) return;
    viewedTracked.current = true;
    trackEvent("investment_popup_viewed", { page_path: pagePath });
  }, [showDialog, pagePath]);

  // Body scroll lock + focus trap + Escape
  useEffect(() => {
    if (!showDialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusables = () =>
      dialog
        ? (Array.from(dialog.querySelectorAll(FOCUSABLE)) as HTMLElement[])
        : [];

    const first = focusables()[0];
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss("escape");
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        }
      } else if (document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showDialog, dismiss]);

  if (!isClient || !showDialog) return null;

  const animClass = reduceMotion
    ? "opacity-100"
    : "animate-[dca-popup-in_220ms_ease-out]";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close investment opportunity dialog"
        className="absolute inset-0 bg-primary-dark/70 backdrop-blur-[1px]"
        onClick={() => dismiss("overlay")}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-[620px] flex-col overflow-hidden rounded-t-2xl border border-gold/30 bg-white shadow-2xl sm:rounded-xl ${animClass}`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border bg-primary px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold sm:text-xs">
              Strategic investment opportunity
            </p>
            <h2
              id={titleId}
              className="mt-1 text-lg font-bold leading-snug text-white sm:text-xl"
            >
              Help Build East Africa&apos;s Integrated Precious Metals Platform
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dismiss("close")}
            aria-label="Close dialog"
            className="shrink-0 rounded p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <p id={descId} className="text-sm leading-relaxed text-muted">
            Diamond Capital Africa is seeking strategic investors and operating
            partners to support the development of a proposed modern gold
            refinery, assay laboratory and responsible-sourcing infrastructure.
          </p>

          <ul className="mt-5 space-y-2 rounded-lg border border-border bg-section-alt p-4 text-sm text-foreground">
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden
              />
              <span>
                <strong className="font-semibold text-primary">
                  Preliminary capital requirement:
                </strong>{" "}
                USD 4 million
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden
              />
              <span>
                <strong className="font-semibold text-primary">
                  Planned initial capacity:
                </strong>{" "}
                50 kg per month
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden
              />
              <span>
                <strong className="font-semibold text-primary">
                  Planned expansion capacity:
                </strong>{" "}
                Up to 150 kg per month
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden
              />
              <span>
                <strong className="font-semibold text-primary">
                  Development and commissioning target:
                </strong>{" "}
                9–12 months
              </span>
            </li>
          </ul>

          <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted">
            All figures are preliminary planning assumptions and remain subject
            to independent due diligence.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/investors/investment-opportunity"
              onClick={() => {
                trackEvent("investment_popup_opportunity_clicked", {
                  page_path: pagePath,
                });
                setInvestmentPopupDismissed();
                setOpen(false);
              }}
              className="inline-flex min-h-12 items-center justify-center rounded bg-gold px-5 py-3 text-sm font-semibold text-primary transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Explore the Opportunity
            </Link>
            <a
              href={investmentOverviewPdf.path}
              download={investmentOverviewPdf.filename}
              onClick={() => {
                trackEvent("investment_popup_download_clicked", {
                  page_path: pagePath,
                });
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-border px-5 py-3 text-sm font-semibold text-primary transition hover:border-gold hover:bg-section-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Download size={16} aria-hidden />
              Download Investment Overview
            </a>
            <button
              type="button"
              onClick={() => dismiss("not_now")}
              className="min-h-11 text-sm font-semibold text-muted transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Not now
            </button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted">
            This communication is provided solely for preliminary discussion. It
            does not constitute an offer of securities, investment advice, a
            financing commitment or a guarantee of returns.
          </p>
        </div>
      </div>
    </div>
  );
}
