# Bahnstadtgrill Opladen – Website

Website für den **Bahnstadtgrill Opladen** (ehemals „Zur Schwelle“): griechischer Grill, Kneipe und Biergarten am Bahnhof Opladen, Lützenkirchener Straße 12, 51379 Leverkusen.

Konzept, Designsystem, offene Punkte und Go-live-Checkliste stehen in [`docs/UEBERGABE.md`](docs/UEBERGABE.md).

## Technik

| Bereich | Einsatz |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS 4, Design-Tokens in `src/app/globals.css` |
| Icons | lucide-react |
| Formular | React Server Action, Validierung mit zod, Versand mit nodemailer (SMTP) |
| Schriften | Barlow, Barlow Condensed, Fraunces – lokal eingebunden (SIL OFL 1.1) |

Alle Seiten werden statisch vorgerendert. Serverlogik gibt es nur für das Anfrageformular. Die Website setzt keine Cookies und lädt beim Aufruf nichts von Drittanbietern.

## Start

Voraussetzung: Node.js 20.9 oder neuer.

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Die Seite läuft dann unter http://localhost:3000. Ohne SMTP-Zugang werden Anfragen im Entwicklungsmodus nur im Terminal ausgegeben.

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm run start` | Produktions-Build lokal starten |
| `npm run lint` | ESLint |

## Inhalte pflegen

Inhalte und Layout sind getrennt. Fast alles, was sich im Alltag ändert, steht in `src/content/`:

| Datei | Inhalt |
|---|---|
| `business.ts` | Name, Adresse, Telefon, E-Mail, Öffnungszeiten, Google-/Facebook-Links, Google-Bewertung, Angaben fürs Impressum |
| `menu.ts` | Speisen und Getränke. Ein Preis erscheint, sobald `price: "9,50"` eingetragen ist |
| `faq.ts` | Häufige Fragen (Startseite, Kontaktseite, strukturierte Daten) |
| `navigation.ts` | Menüpunkte |

Öffnungszeiten ändern sich an genau einer Stelle (`business.hours`) und wirken dann überall: Abfahrtstafel, Live-Status „Jetzt geöffnet“, Tabellen, Fußzeile und strukturierte Daten. Den Kurztext `hoursSummary` direkt darunter bitte mit anpassen.

## Projektstruktur

```
src/
  app/                  Seiten (eine Mappe pro URL), Layout, globale Styles
    kontakt/actions.ts  Server Action des Anfrageformulars
    fonts/              lokal eingebundene Schriftdateien
    sitemap.ts, robots.ts, manifest.ts, icon.svg, opengraph-image.png
  components/
    brand/              Markise, Logo, Bahnhofsschild
    layout/             Kopfzeile, Fußzeile, mobile Aktionsleiste
    sections/           Seitenabschnitte (Anfahrt, FAQ, Speisekarte, CTA …)
    ui/                 Grundbausteine (Button, Container, Gleisschild …)
    DepartureBoard.tsx  Abfahrtstafel mit Live-Status
    InquiryForm.tsx     Anfrageformular
    MapConsent.tsx      Google Maps als Zwei-Klick-Lösung
  content/              Unternehmensdaten, Speisekarte, FAQ, Navigation
  lib/                  Öffnungszeiten-Logik, SEO/Schema, Mailversand, Validierung
scripts/
  generate-brand-assets.cjs   erzeugt Vorschaubild und Touch-Icon neu
```

## Umgebungsvariablen

Siehe [`.env.example`](.env.example).

| Variable | Pflicht | Zweck |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ja (Produktion) | Öffentliche Adresse für Canonicals, Sitemap, Schema |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | für das Formular | SMTP-Zugang für den Versand der Anfragen |
| `CONTACT_TO` | nein | Empfänger (Standard: Adresse aus `business.ts`) |
| `CONTACT_FROM` | nein | Absender (Standard: `SMTP_USER`, muss eine E-Mail-Adresse sein) |

Sind in Produktion keine SMTP-Daten gesetzt, sendet das Formular nichts und zeigt stattdessen einen Hinweis mit der Telefonnummer.

## Externe Dienste

| Dienst | Einbindung | Zugangsdaten |
|---|---|---|
| Google Maps | Karte erst nach Klick („Karte laden“), sonst nur Links | keine |
| Google-Unternehmensprofil | Link zum Profil; Bewertungszahlen nur, wenn in `business.ts` gepflegt | keine |
| Facebook | einfacher Link | keine |
| SMTP-Postfach | Versand der Formularanfragen | SMTP-Zugang |

Analyse- oder Tracking-Werkzeuge sind nicht eingebaut; deshalb gibt es kein Cookie-Banner. Wer später Tracking ergänzt, braucht eine Einwilligungslösung und muss die Content-Security-Policy in `next.config.ts` sowie die Datenschutzerklärung anpassen.

## Deployment

Die Seite braucht eine Node.js-Umgebung (wegen der Server Action). Am einfachsten ist ein Hoster mit Next.js-Unterstützung wie Vercel oder Netlify; ein eigener Server mit `npm run build` und `npm run start` geht ebenso.

1. Repository beim Hoster verbinden.
2. Umgebungsvariablen aus `.env.example` eintragen.
3. Domain `bahnstadtgrill.de` aufschalten und `www` auf die Hauptdomain umleiten.
4. Hoster im Datenschutz eintragen (`business.legal.hostingProvider`) und Auftragsverarbeitungsvertrag abschließen.

Sicherheits-Header (CSP, HSTS, X-Frame-Options u. a.) setzt `next.config.ts`. Der Spam-Schutz des Formulars (Honeypot, Mindestzeit, Limit pro IP) arbeitet im Arbeitsspeicher der jeweiligen Serverinstanz; das genügt für diese Seitengröße.
