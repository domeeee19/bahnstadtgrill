/** Emaille-Schild wie am Bahnsteig. */
export function StationSign({
  title,
  caption,
  faded = false,
  className = "",
}: {
  title: string;
  caption?: string;
  faded?: boolean;
  className?: string;
}) {
  const screw = "absolute size-1.5 rounded-full bg-blue-deep/50";
  return (
    <div
      className={`relative rounded-card border-[3px] px-7 py-5 text-center ${
        faded
          ? "border-ink/25 bg-paper-sunk text-ink-muted"
          : "border-blue bg-stripe text-blue-deep shadow-[0_2px_0_rgb(21_24_29/0.12)]"
      } ${className}`}
    >
      {!faded && (
        <>
          <span className={`${screw} left-2 top-2`} aria-hidden="true" />
          <span className={`${screw} right-2 top-2`} aria-hidden="true" />
          <span className={`${screw} bottom-2 left-2`} aria-hidden="true" />
          <span className={`${screw} bottom-2 right-2`} aria-hidden="true" />
        </>
      )}
      <p className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
        {title}
      </p>
      {caption && (
        <p className="mt-2 font-display text-base font-semibold uppercase tracking-[0.12em]">
          {caption}
        </p>
      )}
    </div>
  );
}
