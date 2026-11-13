"use client";

import { business } from "@/content/business";
import { describeStatus, getOpenStatus } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

/**
 * Live-Status „Jetzt geöffnet / Geschlossen".
 * Ohne JavaScript erscheint die Kurzfassung der Öffnungszeiten.
 */
export function OpenStatus({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const now = useNow();
  const status = now ? getOpenStatus(now) : null;

  const dot = !status
    ? tone === "light"
      ? "bg-ink-muted"
      : "bg-chalk-soft"
    : status.state === "open"
      ? tone === "light"
        ? "bg-open"
        : "bg-open-bright"
      : tone === "light"
        ? "bg-closed"
        : "bg-closed-bright";

  return (
    <p className={`flex items-center gap-2.5 font-medium ${className}`}>
      <span className={`size-2.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
      <span>{status ? describeStatus(status) : business.hoursSummary}</span>
    </p>
  );
}
