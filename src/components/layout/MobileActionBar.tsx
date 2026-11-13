import Link from "next/link";
import { Navigation, Phone, Utensils } from "lucide-react";
import { business } from "@/content/business";

/** Feste Aktionsleiste auf dem Smartphone: die drei häufigsten Wege zum Gast. */
export function MobileActionBar() {
  const item =
    "flex min-h-14 flex-col items-center justify-center gap-1 text-[0.8125rem] font-semibold leading-none transition-colors duration-150";

  return (
    <nav
      aria-label="Schnellzugriff"
      className="on-dark fixed inset-x-0 bottom-0 z-30 border-t border-night-line bg-night pb-[env(safe-area-inset-bottom)] text-chalk md:hidden"
    >
      <ul className="grid grid-cols-3">
        <li>
          <a href={business.phone.href} className={`${item} bg-blue text-stripe`}>
            <Phone className="size-5" aria-hidden="true" />
            Anrufen
          </a>
        </li>
        <li className="border-r border-night-line">
          <a
            href={business.links.mapsRoute}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} hover:bg-night-raised`}
          >
            <Navigation className="size-5" aria-hidden="true" />
            Route
          </a>
        </li>
        <li>
          <Link href="/speisekarte" className={`${item} hover:bg-night-raised`}>
            <Utensils className="size-5" aria-hidden="true" />
            Speisekarte
          </Link>
        </li>
      </ul>
    </nav>
  );
}
