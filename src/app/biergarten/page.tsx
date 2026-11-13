import { Beer, Phone, Sun, Umbrella, Users, Utensils, Car } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { FactList } from "@/components/sections/FactList";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

const path = "/biergarten";

export const metadata = pageMetadata({
  title: "Biergarten & Wintergarten in Opladen",
  description:
    "Biergarten am Bahnhof Opladen: bei schönem Wetter ab nachmittags geöffnet, mit Gyros, Pizza und frisch gezapftem Bier. Bei Regen sitzen Sie im Wintergarten.",
  path,
});

const iconClass = "size-7";

const facts = [
  {
    icon: <Sun className={iconClass} aria-hidden="true" />,
    title: "Bei Sonne draußen",
    text: "Der Biergarten öffnet bei schönem Wetter ab nachmittags, innerhalb unserer Öffnungszeiten von Montag bis Samstag.",
  },
  {
    icon: <Umbrella className={iconClass} aria-hidden="true" />,
    title: "Bei Regen im Wintergarten",
    text: "Zieht es zu, ziehen Sie einfach um: Im Wintergarten und im Gastraum sitzen Sie trocken und warm.",
  },
  {
    icon: <Utensils className={iconClass} aria-hidden="true" />,
    title: "Die ganze Karte",
    text: "Gyros, Grillplatten, Pizza und Salate servieren wir drinnen wie draußen. Sie müssen sich nicht zwischen Garten und Küche entscheiden.",
  },
  {
    icon: <Beer className={iconClass} aria-hidden="true" />,
    title: "Frisch vom Fass",
    text: "Kölsch und Pils kommen gezapft an den Tisch. Dazu gibt es Wein, Schorlen, Softdrinks, Kaffee und Espresso.",
  },
  {
    icon: <Users className={iconClass} aria-hidden="true" />,
    title: "Für die ganze Familie",
    text: "Vom Feierabendbier bis zum Abendessen mit Kindern: Für die Kleinen stehen eigene Gerichte auf der Karte.",
  },
  {
    icon: <Car className={iconClass} aria-hidden="true" />,
    title: "Gut zu erreichen",
    text: "Direkt am Bahnhof Opladen und an der Neuen Bahnstadt, mit Parkmöglichkeiten vor Ort.",
  },
];

export default function BeerGardenPage() {
  return (
    <>
      <PageHero
        path={path}
        breadcrumb="Biergarten"
        plate="Biergarten"
        plateNumber={3}
        title="Biergarten & Wintergarten"
        actions={
          <>
            <ButtonLink href="/kontakt#anfrage">Plätze anfragen</ButtonLink>
            <ButtonLink
              href={business.phone.href}
              variant="outline"
              icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
            >
              Ist heute offen? Anrufen
            </ButtonLink>
          </>
        }
      >
        <p>
          Ein Garten mitten in Opladen, ein kühles Kölsch und ein Teller Gyros:
          Bei schönem Wetter öffnen wir nachmittags den Biergarten. Er erinnert
          an die Zeit, als nebenan noch das Bahnwerk lief.
        </p>
      </PageHero>

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading title="Ein Platz für jedes Wetter">
            <p>
              Ob Sie nach der Arbeit auf ein Bier bleiben, mit der Familie zu
              Abend essen oder sich mit Freunden treffen – der Garten gehört
              bei uns einfach dazu.
            </p>
          </SectionHeading>
          <div className="mt-14">
            <FactList facts={facts} />
          </div>
        </Container>
      </section>

      <section className="on-dark bg-night py-20 text-chalk lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <blockquote className="reveal font-serif text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-[420] leading-[1.15] tracking-[-0.01em]">
            <p>
              „Befragen Sie den Patron des Bahnstadt-Grills, der dann wohl auch
              im Garten sitzt. Er erzählt gerne die eine oder andere
              Bahnstadt-Geschichte.“
            </p>
          </blockquote>
          <div className="reveal">
            <p className="text-chalk-soft">
              So steht es im Gastrotipp von „Lust auf Leverkusen“, dem
              Gastro-Guide des Stadtmarketings. Wir können das bestätigen:
              Wer fragt, bekommt eine Antwort – und meistens noch eine
              Anekdote dazu.
            </p>
            <div className="mt-8">
              <ButtonLink href="/ueber-uns" variant="outline-chalk">
                Unsere Geschichte
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Mit mehreren Leuten in den Garten?"
        secondary={{ href: "/kontakt#anfrage", label: "Anfrage senden" }}
      >
        <p>
          Für Geburtstage, Stammtische und größere Runden melden Sie sich bitte
          vorher. Wir sagen Ihnen, was möglich ist.
        </p>
      </CtaBand>
    </>
  );
}
