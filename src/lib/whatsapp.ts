"use client";

import { useEffect, useState } from "react";
import { company } from "@/data/content";

export const WHATSAPP_ROTATION_DAYS = 3;

const ROTATION_MS = WHATSAPP_ROTATION_DAYS * 24 * 60 * 60 * 1000;

/** First primary window starts here; then inquiries flip every 3 days. */
const ROTATION_EPOCH_MS = Date.UTC(2026, 7, 15);

export type InquiryLine = {
  display: string;
  tel: string;
  whatsappUrl: string;
};

const LINES: InquiryLine[] = [
  {
    display: company.phone,
    tel: company.phoneTel,
    whatsappUrl: company.whatsappUrl,
  },
  {
    display: company.phoneAlt,
    tel: company.phoneAltTel,
    whatsappUrl: company.whatsappUrlAlt,
  },
];

const INITIAL_PAIR = { active: LINES[0], fallback: LINES[1] };

/** All visitors in a 3-day window use one number; the other stays as fallback. */
export function getActiveInquiryLine(now = Date.now()) {
  const elapsed = Math.max(0, now - ROTATION_EPOCH_MS);
  const index = Math.floor(elapsed / ROTATION_MS) % LINES.length;
  return {
    active: LINES[index],
    fallback: LINES[(index + 1) % LINES.length],
  };
}

export function getActiveWhatsAppUrl(now = Date.now()) {
  return getActiveInquiryLine(now).active.whatsappUrl;
}

export function useActiveInquiryLine() {
  const [pair, setPair] = useState(INITIAL_PAIR);

  useEffect(() => {
    setPair(getActiveInquiryLine());
  }, []);

  return pair;
}

export function useActiveWhatsAppUrl() {
  return useActiveInquiryLine().active.whatsappUrl;
}
