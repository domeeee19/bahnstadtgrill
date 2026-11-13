import { Car, Mail, Navigation, Phone, TrainFront } from "lucide-react";
import { HoursTable } from "@/components/HoursTable";
import { MapConsent } from "@/components/MapConsent";
import { OpenStatus } from "@/components/OpenStatus";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/content/business";

/** Anfahrt, Öffnungszeiten und Karte – auf Startseite und Kontaktseite. */
export function Visit({
  title = "So finden Sie uns",
  headingLevel = "h2",
}: {
  title?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <section id="anfahrt" className="bg-paper-sunk py-20 lg:py-28">
      <Container>
        <SectionHeading plate="Anfahrt & Öffnungszeiten" title={title} as={headingLevel}>
          <p>
            Am östlichen Ende der Bahnhofsbrücke, direkt am Bahnhof Opladen und
            an der Neuen Bahnstadt. Achten Sie auf die blau-weiße Markise.
          </p>
        </SectionHeading>

        <div className="reveal mt-12 grid overflow-hidden rounded-panel border border-line bg-paper-raised lg:grid-cols-[1fr_1.15fr]">
          <div className="p-6 sm:p-10">
            <OpenStatus className="text-lg" />
            <div className="mt-6">
              <HoursTable />
            </div>
            <p className="mt-4 text-[0.9375rem] text-ink-muted">{business.beerGardenNote}.</p>

            <address className="mt-8 border-t border-line pt-8 not-italic">
              <p className="font-display text-2xl font-semibold uppercase leading-tight">
                {business.address.street}
              </p>
              <p className="text-ink-soft">
                {business.address.postalCode} {business.address.city}-{business.address.district}
              </p>
              <ul className="mt-5 space-y-2.5">
                <li>
                  <a href={business.phone.href} className="inline-flex items-center gap-3 font-semibold hover:text-blue">
                    <Phone className="size-5 text-blue" aria-hidden="true" />
                    {business.phone.display}
                  </a>
                </li>
                <li>
                  <a href={business.email.href} className="inline-flex items-center gap-3 break-all font-semibold hover:text-blue">
                    <Mail className="size-5 shrink-0 text-blue" aria-hidden="true" />
                    {business.email.address}
                  </a>
                </li>
              </ul>
            </address>

            <ul className="mt-8 space-y-3 text-ink-soft">
              <li className="flex gap-3">
                <TrainFront className="mt-0.5 size-5 shrink-0 text-ink-muted" aria-hidden="true" />
                <span>Vom Bahnhof Opladen zu Fuß über die Bahnhofsbrücke.</span>
              </li>
              <li className="flex gap-3">
                <Car className="mt-0.5 size-5 shrink-0 text-ink-muted" aria-hidden="true" />
                <span>Parkmöglichkeiten direkt vor Ort.</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={business.links.mapsRoute}
                icon={<Navigation className="size-[1.125rem]" aria-hidden="true" />}
              >
                Route planen
              </ButtonLink>
              <ButtonLink
                href={business.phone.href}
                variant="outline"
                icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
              >
                Anrufen
              </ButtonLink>
            </div>
          </div>

          <div className="min-h-80 border-t border-line lg:border-l lg:border-t-0">
            <MapConsent />
          </div>
        </div>
      </Container>
    </section>
  );
}
