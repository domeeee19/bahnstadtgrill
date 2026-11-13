import { Leaf } from "lucide-react";
import type { MenuItem } from "@/content/menu";

/** Gerichteliste im Fahrplan-Stil. Preise erscheinen, sobald sie gepflegt sind. */
export function MenuList({
  items,
  columns = 2,
  tone = "light",
}: {
  items: MenuItem[];
  columns?: 1 | 2;
  tone?: "light" | "dark";
}) {
  const line = tone === "light" ? "border-line" : "border-night-line";
  const muted = tone === "light" ? "text-ink-muted" : "text-chalk-soft";

  return (
    <ul className={`grid gap-x-12 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li key={item.name} className={`flex items-baseline gap-4 border-b ${line} py-3.5`}>
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-snug">
              {item.name}
              {item.homemade && (
                <span className="ml-2 inline-block rounded-[4px] bg-mark px-1.5 py-0.5 align-[0.1em] text-[0.8125rem] font-medium leading-none text-ink">
                  hausgemacht
                </span>
              )}
              {item.vegetarian && (
                <span className="ml-2 inline-flex items-center align-[-0.1em] text-open" title="vegetarisch">
                  <Leaf className="size-4" aria-hidden="true" />
                  <span className="sr-only">vegetarisch</span>
                </span>
              )}
            </p>
            {item.description && (
              <p className={`mt-0.5 text-[0.9375rem] leading-snug ${muted}`}>{item.description}</p>
            )}
          </div>
          {item.price && (
            <p className="shrink-0 font-semibold">
              {item.price}&nbsp;€
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
