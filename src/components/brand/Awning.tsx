const STRIPE = 48;

/**
 * Die Markise: Streifenband mit Bogenkante.
 * Rein dekorativ, daher für Screenreader ausgeblendet.
 */
export function Awning({ className = "" }: { className?: string }) {
  const depth = 30;
  const radius = STRIPE / 2;
  const scallop = (x: number) =>
    `M${x} 0h${STRIPE}v${depth - radius}a${radius} ${radius} 0 0 1-${STRIPE} 0z`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none drop-shadow-[0_8px_8px_rgb(21_24_29/0.16)] ${className}`}
    >
      <div className="awning-band h-10 sm:h-14" />
      <svg className="block w-full" height={depth} focusable="false">
        <defs>
          <pattern
            id="awning-valance"
            width={STRIPE * 2}
            height={depth}
            patternUnits="userSpaceOnUse"
          >
            <path d={scallop(0)} className="fill-blue" />
            <path d={scallop(STRIPE)} className="fill-stripe" />
          </pattern>
        </defs>
        <rect width="100%" height={depth} fill="url(#awning-valance)" />
      </svg>
    </div>
  );
}

/** Schmales Streifenband für Unterseiten und Abschlüsse. */
export function AwningStripe({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`awning-band h-3 [--stripe:24px] ${className}`}
    />
  );
}
