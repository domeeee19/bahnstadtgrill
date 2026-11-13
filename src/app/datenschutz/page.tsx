import { LegalPage, LegalSection } from "@/components/sections/LegalPage";
import { Placeholder } from "@/components/ui/Placeholder";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

const path = "/datenschutz";

export const metadata = {
  ...pageMetadata({
    title: "Datenschutzerklärung",
    description: `Datenschutzerklärung von ${business.name}: Welche Daten diese Website verarbeitet und welche Rechte Sie haben.`,
    path,
  }),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  const { legal } = business;

  return (
    <LegalPage
      path={path}
      title="Datenschutz"
      intro="Diese Website kommt ohne Cookies, ohne Tracking und ohne Werbenetzwerke aus. Hier steht, welche Daten trotzdem anfallen und wofür wir sie verwenden."
    >
      <LegalSection title="Verantwortlicher">
        <p>
          {business.name}
          <br />
          {legal.ownerName ?? <Placeholder>Name des Inhabers / der verantwortlichen Stelle</Placeholder>}
          <br />
          {business.address.street}, {business.address.postalCode} {business.address.city}-
          {business.address.district}
          <br />
          Telefon: <a href={business.phone.href}>{business.phone.display}</a>
          <br />
          E-Mail: <a href={business.email.href}>{business.email.address}</a>
        </p>
      </LegalSection>

      <LegalSection id="hosting" title="Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei folgendem Anbieter gehostet:{" "}
          {legal.hostingProvider ?? (
            <Placeholder>Name und Anschrift des Hosting-Anbieters; Hinweis auf Auftragsverarbeitungsvertrag und ggf. Drittlandübermittlung</Placeholder>
          )}
          .
        </p>
        <p>
          Beim Aufruf der Seiten verarbeitet der Anbieter technisch notwendige
          Daten: IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene Seite,
          übertragene Datenmenge sowie Browsertyp und Betriebssystem. Diese
          Daten sind nötig, um die Website auszuliefern und ihre Sicherheit zu
          gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an einem sicheren und stabilen Betrieb).
        </p>
      </LegalSection>

      <LegalSection title="Cookies und Tracking">
        <p>
          Wir setzen keine Cookies und verwenden keine Analyse- oder
          Marketing-Werkzeuge. Deshalb sehen Sie auf dieser Website auch kein
          Cookie-Banner.
        </p>
        <p>
          Die Schriftarten dieser Website liegen auf unserem eigenen Server.
          Es besteht dafür keine Verbindung zu Google Fonts oder anderen
          Diensten.
        </p>
      </LegalSection>

      <LegalSection id="anfrageformular" title="Anfrageformular">
        <p>
          Wenn Sie uns über das Formular eine Anfrage senden, verarbeiten wir
          die von Ihnen eingegebenen Angaben: Name, Telefonnummer, auf Wunsch
          E-Mail-Adresse, Anliegen, Datum, Uhrzeit, Personenzahl und Ihre
          Nachricht. Wir verwenden diese Daten ausschließlich, um Ihre Anfrage
          zu beantworten und Ihren Besuch zu planen.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Maßnahmen auf Ihre Anfrage hin). Die Anfrage wird uns per E-Mail
          zugestellt und gelöscht, sobald sie erledigt ist und keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
        <p>
          Zum Schutz vor Missbrauch wird Ihre IP-Adresse beim Absenden für
          wenige Minuten im Arbeitsspeicher des Servers zwischengespeichert
          (Art. 6 Abs. 1 lit. f DSGVO). Sie wird nicht dauerhaft gespeichert
          und nicht mit Ihrer Anfrage verknüpft.
        </p>
      </LegalSection>

      <LegalSection title="Kontakt per Telefon oder E-Mail">
        <p>
          Wenn Sie uns anrufen oder eine E-Mail schreiben, verarbeiten wir Ihre
          Angaben, um Ihr Anliegen zu bearbeiten (Art. 6 Abs. 1 lit. b bzw.
          lit. f DSGVO). Unser E-Mail-Postfach wird von Google (Gmail)
          bereitgestellt; dabei können Daten auch auf Servern außerhalb der
          Europäischen Union verarbeitet werden.
        </p>
      </LegalSection>

      <LegalSection id="google-maps" title="Google Maps">
        <p>
          Auf der Startseite und der Kontaktseite können Sie eine Karte von
          Google Maps einblenden. Die Karte wird erst geladen, wenn Sie auf
          „Karte laden“ klicken. Vorher werden keine Daten an Google
          übertragen.
        </p>
        <p>
          Nach dem Klick stellt Ihr Browser eine Verbindung zu Servern der
          Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
          Irland, her. Google erfährt dabei unter anderem Ihre IP-Adresse und
          kann Cookies setzen; eine Übermittlung in die USA ist möglich.
          Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1
          lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie gilt nur für den jeweiligen
          Seitenaufruf. Weitere Informationen finden Sie in der{" "}
          <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Links zu Google, Facebook und anderen Seiten">
        <p>
          Unser Google-Profil, die Routenplanung, unsere Facebook-Seite und
          Presseartikel sind als einfache Links eingebunden. Daten werden erst
          übertragen, wenn Sie einen solchen Link anklicken und die Seite des
          jeweiligen Anbieters aufrufen. Dort gelten dessen
          Datenschutzbestimmungen.
        </p>
      </LegalSection>

      <LegalSection title="Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft über die zu Ihrer Person
          gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16), auf
          Löschung (Art. 17), auf Einschränkung der Verarbeitung (Art. 18), auf
          Datenübertragbarkeit (Art. 20) sowie das Recht, einer Verarbeitung zu
          widersprechen (Art. 21). Eine erteilte Einwilligung können Sie
          jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
        <p>
          Dazu genügt eine Nachricht an{" "}
          <a href={business.email.href}>{business.email.address}</a>.
        </p>
        <p>
          Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde
          beschweren. Für uns zuständig ist die Landesbeauftragte für
          Datenschutz und Informationsfreiheit Nordrhein-Westfalen,
          Kavalleriestraße 2–4, 40213 Düsseldorf,{" "}
          <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer">
            www.ldi.nrw.de
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Stand">
        <p>
          <Placeholder>Datum der letzten rechtlichen Prüfung</Placeholder>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
