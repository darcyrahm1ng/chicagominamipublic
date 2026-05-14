import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

type UpcomingEvent = {
  id: number;
  name?: string | null;
  event_date: string;
  event_time: string;
  event_place: string;
  flyer_url: string;
};

const defaults = {
  subtitle: "Dojo Schedule",
  title: "Events and Calendar",
  calendar_embed:
    "https://calendar.google.com/calendar/embed?src=9815747453fea95e1012ab18880dbf05cbcba75f353b5748ac48909a64a1610c%40group.calendar.google.com&ctz=America%2FChicago",
  max_upcoming: "4",
};

function formatDate(ymd: string): string {
  const d = new Date(`${ymd}T12:00:00`);
  if (Number.isNaN(d.getTime())) return ymd;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function EventsCalendarSection() {
  const c = useSiteContent("events_calendar", defaults);
  const [items, setItems] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    fetch("/api/events/upcoming")
      .then((r) => r.json())
      .then((rows: UpcomingEvent[]) => {
        if (!Array.isArray(rows)) return;
        const max = Math.max(1, Number.parseInt(String(c.max_upcoming || "4"), 10) || 4);
        setItems(rows.slice(0, max));
      })
      .catch(() => setItems([]));
  }, [c.max_upcoming]);

  return (
    <section id="events-calendar" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">{c.subtitle}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{c.title}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-3">
            <iframe
              src={c.calendar_embed}
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              title="Chicago Minami Dojo Calendar"
              className="w-full rounded-md dark:invert dark:hue-rotate-180"
            />
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-serif text-2xl font-semibold mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Upcoming Events
            </h3>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming events currently listed.</p>
            ) : (
              <div className="space-y-4">
                {items.map((ev) => (
                  <article key={ev.id} className="rounded-md border border-border p-4">
                    {ev.name?.trim() ? (
                      <p className="font-serif text-lg font-semibold text-foreground">{ev.name}</p>
                    ) : null}
                    <p
                      className={`text-sm font-semibold text-primary ${ev.name?.trim() ? "mt-1" : ""}`}
                    >
                      {formatDate(ev.event_date)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {ev.event_time}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {ev.event_place}
                    </p>
                    <a
                      href={ev.flyer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm text-primary underline-offset-4 hover:underline"
                    >
                      View Flyer
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
