import type { Metadata } from "next";
import { AwningStripe } from "@/components/brand/Awning";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Plate } from "@/components/ui/Plate";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <AwningStripe />
      <Container className="py-24 lg:py-36">
        <Plate label="Fehler 404 · Zug fällt aus" />
        <h1 className="display-1 mt-6 max-w-4xl">Hier hält leider nichts</h1>
        <p className="lead mt-6 max-w-xl text-ink-soft">
          Die Seite, die Sie suchen, gibt es nicht oder nicht mehr. Die
          Speisekarte und der Weg zu uns sind aber nur einen Klick entfernt.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Zur Startseite</ButtonLink>
          <ButtonLink href="/speisekarte" variant="outline">
            Speisekarte
          </ButtonLink>
          <ButtonLink href="/kontakt" variant="outline">
            Kontakt & Anfahrt
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
