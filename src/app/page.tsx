import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Awning } from "@/components/brand/Awning";
import { StationSign } from "@/components/brand/StationSign";
import { DepartureBoard } from "@/components/DepartureBoard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { GoogleCta } from "@/components/sections/GoogleCta";
import { MenuList } from "@/components/sections/MenuList";
import { PressQuote } from "@/components/sections/PressQuote";
import { Visit } from "@/components/sections/Visit";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Plate } from "@/components/ui/Plate";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/content/business";
import { faq } from "@/content/faq";
import { highlights } from "@/content/menu";

const tracks = [
  {
    number: 1,
    label: "Küche",
    title: "Vom Drehspieß und aus dem Ofen",
    text: "Gyros in allen Varianten, Schnitzel, Currywurst und frisch gebackene Pizza. Tzatziki und Krautsalat machen wir selbst.",
    href: "/speisekarte",
    cta: "Zur Speisekarte",
  },
  {
    number: 2,
    label: "Theke",
    title: "Frisch gezapft, laut gejubelt",
    text: "Kölsch und Pils vom Fass, dazu Dart und Fußball. An Spieltagen trifft sich hier die Nachbarschaft.",
    href: "/fussball-dart",
    cta: "Fußball & Dart",
  },
  {
    number: 3,
    label: "Biergarten",
    title: "Draußen sitzen, mitten in Opladen",
    text: "Bei schönem Wetter öffnet nachmittags der Biergarten. Wenn es kühler wird, rücken wir in den Wintergarten.",
    href: "/biergarten",
    cta: "Zum Biergarten",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Awning />
        <Container className="grid gap-12 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-14">
          <div>
            <div className="enter">
              <Plate label="Am Bahnhof Opladen · ehemals „Zur Schwelle“" />
            </div>
            <h1 className="enter display-1 mt-6 [--i:1]">
              Gyros, Kölsch und Bahnstadt-Geschichten
            </h1>
            <p className="enter lead mt-6 max-w-xl text-ink-soft [--i:2]">
              Griechischer Grill, Kneipe und Biergarten unter der blau-weißen
              Markise an der Lützenkirchener Straße. Für die schnelle
              Mittagspause, den Feierabend an der Theke und den Spieltag mit
              Freunden.
            </p>
            <div className="enter mt-8 flex flex-wrap gap-3 [--i:3]">
              <ButtonLink
                href={business.phone.href}
                icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
              >
                {business.phone.display} anrufen
              </ButtonLink>
              <ButtonLink href="/speisekarte" variant="outline">
                Speisekarte ansehen
              </ButtonLink>
            </div>
            <p className="enter mt-6 text-[0.9375rem] text-ink-muted [--i:4]">
              {business.hoursSummary} · {business.address.street}
            </p>
          </div>

          <DepartureBoard className="enter [--i:3]" />
        </Container>
        <div className="track" aria-hidden="true" />
      </section>

      {/* Drei Gleise */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading title="Drei Gleise, ein Haus">
            <p>
              Imbiss, Eckkneipe oder Gartenlokal? Bei uns müssen Sie sich nicht
              entscheiden. Essen Sie an der Theke, trinken Sie im Garten – oder
              nehmen Sie Ihr Gyros einfach mit.
            </p>
          </SectionHeading>

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {tracks.map((track) => (
              <li key={track.label} className="reveal">
                <Link
                  href={track.href}
                  className="group flex h-full flex-col rounded-panel border border-line bg-paper-raised p-6 transition-[border-color,background-color] duration-150 hover:border-blue hover:bg-stripe sm:p-8"
                >
                  <Plate number={track.number} label={track.label} />
                  <h3 className="display-3 mt-8">{track.title}</h3>
                  <p className="mt-4 text-ink-soft">{track.text}</p>
                  <span className="mt-auto flex items-center gap-2 pt-8 font-semibold text-blue">
                    {track.cta}
                    <ArrowRight
                      className="size-5 transition-transform duration-150 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PressQuote />

      {/* Speisekarte */}
      <section className="bg-paper-raised py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading plate="Küche" plateNumber={1} title="Was heute auf den Teller kommt">
              <p>
                Das Gyros ist außen knusprig und innen saftig, der Tzatziki
                hausgemacht. Wer es anders mag, bekommt Pizza, Schnitzel, Pasta
                oder eine fleischlose Teigtasche.
              </p>
            </SectionHeading>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/speisekarte">Ganze Speisekarte</ButtonLink>
              <ButtonLink
                href={business.phone.href}
                variant="outline"
                icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
              >
                Vorbestellen
              </ButtonLink>
            </div>
          </div>
          <div className="reveal border-t border-line">
            <MenuList items={highlights} columns={1} />
          </div>
        </Container>
      </section>

      {/* Fußball & Dart */}
      <section className="on-dark bg-night py-20 text-chalk lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeading plate="Theke" plateNumber={2} title="Wenn Bayer 04 spielt, wird es voll" tone="dark">
            <p>
              An Spieltagen läuft bei uns Fußball. Man kennt sich, man fiebert
              zusammen, und das nächste Kölsch ist nie weit. Zwischen den
              Spielen fliegen die Dartpfeile.
            </p>
          </SectionHeading>
          <div className="reveal">
            <p className="max-w-md text-chalk-soft">
              Sie kommen mit einer größeren Runde? Melden Sie sich vorher kurz,
              dann schauen wir, was wir für Sie freihalten können.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/fussball-dart" variant="chalk">
                Fußball & Dart
              </ButtonLink>
              <ButtonLink href="/kontakt#anfrage" variant="outline-chalk">
                Plätze anfragen
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Geschichte */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading plate="Geschichte" title="Früher Schwelle, heute Bahnstadtgrill">
              <p>
                Als das Bahnwerk in Opladen noch in Betrieb war, hieß unsere
                Gaststätte „Zur Schwelle“. Das Werk ist Geschichte, auf dem
                Gelände wächst die Neue Bahnstadt – der Biergarten ist
                geblieben.
              </p>
            </SectionHeading>
            <p className="mt-6 max-w-2xl text-ink-soft">
              Der Patron begrüßt Sie mit einem „Kali mera, alles klar?!“ und
              erzählt, wenn Zeit ist, gern die eine oder andere
              Bahnstadt-Geschichte.
            </p>
            <Link
              href="/ueber-uns"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-blue"
            >
              Die ganze Geschichte
              <ArrowRight
                className="size-5 transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="reveal mx-auto w-full max-w-md" aria-hidden="true">
            <StationSign title="Zur Schwelle" caption="damals" faded className="mx-8 -rotate-2" />
            <StationSign title="Bahnstadtgrill" caption="Opladen" className="-mt-3 rotate-1" />
          </div>
        </Container>
      </section>

      <Visit />

      {/* Bewertungen & FAQ */}
      <section className="py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading title="Gut zu wissen" />
            <div className="reveal mt-10">
              <GoogleCta />
            </div>
          </div>
          <div className="reveal lg:pt-4">
            <Faq items={faq.slice(0, 5)} />
            <Link
              href="/kontakt#fragen"
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-blue"
            >
              Alle Fragen und Antworten
              <ArrowRight
                className="size-5 transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand secondary={{ href: "/kontakt#anfrage", label: "Tisch anfragen" }} />
    </>
  );
}
