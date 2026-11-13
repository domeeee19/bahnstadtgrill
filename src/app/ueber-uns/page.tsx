import { ArrowUpRight } from "lucide-react";
import { StationSign } from "@/components/brand/StationSign";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, press } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

const path = "/ueber-uns";

export const metadata = pageMetadata({
  title: "Unsere Geschichte: von „Zur Schwelle“ zum Bahnstadtgrill",
  absoluteTitle: true,
  description:
    "Früher hieß die Gaststätte am Bahnhof Opladen „Zur Schwelle“. Heute ist der Bahnstadtgrill Grieche, Kneipe und Biergarten in einem – die Geschichte dahinter.",
  path,
});

const chapters = [
  {
    station: "Damals",
    title: "Zur Schwelle",
    text: [
      "Opladen war über Generationen eine Eisenbahnerstadt. Gleich nebenan lag das große Bahn-Ausbesserungswerk, und die Gaststätte an der Lützenkirchener Straße trug einen Namen, der dazu passte: „Zur Schwelle“.",
      "Unser Biergarten erinnert bis heute an diese Zeit, als das Werk noch offen war.",
    ],
  },
  {
    station: "Heute",
    title: "Die Neue Bahnstadt",
    text: [
      "Das Werk ist geschlossen, auf dem Gelände ist ein neues Stück Opladen entstanden: die Neue Bahnstadt. Aus der „Schwelle“ wurde der Bahnstadtgrill.",
      "Geblieben ist der Ort: am östlichen Ende der Bahnhofsbrücke, unter der blau-weißen Markise – ein Treffpunkt für Nachbarn, Pendler und alle, die Hunger haben.",
    ],
  },
  {
    station: "Am Tresen",
    title: "Ein Grieche bleibt ein Grieche",
    text: [
      "Hinter dem Tresen entstehen auch deutsche und italienische Gerichte: Schnitzel, Currywurst, Pizza. Am liebsten bestellt wird trotzdem das Gyros, mit hausgemachtem Tzatziki und Krautsalat.",
      "Der Patron hat das Straßengeschehen im Blick und begrüßt seine Gäste mit „Kali mera, alles klar?!“. Wer fragt, bekommt eine Bahnstadt-Geschichte dazu.",
    ],
  },
];

const values = [
  {
    title: "Selbst gemacht",
    text: "Tzatziki, Krautsalat, Metaxasauce und Frikadellen kommen aus der eigenen Küche.",
  },
  {
    title: "Kneipe und Küche",
    text: "Frisch gezapftes Bier und eine vollwertige warme Küche – unter einem Dach, den ganzen Tag.",
  },
  {
    title: "Faire Preise",
    text: "Gutes Essen muss nicht teuer sein. Bei uns wird man satt, ohne lange zu rechnen.",
  },
  {
    title: "Für alle da",
    text: "Familien, Stammgäste, Pendler, Fußballfans: Bei uns sitzt man nebeneinander, nicht nach Tischen sortiert.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero path={path} breadcrumb="Geschichte" plate="Geschichte" title="Früher Schwelle, heute Bahnstadtgrill">
        <p>
          Eine Gaststätte am Bahnhof, ein Werk, das es nicht mehr gibt, und ein
          Grieche, der geblieben ist. So wurde aus der „Schwelle“ der
          Bahnstadtgrill.
        </p>
      </PageHero>

      <section className="py-20 lg:py-28">
        <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="mx-auto w-full max-w-md lg:sticky lg:top-32 lg:self-start" aria-hidden="true">
            <StationSign title="Zur Schwelle" caption="damals" faded className="mx-8 -rotate-2" />
            <StationSign title="Bahnstadtgrill" caption="Opladen" className="-mt-3 rotate-1" />
          </div>

          <ol>
            {chapters.map((chapter, index) => (
              <li
                key={chapter.title}
                className="reveal relative border-l-2 border-ink pb-14 pl-8 last:pb-0 sm:pl-12"
              >
                <span
                  className="absolute -left-[9px] top-1 size-4 rounded-full border-2 border-ink bg-paper"
                  aria-hidden="true"
                />
                <p className="font-display text-lg font-semibold uppercase tracking-[0.04em] text-blue">
                  <span className="sr-only">Station {index + 1}: </span>
                  {chapter.station}
                </p>
                <h2 className="display-2 mt-2">{chapter.title}</h2>
                <div className="prose-site mt-5 max-w-xl text-ink-soft">
                  {chapter.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-paper-raised py-20 lg:py-28">
        <Container>
          <SectionHeading title="Woran wir festhalten" />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <li key={value.title} className="reveal border-t border-ink pt-6">
                <p className="font-display text-lg font-semibold text-blue" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="display-3 mt-3">{value.title}</h3>
                <p className="mt-3 text-ink-soft">{value.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <figure className="reveal">
            <blockquote
              cite={press.url}
              className="font-serif text-[clamp(1.875rem,1.2rem+3vw,3.5rem)] font-[420] leading-[1.1] tracking-[-0.01em]"
            >
              <p>„Das Bahnstadt Grill ist und bleibt ein Grieche.“</p>
            </blockquote>
            <figcaption className="mt-6 text-ink-soft">
              {press.author} im Gastrotipp von „{press.source}“, {press.publisher}
            </figcaption>
          </figure>
          <div className="reveal flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink
              href={press.url}
              variant="outline"
              icon={<ArrowUpRight className="size-[1.125rem]" aria-hidden="true" />}
            >
              Gastrotipp lesen
            </ButtonLink>
            <ButtonLink href="/speisekarte">Zur Speisekarte</ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Kommen Sie vorbei"
        secondary={{ href: "/kontakt#anfahrt", label: "Anfahrt planen" }}
      >
        <p>
          Die besten Geschichten gibt es nicht im Internet, sondern am Tresen.{" "}
          {business.hoursSummary}.
        </p>
      </CtaBand>
    </>
  );
}
