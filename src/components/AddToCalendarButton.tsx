"use client";

import { useState } from "react";
import { CalendarPlus, Check } from "lucide-react";
import type { CalendarEvent } from "@/types";
import { downloadIcsEvent } from "@/lib/calendar";

export default function AddToCalendarButton({ event }: { event: CalendarEvent }) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    downloadIcsEvent(event);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex min-h-11 shrink-0 items-center gap-1 self-start rounded border border-primary px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white sm:self-center"
    >
      {added ? (
        <>
          <Check size={14} />
          Downloaded
        </>
      ) : (
        <>
          <CalendarPlus size={14} />
          Add to calendar
        </>
      )}
    </button>
  );
}