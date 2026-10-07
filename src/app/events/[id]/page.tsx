import EventDetailClient from "@/components/EventDetailClient";
import { eventsApiUrl } from "@/lib/events";

export async function generateStaticParams() {
  const params: { id: string }[] = [{ id: "0" }];

  try {
    const res = await fetch(eventsApiUrl("/api/events/upcoming"), {
      // Build-time snapshot; runtime still client-fetches the live event.
      cache: "no-store",
    });
    if (res.ok) {
      const rows = (await res.json()) as Array<{ id?: number }>;
      if (Array.isArray(rows)) {
        for (const row of rows) {
          if (row?.id != null) params.push({ id: String(row.id) });
        }
      }
    }
  } catch {
    // Offline / missing API during build — shell id "0" is enough for Nginx fallback.
  }

  return params;
}

export default function EventDetailPage() {
  return <EventDetailClient />;
}
