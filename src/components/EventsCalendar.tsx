import SectionHeader from "./SectionHeader";
import AddToCalendarButton from "./AddToCalendarButton";
import { events } from "@/data/events";

export default function EventsCalendar() {
  return (
    <section className="py-12">
      <SectionHeader title="Upcoming events" />
      {events.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-section-alt px-6 py-10 text-center text-sm text-muted">
          No upcoming events scheduled.
        </p>
      ) : (
        <ul className="space-y-4 lg:max-h-[32rem] lg:overflow-y-auto lg:pr-1">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex flex-col gap-4 rounded-lg border border-border p-5 sm:flex-row sm:items-center sm:justify-between"
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
      )}
    </section>
  );
}