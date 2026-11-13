/**
 * Gleisschild: das wiederkehrende Erkennungszeichen der Seite.
 * Küche, Theke und Biergarten sind die drei „Gleise" des Hauses.
 */
export function Plate({
  number,
  label,
  tone = "light",
}: {
  number?: number | string;
  label: string;
  tone?: "light" | "dark" | "blue";
}) {
  const numberTone =
    tone === "light" ? "bg-blue text-stripe" : "bg-chalk text-night";
  const labelTone =
    tone === "light" ? "text-ink-soft" : tone === "blue" ? "text-stripe" : "text-chalk-soft";

  return (
    <p className="flex items-center gap-3">
      {number !== undefined && (
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-[4px] font-display text-xl font-bold leading-none ${numberTone}`}
          aria-hidden="true"
        >
          {number}
        </span>
      )}
      <span className={`font-display text-lg font-semibold uppercase tracking-[0.04em] ${labelTone}`}>
        {number !== undefined && <span className="sr-only">Gleis {number}: </span>}
        {label}
      </span>
    </p>
  );
}
