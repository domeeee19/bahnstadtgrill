import { Info, Leaf, Phone } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { MenuList } from "@/components/sections/MenuList";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/content/business";
import { menuGroups } from "@/content/menu";
import { menuSchema, pageMetadata } from "@/lib/seo";

const path = "/speisekarte";

export const metadata = pageMetadata({
  title: "Speisekarte: Gyros, Pizza & Schnitzel",
  description:
    "Die Speisekarte des Bahnstadtgrill Opladen: Gyros Pita, Gyros-Teller, überbackenes Gyros, Pizza, Schnitzel, Currywurst, vegetarische Gerichte und Bier vom Fass.",
  path,
});

export default function MenuPage() {
  return (
    <>
      <PageHero
        path={path}
        breadcrumb="Speisekarte"
        plate="Küche"
        plateNumber={1}
        title="Speisekarte"
        actions={
          <>
            <ButtonLink
              href={business.phone.href}
              icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
            >
              Telefonisch vorbestellen
            </ButtonLink>
            <ButtonLink href="/kontakt#anfahrt" variant="outline">
              Anfahrt & Öffnungszeiten
            </ButtonLink>
          </>
        }
      >
        <p>
          Bei uns dreht sich vieles um den Spieß: Gyros im Pita-Brot, auf dem
          Teller oder überbacken. Dazu Pizza, Schnitzel und Imbiss-Klassiker –
          im Gastraum, im Biergarten oder zum Mitnehmen.
        </p>
      </PageHero>

      <nav
        aria-label="Kategorien der Speisekarte"
        className="sticky top-16 z-20 border-b border-line bg-paper lg:top-[4.5rem]"
      >
        <Container>
          <ul className="-mx-5 flex gap-1 overflow-x-auto px-5 py-2.5 sm:mx-0 sm:px-0">
            {menuGroups.flatMap((group) =>
              group.categories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.id}`}
                    className="block rounded-control px-3 py-2 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-150 hover:bg-paper-sunk hover:text-ink"
                  >
                    {category.title}
                  </a>
                </li>
              )),
            )}
          </ul>
        </Container>
      </nav>

      {menuGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          aria-labelledby={group.id}
          className={`py-16 lg:py-24 ${groupIndex % 2 === 1 ? "bg-paper-raised" : ""}`}
        >
          <Container>
            <h2 id={group.id} className="display-2">
              {group.title}
            </h2>

            <div className="mt-4">
              {group.categories.map((category) => (
                <div
                  key={category.id}
                  id={category.id}
                  className="grid scroll-mt-36 gap-x-16 gap-y-6 border-t border-ink pt-8 mt-12 lg:grid-cols-[0.42fr_1fr]"
                >
                  <div>
                    <h3 className="display-3">{category.title}</h3>
                    {category.intro && (
                      <p className="mt-3 max-w-sm text-ink-soft">{category.intro}</p>
                    )}
                  </div>
                  <MenuList items={category.items} />
                </div>
              ))}
            </div>

            {groupIndex === 0 && (
              <div className="mt-16 grid gap-4 rounded-panel border border-line bg-paper-raised p-6 sm:grid-cols-2 sm:p-8">
                <p className="flex gap-3 text-ink-soft">
                  <Info className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden="true" />
                  <span>
                    Aktuelle Preise und Tagesangebote erfahren Sie bei uns vor
                    Ort oder am Telefon unter{" "}
                    <a href={business.phone.href} className="text-link">
                      {business.phone.display}
                    </a>
                    . Fragen zu Allergenen und Zusatzstoffen beantwortet Ihnen
                    unser Team gern.
                  </span>
                </p>
                <p className="flex gap-3 text-ink-soft">
                  <Leaf className="mt-0.5 size-5 shrink-0 text-open" aria-hidden="true" />
                  <span>
                    Das Blatt kennzeichnet vegetarische Gerichte. Sie essen
                    vegan? Sprechen Sie uns an, wir sagen Ihnen, was passt.
                  </span>
                </p>
              </div>
            )}
          </Container>
        </section>
      ))}

      <JsonLd data={menuSchema(menuGroups)} />
      <CtaBand
        title="Bestellen und abholen"
        secondary={{ href: "/kontakt#anfahrt", label: "Anfahrt" }}
      >
        <p>
          Rufen Sie an, sagen Sie uns, wann Sie kommen – dann ist Ihr Essen
          fertig, wenn Sie da sind. {business.hoursSummary}.
        </p>
      </CtaBand>
    </>
  );
}
