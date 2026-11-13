import { business } from "@/content/business";

/** Bildmarke: die blau-weiße Markise über dem Eingang. */
export function AwningMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 28"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="32" height="5" rx="1.5" className="fill-blue-deep" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${i * 8} 5h8v14a4 4 0 0 1-8 0z`}
          className={i % 2 === 0 ? "fill-blue" : "fill-stripe stroke-blue/45"}
          strokeWidth={i % 2 === 0 ? 0 : 1}
        />
      ))}
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-3">
      <AwningMark className="h-7 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.625rem] font-bold uppercase leading-none tracking-[0.01em] ${
            tone === "light" ? "text-ink" : "text-chalk"
          }`}
        >
          {business.shortName}
        </span>
        <span
          className={`mt-0.5 font-display text-sm font-semibold uppercase leading-none tracking-[0.18em] ${
            tone === "light" ? "text-blue" : "text-chalk-soft"
          }`}
        >
          {business.address.district}
        </span>
      </span>
    </span>
  );
}
