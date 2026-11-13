import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AwningStripe } from "@/components/brand/Awning";
import { Logo } from "@/components/brand/Logo";
import { HoursTable } from "@/components/HoursTable";
import { OpenStatus } from "@/components/OpenStatus";
import { business } from "@/content/business";
import { legalNav, mainNav } from "@/content/navigation";

const heading = "font-display text-xl font-semibold uppercase tracking-[0.04em] text-chalk";
const link =
  "text-chalk-soft underline-offset-4 transition-colors duration-150 hover:text-chalk hover:underline";

export function Footer() {
  return (
    <footer className="on-dark bg-night pb-14 text-chalk md:pb-0">
      <AwningStripe />
      <div className="mx-auto w-full max-w-site px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.1fr_0.8fr] lg:gap-10">
          <div>
            <Link href="/" aria-label={`${business.name} – zur Startseite`} className="inline-block">
              <Logo tone="dark" />
            </Link>
            <p className="mt-6 max-w-xs text-chalk-soft">
              {business.claim}. Früher „{business.formerName}“, heute Treffpunkt
              für Nachbarn, Pendler und Fußballfans.
            </p>
          </div>

          <div>
            <h2 className={heading}>Besuchen</h2>
            <address className="mt-4 space-y-1 not-italic text-chalk-soft">
              <p>{business.address.street}</p>
              <p>
                {business.address.postalCode} {business.address.city}-
                {business.address.district}
              </p>
            </address>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={business.phone.href} className={link}>
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a href={business.email.href} className={link}>
                  {business.email.address}
                </a>
              </li>
              <li className="pt-3">
                <a
                  href={business.links.mapsRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-chalk underline underline-offset-4"
                >
                  Route planen
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={heading}>Öffnungszeiten</h2>
            <div className="mt-2 text-[0.9375rem]">
              <HoursTable tone="dark" />
            </div>
            <OpenStatus tone="dark" className="mt-4 text-[0.9375rem]" />
          </div>

          <nav aria-label="Seiten">
            <h2 className={heading}>Seiten</h2>
            <ul className="mt-4 space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-night-line py-6 text-[0.9375rem] text-chalk-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {business.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a
                href={business.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={business.links.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                Google-Profil
              </a>
            </li>
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
