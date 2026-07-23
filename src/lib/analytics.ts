/**
 * Lightweight analytics helper. Works with GTM dataLayer / gtag when present,
 * and always dispatches a custom DOM event for optional listeners.
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  const w = window as Window & {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: name, ...params });

  if (typeof w.gtag === "function") {
    w.gtag("event", name, params ?? {});
  }

  window.dispatchEvent(
    new CustomEvent("dca:analytics", { detail: { name, params } })
  );
}
