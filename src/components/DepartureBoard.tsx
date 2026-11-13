"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/content/business";
import { describeStatus, getOpenStatus, localTime } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

type Row = {
  time: string;
  destination: string;
  via: string;
  track: number;
  href: string;
};

const opening = business.hours.find((entry) => entry.open)?.open ?? "";

const rows: Row[] = [
  {
    time: opening,
    destination: "Küche",
    via: "Gyros · Pizza · Schnitzel",
    track: 1,
    href: "/speisekarte",
  },
  {
    time: opening,
    destination: "Theke",
    via: "Kölsch & Pils vom Fass · Fußball · Dart",
    track: 2,
    href: "/fussball-dart",
  },
  {
    time: "nachm.",
    destination: "Biergarten",
    via: "bei schönem Wetter",
    track: 3,
    href: "/biergarten",
  },
];

/** Einzelne Zeichen als Fallblatt-Kacheln. */
function Flaps({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-hidden="true">
      {[...text].map((char, index) =>
        char === ":" ? (
          <span key={index} className="self-center px-px text-amber">
            :
          </span>
        ) : (
          <span
            key={index}
            className="relative grid h-[1.5em] w-[0.95em] place-items-center rounded-[3px] bg-night-sunk text-amber shadow-[inset_0_0_0_1px_rgb(244_239_228/0.08)]"
          >
            {char}
            <span className="absolute inset-x-0 top-1/2 h-px bg-night/90" />
          </span>
        ),
      )}
    </span>
  );
}

/**
 * Abfahrtstafel: zeigt, was im Haus „abfährt", die Uhrzeit vor Ort
 * und ob gerade geöffnet ist.
 */
export function DepartureBoard({ className = "" }: { className?: string }) {
  const now = useNow();
  const status = now ? getOpenStatus(now) : null;
  const clock = now ? localTime(now).clock : "--:--";

  return (
    <section
      aria-label="Heute im Bahnstadtgrill"
      className={`on-dark overflow-hidden rounded-panel bg-night text-chalk shadow-[0_24px_48px_-24px_rgb(21_24_29/0.55)] ${className}`}
    >
      <header className="flex items-center justify-between gap-4 border-b border-night-line px-5 py-4 sm:px-6">
        <div>
          <p className="font-display text-2xl font-bold uppercase leading-none tracking-[0.04em]">
            Abfahrt
          </p>
          <p className="mt-1 text-sm text-chalk-soft">Bahnstadtgrill Opladen</p>
        </div>
        <p className="font-display text-3xl font-semibold leading-none">
          <span className="sr-only">Uhrzeit vor Ort: {clock}</span>
          <Flaps text={clock} />
        </p>
      </header>

      <div
        className="grid grid-cols-[5.5rem_1fr_auto] gap-x-4 px-5 pt-3 text-sm text-chalk-soft sm:px-6"
        aria-hidden="true"
      >
        <span>Zeit</span>
        <span>Ziel</span>
        <span>Gleis</span>
      </div>

      <ul>
        {rows.map((row) => (
          <li key={row.destination} className="border-b border-night-line last:border-b-0">
            <Link
              href={row.href}
              className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-x-4 px-5 py-4 transition-colors duration-150 hover:bg-night-raised sm:px-6"
            >
              <span className="font-display text-lg font-semibold leading-none">
                {row.time.includes(":") ? (
                  <>
                    <span className="sr-only">ab {row.time} Uhr: </span>
                    <Flaps text={row.time} />
                  </>
                ) : (
                  <span className="text-amber">{row.time}</span>
                )}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-display text-[1.75rem] font-semibold uppercase leading-none tracking-[0.02em]">
                  {row.destination}
                  <ArrowRight
                    className="size-5 shrink-0 text-chalk-soft transition-transform duration-150 group-hover:translate-x-1 group-hover:text-chalk"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 block text-[0.9375rem] leading-snug text-chalk-soft">
                  {row.via}
                </span>
              </span>
              <span
                className="grid size-9 place-items-center rounded-[4px] bg-chalk font-display text-2xl font-bold leading-none text-night"
                aria-hidden="true"
              >
                {row.track}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="flex items-center gap-3 bg-night-sunk px-5 py-4 sm:px-6" aria-live="polite">
        <span
          className={`size-2.5 shrink-0 rounded-full ${
            !status
              ? "bg-chalk-soft"
              : status.state === "open"
                ? "bg-open-bright"
                : "bg-closed-bright"
          }`}
          aria-hidden="true"
        />
        <p className="font-medium">
          {status ? describeStatus(status) : business.hoursSummary}
        </p>
      </footer>
    </section>
  );
}
