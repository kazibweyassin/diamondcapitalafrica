"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import AddToCalendarButton from "./AddToCalendarButton";
import { events } from "@/data/events";

const MOBILE_VISIBLE = 3;

export default function EventsCalendar() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = events.length > MOBILE_VISIBLE;

  return (
    <section className="py-12">
      <SectionHeader title="Upcoming events" />
      {events.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-10 text-center text-sm text-muted">
          No upcoming events scheduled.
        </p>
      ) : (
        <>
          <ul className="space-y-4 lg:max-h-[32rem] lg:overflow-y-auto lg:pr-1">
            {events.map((event, index) => (
              <li
                key={event.id}
                className={`flex flex-col gap-4 rounded-lg border border-border p-5 sm:flex-row sm:items-center sm:justify-between ${
                  !expanded && index >= MOBILE_VISIBLE ? "hidden lg:flex" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-gold-dark">{event.date}</p>
                  <p className="mt-1 text-base font-medium text-foreground">{event.title}</p>
                  <p className="mt-1 text-xs text-muted">{event.location}</p>
                </div>
                <AddToCalendarButton event={event} />
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition hover:text-gold lg:hidden"
            >
              {expanded ? "Show fewer events" : `View all events (${events.length})`}
              <ArrowRight
                size={14}
                className={`transition-transform ${expanded ? "rotate-90" : ""}`}
              />
            </button>
          )}
        </>
      )}
    </section>
  );
}