"use client";

import { useState } from "react";
import { CalendarPlus, Check } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { events } from "@/data/content";
import { downloadIcsEvent } from "@/lib/calendar";

export default function EventsCalendar() {
  const [added, setAdded] = useState<string | null>(null);

  function handleAddToCalendar(eventId: string) {
    const event = events.find((item) => item.id === eventId);
    if (!event) return;
    downloadIcsEvent(event);
    setAdded(eventId);
    setTimeout(() => setAdded(null), 2000);
  }

  return (
    <section className="py-12">
      <SectionHeader title="Upcoming events" />
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="flex flex-col gap-4 rounded-lg border border-border p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gold-dark">
                {event.date}
              </p>
              <p className="mt-1 text-base font-medium text-foreground">
                {event.title}
              </p>
              <p className="mt-1 text-xs text-muted">{event.location}</p>
            </div>
            <button
              type="button"
              onClick={() => handleAddToCalendar(event.id)}
              className="flex shrink-0 items-center gap-1 self-start rounded border border-primary px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white sm:self-center"
            >
              {added === event.id ? (
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
          </li>
        ))}
      </ul>
    </section>
  );
}