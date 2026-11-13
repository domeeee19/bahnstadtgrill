import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "chalk" | "outline-chalk";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-control px-5 py-2.5 text-base font-semibold leading-tight transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-stripe hover:bg-blue-deep",
  outline:
    "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper",
  chalk: "bg-chalk text-night hover:bg-white",
  "outline-chalk":
    "border-[1.5px] border-chalk/70 text-chalk hover:border-chalk hover:bg-chalk hover:text-night",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Link im Button-Stil. Interne Ziele laufen über den Next-Router. */
export function ButtonLink({
  href,
  variant = "primary",
  icon,
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
