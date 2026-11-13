"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { business } from "@/content/business";

/**
 * Google Maps als Zwei-Klick-Lösung: Die Karte – und damit die Verbindung
 * zu Google – wird erst nach ausdrücklichem Klick geladen.
 */
export function MapConsent({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Karte: ${business.name}, ${business.address.oneLine}`}
        src={business.links.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer"
        allowFullScreen
        className={`block size-full min-h-80 border-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative isolate flex size-full min-h-80 flex-col items-center justify-center overflow-hidden bg-blue-tint p-6 text-center ${className}`}
    >
      {/* Skizze der Lage: Gleise, Bahnhofsbrücke, Standort */}
      <svg
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 -z-10 size-full text-blue"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" fill="none">
          <path d="M210 -10 L250 410" />
          <path d="M226 -10 L266 410" />
          <path d="M252 -10 L292 410" />
          <path d="M268 -10 L308 410" />
        </g>
        <g stroke="currentColor" strokeOpacity="0.16" strokeWidth="14" fill="none" strokeLinecap="round">
          <path d="M-10 228 L610 168" />
          <path d="M392 -10 L420 410" />
          <path d="M-10 92 L200 70" />
          <path d="M330 330 L610 300" />
        </g>
        <path d="M150 215 L370 193" stroke="currentColor" strokeOpacity="0.4" strokeWidth="18" fill="none" />
      </svg>

      <div className="flex max-w-sm flex-col items-center rounded-card border border-line bg-paper-raised px-6 py-8 shadow-[0_12px_32px_-16px_rgb(15_47_107/0.35)]">
      <MapPin className="size-9 text-blue" aria-hidden="true" />
      <p className="mt-3 font-display text-2xl font-semibold uppercase leading-tight text-blue-deep">
        {business.address.street}
      </p>
      <p className="text-ink-soft">
        {business.address.postalCode} {business.address.city}-{business.address.district}
      </p>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className={buttonClasses("primary", "mt-6")}
      >
        Karte laden
      </button>
      <p className="mt-4 max-w-sm text-sm leading-snug text-ink-soft">
        Beim Laden der Karte werden Daten an Google übertragen. Mehr dazu in der{" "}
        <Link href="/datenschutz#google-maps" className="text-link">
          Datenschutzerklärung
        </Link>
        .
      </p>
      </div>
    </div>
  );
}
