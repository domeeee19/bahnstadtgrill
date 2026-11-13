import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { Placeholder } from "@/components/ui/Placeholder";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

const path = "/impressum";

export const metadata = {
  ...pageMetadata({
    title: "Impressum",
    description: `Impressum und Anbieterkennzeichnung von ${business.name}.`,
    path,
  }),
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  const { legal } = business;

  return (
    <LegalPage path={path} title="Impressum">
      <LegalSection title="Angaben gemäß § 5 DDG">
        <p>
          {business.name}
          <br />
          {legal.ownerName ? (
            <>Inhaber: {legal.ownerName}</>
          ) : (
            <Placeholder>Vor- und Nachname des Inhabers bzw. vollständige Firma mit Rechtsform und Vertretungsberechtigten</Placeholder>
          )}
          <br />
          {business.address.street}
          <br />
          {business.address.postalCode} {business.address.city}-{business.address.district}
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          Telefon: <a href={business.phone.href}>{business.phone.display}</a>
          <br />
          E-Mail: <a href={business.email.href}>{business.email.address}</a>
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-Identifikationsnummer">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:{" "}
          {legal.vatId ?? (
            <Placeholder>USt-IdNr., falls vorhanden – sonst diesen Abschnitt entfernen</Placeholder>
          )}
        </p>
      </LegalSection>

      <LegalSection title="Redaktionell verantwortlich">
        <p>
          {legal.ownerName ?? <Placeholder>Name der verantwortlichen Person</Placeholder>}
          <br />
          Anschrift wie oben
        </p>
      </LegalSection>

      <LegalSection title="Verbraucherstreitbeilegung">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>

      <LegalSection title="Bild- und Quellennachweise">
        <p>
          Gestaltung, Grafiken und Texte: {business.name}. Zitate aus dem
          Gastrotipp „Lust auf Leverkusen“ (Stadt Leverkusen, Kultur und
          Stadtmarketing) sind als solche gekennzeichnet und verlinkt.
        </p>
        <p>
          Schriften: Barlow und Barlow Condensed (Jeremy Tribby) sowie Fraunces
          (Undercase Type), jeweils unter der SIL Open Font License 1.1, lokal
          eingebunden.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
