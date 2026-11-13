import type { ReactNode } from "react";
import { Plate } from "./Plate";

export function SectionHeading({
  plate,
  plateNumber,
  title,
  children,
  tone = "light",
  as: Tag = "h2",
  className = "",
}: {
  plate?: string;
  plateNumber?: number | string;
  title: string;
  children?: ReactNode;
  tone?: "light" | "dark" | "blue";
  as?: "h1" | "h2";
  className?: string;
}) {
  const leadTone =
    tone === "light" ? "text-ink-soft" : tone === "blue" ? "text-stripe/90" : "text-chalk-soft";

  return (
    <div className={`max-w-3xl ${className}`}>
      {plate && <Plate number={plateNumber} label={plate} tone={tone} />}
      <Tag className={`display-2 ${plate ? "mt-5" : ""}`}>{title}</Tag>
      {children && <div className={`lead mt-6 max-w-2xl ${leadTone}`}>{children}</div>}
    </div>
  );
}
