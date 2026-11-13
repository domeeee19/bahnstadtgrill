import { Mail, Phone } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { Faq } from "@/components/sections/Faq";
import { GoogleCta } from "@/components/sections/GoogleCta";
import { PageHero } from "@/components/sections/PageHero";
import { Visit } from "@/components/sections/Visit";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/content/business";
import { faq } from "@/content/faq";
import { faqSchema, pageMetadata } from "@/lib/seo";

const path = "/kontakt";

export const metadata = pageMetadata({
  title: "Kontakt, Anfahrt & Öffnungszeiten",
  description:
    "Bahnstadtgrill Opladen, Lützenkirchener Straße 12, 51379 Leverkusen. Mo–Sa 11:30–21:00 Uhr. Telefon 02171 80154. Tisch oder Plätze für Gruppen online anfragen.",
  path,
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        path={path}
        breadcrumb="Kontakt & Anfahrt"
        plate="Kontakt"
        title="Kontakt & Anfahrt"
        actions={
          <>
            <ButtonLink
              href={business.phone.href}
              icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
            >
              {business.phone.display}
            </ButtonLink>
            <ButtonLink href="#anfrage" variant="outline">
              Tisch anfragen
            </ButtonLink>
          </>
        }
      >
        <p>
          Am schnellsten erreichen Sie uns telefonisch – für Vorbestellungen,
          Fragen zur Karte oder einen Platz am Spieltag. Für alles, was Zeit
          hat, gibt es das Anfrageformular.
        </p>
      </PageHero>

      <Visit title="Hier finden Sie uns" />

      <section id="anfrage" className="scroll-mt-24 py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading title="Tisch oder Plätze anfragen">
              <p>
                Für den normalen Besuch brauchen Sie keine Reservierung. Bei
                größeren Runden, Feiern und Fußballabenden planen wir gern mit
                Ihnen.
              </p>
            </SectionHeading>
            <ul className="mt-8 space-y-4 text-ink-soft">
              <li className="flex gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-blue" aria-hidden="true" />
                <span>
                  Eilig oder für heute?{" "}
                  <a href={business.phone.href} className="text-link">
                    {business.phone.display}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-blue" aria-hidden="true" />
                <span>
                  Lieber per E-Mail?{" "}
                  <a href={business.email.href} className="text-link break-all">
                    {business.email.address}
                  </a>
                </span>
              </li>
            </ul>
            <p className="mt-8 max-w-md text-[0.9375rem] text-ink-muted">
              Eine Anfrage ist noch keine feste Reservierung. Ihr Platz ist
              bestätigt, sobald wir uns bei Ihnen gemeldet haben.
            </p>
          </div>
          <InquiryForm />
        </Container>
      </section>

      <section className="bg-paper-raised py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading title="Aus Opladen und der ganzen Region">
            <p>
              Unsere Gäste kommen aus der Nachbarschaft und von weiter her:
              aus {business.serviceArea.slice(1, -1).join(", ")} und{" "}
              {business.serviceArea.at(-1)}. Mit der Bahn sind Sie schnell am
              Bahnhof Opladen, von dort geht es zu Fuß über die Bahnhofsbrücke.
            </p>
          </SectionHeading>
          <div className="reveal lg:pt-2">
            <GoogleCta />
          </div>
        </Container>
      </section>

      <section id="fragen" className="scroll-mt-24 py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading title="Häufige Fragen" />
          <Faq items={faq} />
        </Container>
        <JsonLd data={faqSchema(faq)} />
      </section>
    </>
  );
}
