import { ArrowUpRight, Star } from "lucide-react";
import { business } from "@/content/business";

/**
 * Verweis auf das Google-Unternehmensprofil.
 * Bewertungszahlen erscheinen nur, wenn sie in business.ts gepflegt sind –
 * es werden keine Rezensionen nachgebaut oder erfunden.
 */
export function GoogleCta() {
  const { value, count, asOf } = business.googleRating;
  const hasRating = value !== null && count !== null;
  const reviewHref = business.links.googleReview ?? business.links.googleProfile;

  return (
    <div className="rounded-panel border border-line bg-paper-raised p-6 sm:p-10">
      <h3 className="display-3">Ihre Meinung auf Google</h3>
      {hasRating ? (
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg">
          <Star className="size-5 fill-amber text-amber" aria-hidden="true" />
          <span className="font-semibold">
            {value.toLocaleString("de-DE", { minimumFractionDigits: 1 })} von 5 Sternen
          </span>
          <span className="text-ink-muted">
            aus {count.toLocaleString("de-DE")} Google-Rezensionen
            {asOf ? ` (Stand ${asOf})` : ""}
          </span>
        </p>
      ) : null}
      <p className="mt-4 max-w-xl text-ink-soft">
        Was Gäste über uns sagen, lesen Sie ungefiltert in unserem
        Google-Profil. Waren Sie schon da? Dann freuen wir uns über ein paar
        ehrliche Zeilen von Ihnen.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-semibold">
        <li>
          <a
            href={business.links.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex items-center gap-1.5"
          >
            Bewertungen auf Google lesen
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href={reviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex items-center gap-1.5"
          >
            Bewertung schreiben
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href={business.links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link inline-flex items-center gap-1.5"
          >
            Bahnstadtgrill auf Facebook
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  );
}
