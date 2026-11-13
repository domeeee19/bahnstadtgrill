"use client";

import { business } from "@/content/business";
import { localTime } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

export function HoursTable({ tone = "light" }: { tone?: "light" | "dark" }) {
  const now = useNow();
  const today = now ? localTime(now).day : null;
  const line = tone === "light" ? "border-line" : "border-night-line";
  const muted = tone === "light" ? "text-ink-muted" : "text-chalk-soft";

  return (
    <table className="w-full text-left">
      <caption className="sr-only">Öffnungszeiten</caption>
      <tbody>
        {business.hours.map((entry) => {
          const isToday = entry.day === today;
          return (
            <tr key={entry.day} className={`border-b ${line} last:border-b-0`}>
              <th
                scope="row"
                className={`py-2.5 pr-4 ${isToday ? "font-semibold" : "font-normal"}`}
              >
                {entry.label}
                {isToday && <span className={`ml-2 text-sm font-normal ${muted}`}>heute</span>}
              </th>
              <td
                className={`py-2.5 text-right ${isToday ? "font-semibold" : ""} ${
                  entry.open ? "" : muted
                }`}
              >
                {entry.open ? `${entry.open}–${entry.close} Uhr` : "Ruhetag"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
