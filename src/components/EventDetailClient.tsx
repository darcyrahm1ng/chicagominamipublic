"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Clock, MapPin, Ticket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchEvent,
  formatEventDate,
  formatEventTime,
  submitEventSignup,
  type DojoEvent,
} from "@/lib/events";

function eventIdFromPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "events" || !parts[1]) return null;
  const id = parts[1];
  if (id === "0" || id === "_") return null;
  return /^\d+$/.test(id) ? id : null;
}

export default function EventDetailClient() {
  const pathname = usePathname() ?? "";
  const eventId = useMemo(() => eventIdFromPath(pathname), [pathname]);

  const [event, setEvent] = useState<DojoEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [attendeesCount, setAttendeesCount] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      setEvent(null);
      setLoadError("Event not found.");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setLoadError("");

    fetchEvent(eventId)
      .then((row) => {
        if (cancelled) return;
        if (!row) {
          setEvent(null);
          setLoadError("Event not found.");
          return;
        }
        setEvent(row);
      })
      .catch(() => {
        if (!cancelled) {
          setEvent(null);
          setLoadError("Could not load this event.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    if (!eventId) return;

    setSubmitError("");
    setSubmitSuccess(false);
    setSubmitting(true);

    try {
      await submitEventSignup(eventId, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        attendees_count: Number.parseInt(attendeesCount, 10) || 1,
      });
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setAttendeesCount("1");
      setSubmitSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not submit signup.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to events
          </Link>

          {loading ? (
            <p className="text-muted-foreground py-20 text-center">Loading event…</p>
          ) : loadError || !event ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-foreground font-serif text-2xl">{loadError || "Event not found."}</p>
              <Link href="/events" className="text-primary underline-offset-4 hover:underline">
                View all events
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-3 space-y-6">
                <div className="rounded-lg overflow-hidden border border-border bg-card">
                  <img
                    src={event.flyer_url}
                    alt={event.name?.trim() || "Event flyer"}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {event.description?.trim() ? (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-3">About</h2>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {event.description}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div>
                  <p className="text-primary tracking-[0.2em] uppercase text-xs font-medium mb-3">
                    Event
                  </p>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {event.name?.trim() || `Event #${event.id}`}
                  </h1>
                  <p className="mt-4 text-lg font-semibold text-primary">
                    {formatEventDate(event.event_date)}
                  </p>
                  <p className="mt-3 text-foreground/80 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    {formatEventTime(event.event_time)}
                  </p>
                  <p className="mt-2 text-foreground/80 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    {event.event_place}
                  </p>
                  {event.ticket_url ? (
                    <a
                      href={event.ticket_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase shadow-gold hover:scale-[1.02] transition-transform"
                    >
                      <Ticket className="h-4 w-4" />
                      Get tickets
                    </a>
                  ) : null}
                  <a
                    href={event.flyer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center w-full border border-foreground/30 text-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase hover:border-primary hover:text-primary transition-colors"
                  >
                    View flyer
                  </a>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Sign up</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Reserve your spot. We’ll confirm your registration with the dojo.
                  </p>

                  {submitSuccess && (
                    <p
                      className="mb-4 text-sm text-primary border border-primary/30 bg-primary/10 rounded-md px-3 py-2"
                      role="status"
                    >
                      Thanks — your signup was received.
                    </p>
                  )}
                  {submitError && (
                    <p className="mb-4 text-sm text-destructive" role="alert">
                      {submitError}
                    </p>
                  )}

                  <form onSubmit={(e) => void handleSignup(e)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="signup-first" className="text-sm text-foreground/80">
                          First name
                        </label>
                        <input
                          id="signup-first"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="signup-last" className="text-sm text-foreground/80">
                          Last name
                        </label>
                        <input
                          id="signup-last"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="signup-phone" className="text-sm text-foreground/80">
                        Telephone number
                      </label>
                      <input
                        id="signup-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="signup-email" className="text-sm text-foreground/80">
                        Email
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="signup-attendees" className="text-sm text-foreground/80">
                        Number of attendees
                      </label>
                      <input
                        id="signup-attendees"
                        type="number"
                        min={1}
                        max={20}
                        required
                        value={attendeesCount}
                        onChange={(e) => setAttendeesCount(e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm tracking-wider uppercase shadow-gold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
                    >
                      {submitting ? "Submitting…" : "Sign up"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
