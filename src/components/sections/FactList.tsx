import type { ReactNode } from "react";

export type Fact = { icon: ReactNode; title: string; text: string };

/** Kurze Fakten in Spalten – für Biergarten, Fußball und Geschichte. */
export function FactList({
  facts,
  tone = "light",
}: {
  facts: Fact[];
  tone?: "light" | "dark";
}) {
  const line = tone === "light" ? "border-ink" : "border-chalk/60";
  const text = tone === "light" ? "text-ink-soft" : "text-chalk-soft";
  const icon = tone === "light" ? "text-blue" : "text-amber";

  return (
    <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact) => (
        <li key={fact.title} className={`reveal border-t ${line} pt-6`}>
          <span className={`block ${icon}`}>{fact.icon}</span>
          <h3 className="display-3 mt-5">{fact.title}</h3>
          <p className={`mt-3 ${text}`}>{fact.text}</p>
        </li>
      ))}
    </ul>
  );
}
