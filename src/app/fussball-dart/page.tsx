import { Beer, Phone, Target, Tv, Users, Utensils, TrainFront } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { FactList } from "@/components/sections/FactList";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

const path = "/fussball-dart";

export const metadata = pageMetadata({
  title: "Fußball schauen & Dart in Opladen",
  description:
    "Fußballkneipe am Bahnhof Opladen: An Spieltagen gemeinsam mitfiebern, wenn Bayer 04 spielt. Dazu Kölsch und Pils vom Fass, Dart und Gyros vom Grill.",
  path,
});

const iconClass = "size-7";

const facts = [
  {
    icon: <Tv className={iconClass} aria-hidden="true" />,
    title: "Spieltag an der Theke",
    text: "An Spieltagen läuft bei uns Fußball. Welche Partien wir zeigen, erfahren Sie am Telefon.",
  },
  {
    icon: <Beer className={iconClass} aria-hidden="true" />,
    title: "Kölsch und Pils vom Fass",
    text: "Frisch gezapft, dazu Flaschenbiere, Kurze, Longdrinks und alles ohne Alkohol.",
  },
  {
    icon: <Utensils className={iconClass} aria-hidden="true" />,
    title: "Essen zum Spiel",
    text: "Die Küche läuft mit: Gyros, Schnitzel, Pizza oder eine Currywurst kommen direkt an Ihren Platz.",
  },
  {
    icon: <Target className={iconClass} aria-hidden="true" />,
    title: "Dart",
    text: "Zwischen den Spielen – oder statt Fußball – fliegen bei uns die Pfeile. Eine Runde geht immer.",
  },
  {
    icon: <Users className={iconClass} aria-hidden="true" />,
    title: "Mit der ganzen Truppe",
    text: "Fanclub, Kollegen, Stammtisch: Melden Sie größere Runden bitte vorher an, dann planen wir Sie ein.",
  },
  {
    icon: <TrainFront className={iconClass} aria-hidden="true" />,
    title: "Direkt am Bahnhof",
    text: "Vom Bahnhof Opladen über die Bahnhofsbrücke – das Auto kann am Spieltag stehen bleiben.",
  },
];

export default function FootballPage() {
  return (
    <>
      <PageHero
        path={path}
        breadcrumb="Fußball & Dart"
        plate="Theke"
        plateNumber={2}
        title="Fußball schauen & Dart spielen"
        actions={
          <>
            <ButtonLink href="/kontakt#anfrage">Plätze anfragen</ButtonLink>
            <ButtonLink
              href={business.phone.href}
              variant="outline"
              icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
            >
              {business.phone.display}
            </ButtonLink>
          </>
        }
      >
        <p>
          Kneipe, wie sie in Opladen sein soll: An der Theke kennt man sich, am
          Spieltag fiebert man zusammen. Und wenn Bayer 04 spielt, rückt man
          eben ein Stück enger zusammen.
        </p>
      </PageHero>

      <section className="on-dark bg-night py-20 text-chalk lg:py-28">
        <Container>
          <SectionHeading title="Mitfiebern statt allein gucken" tone="dark">
            <p>
              Zu Hause läuft das Spiel auch. Aber dort jubelt niemand mit,
              niemand zapft nach, und Gyros gibt es in der Halbzeit auch nicht.
            </p>
          </SectionHeading>
          <div className="mt-14">
            <FactList facts={facts} tone="dark" />
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <SectionHeading title="Kneipe und Küche unter einem Dach">
            <p>
              In der Eckkneipe gibt es meist nur Erdnüsse, am Imbiss selten
              einen Platz zum Bleiben. Bei uns bekommen Sie beides: ein
              frisches Bier und eine warme Küche bis zum Abend.
            </p>
          </SectionHeading>
          <div className="reveal rounded-panel border border-line bg-paper-raised p-6 sm:p-8">
            <h3 className="display-3">Geöffnet</h3>
            <p className="mt-3 text-ink-soft">{business.hoursSummary}.</p>
            <p className="mt-3 text-ink-soft">
              Fällt ein Spiel außerhalb dieser Zeiten, fragen Sie bitte
              telefonisch nach.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/speisekarte" variant="outline">
                Speisekarte
              </ButtonLink>
              <ButtonLink href="/kontakt#anfahrt" variant="outline">
                Anfahrt
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Plätze für den Spieltag sichern"
        secondary={{ href: "/kontakt#anfrage", label: "Anfrage senden" }}
      >
        <p>
          Sagen Sie uns, zu welchem Spiel und mit wie vielen Leuten Sie kommen
          möchten. Wir melden uns bei Ihnen zurück.
        </p>
      </CtaBand>
    </>
  );
}
