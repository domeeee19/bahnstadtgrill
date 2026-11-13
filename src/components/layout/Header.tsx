"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Menu, Navigation, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { OpenStatus } from "@/components/OpenStatus";
import { buttonClasses } from "@/components/ui/Button";
import { business } from "@/content/business";
import { legalNav, mainNav } from "@/content/navigation";

export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Menü schließen, sobald zu einer anderen Seite navigiert wurde.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between gap-6 px-5 sm:px-8 lg:h-[4.5rem] lg:px-10">
        <Link
          href="/"
          aria-label={`${business.name} – zur Startseite`}
          className="shrink-0"
        >
          <Logo />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative block rounded-control px-3 py-2 text-base font-medium transition-colors duration-150 hover:text-blue ${
                    isActive(item.href)
                      ? "text-blue after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:bg-blue"
                      : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phone.href}
            className={buttonClasses("primary", "min-h-11 px-4 max-md:hidden")}
          >
            <Phone className="size-[1.125rem]" aria-hidden="true" />
            <span>{business.phone.display}</span>
          </a>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            aria-haspopup="dialog"
            className="inline-flex min-h-11 items-center gap-2 rounded-control border-[1.5px] border-ink px-3.5 font-semibold transition-colors duration-150 hover:bg-ink hover:text-paper lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
            <span>Menü</span>
          </button>
        </div>
      </div>

      <dialog ref={dialogRef} className="site-menu" aria-label="Menü">
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
            <Link href="/" aria-label="Zur Startseite">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex min-h-11 items-center gap-2 rounded-control border-[1.5px] border-ink px-3.5 font-semibold transition-colors duration-150 hover:bg-ink hover:text-paper"
            >
              <X className="size-5" aria-hidden="true" />
              <span>Schließen</span>
            </button>
          </div>

          <nav aria-label="Hauptnavigation mobil" className="px-5 py-6 sm:px-8">
            <ul>
              {[{ href: "/", label: "Startseite" }, ...mainNav].map((item, index) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex items-center gap-4 py-4 font-display text-[2rem] font-semibold uppercase leading-none ${
                      isActive(item.href) ? "text-blue" : "text-ink"
                    }`}
                  >
                    <span className="w-6 text-lg text-ink-muted" aria-hidden="true">
                      {index + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-4 bg-paper-sunk px-5 py-6 sm:px-8">
            <OpenStatus />
            <div className="grid grid-cols-2 gap-3">
              <a href={business.phone.href} className={buttonClasses("primary")}>
                <Phone className="size-[1.125rem]" aria-hidden="true" />
                <span>Anrufen</span>
              </a>
              <a
                href={business.links.mapsRoute}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("outline")}
              >
                <Navigation className="size-[1.125rem]" aria-hidden="true" />
                <span>Route</span>
              </a>
            </div>
            <ul className="flex gap-6 text-[0.9375rem] text-ink-soft">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </header>
  );
}
