import { apiUrl } from "@/lib/api";

export type DojoEvent = {
  id: number;
  name?: string | null;
  event_date: string;
  event_time: string;
  event_place: string;
  description?: string | null;
  ticket_url?: string | null;
  flyer_url: string;
};

export type EventSignupPayload = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  attendees_count: number;
};

export function formatEventDate(ymd: string): string {
  const d = new Date(`${ymd}T12:00:00`);
  if (Number.isNaN(d.getTime())) return ymd;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventTime(hm: string): string {
  const m = hm.trim().match(/^(\d{1,2}):(\d{2})/);
  if (!m) return hm;
  let h = Number.parseInt(m[1], 10);
  const minute = m[2];
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minute} ${period}`;
}

export async function fetchUpcomingEvents(): Promise<DojoEvent[]> {
  const res = await fetch(apiUrl("/api/events/upcoming"));
  if (!res.ok) throw new Error("Could not load events");
  const rows = (await res.json()) as unknown;
  return Array.isArray(rows) ? (rows as DojoEvent[]) : [];
}

export async function fetchEvent(id: string | number): Promise<DojoEvent | null> {
  const res = await fetch(apiUrl(`/api/events/${id}`));
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Could not load event");
  return (await res.json()) as DojoEvent;
}

export async function submitEventSignup(
  eventId: string | number,
  payload: EventSignupPayload,
): Promise<void> {
  const res = await fetch(apiUrl(`/api/events/${eventId}/signups`), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Could not submit signup.";
    try {
      const data = (await res.json()) as {
        message?: string;
        errors?: Record<string, string[]>;
      };
      if (data.message) message = data.message;
      else if (data.errors) {
        const first = Object.values(data.errors).flat()[0];
        if (first) message = first;
      }
    } catch {
      // keep default
    }
    throw new Error(message);
  }
}
