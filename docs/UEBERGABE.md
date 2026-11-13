# Übergabe: Website Bahnstadtgrill Opladen

Stand: 13.11.2026

## 1. Analyse in Kürze

| Punkt | Ergebnis |
|---|---|
| Geschäftsmodell | Griechischer Grill/Imbiss, Kneipe und Biergarten in einem Haus; Essen vor Ort und zum Mitnehmen |
| Zielgruppe | Familien, Nachbarschaft und Stammgäste (25–90 Jahre), Pendler am Bahnhof Opladen, Fußballfans (Bayer 04) |
| Stärken | Gyros Pita mit hausgemachtem Tzatziki und Krautsalat, Kneipe **und** warme Küche, Biergarten/Wintergarten, Lage am Bahnhof, Parken, faire Preise, die Geschichte „Zur Schwelle“ |
| Wichtigste Handlungen | Anrufen (Vorbestellung, Fragen), Route planen, Speisekarte ansehen, Plätze für Gruppen/Spieltage anfragen |
| Suchpotenzial | „Gyros Opladen“, „Grieche Opladen“, „Imbiss Bahnhof Opladen“, „Biergarten Opladen/Leverkusen“, „Fußball schauen Opladen“, „Kneipe Opladen“, Markensuche „Bahnstadtgrill“ / „Zur Schwelle“ |

### Quellen und ihre Belastbarkeit

| Quelle | Genutzt für | Belastbarkeit |
|---|---|---|
| Angaben des Auftraggebers | Name, Adresse, Kontakt, Leistungen, USPs, Einzugsgebiet | verbindlich |
| „Lust auf Leverkusen“ (Stadtmarketing Leverkusen) | Geschichte, Zitate, Öffnungszeiten | belegt, Artikel ohne Datum |
| speisekartenweb.de (letzte Änderung 24.06.2026) | Gerichteliste, Bestätigung der Öffnungszeiten | Verzeichnis, nicht offiziell |
| Google-Unternehmensprofil | – | **nicht abrufbar**: Google blockt automatisierte Zugriffe (Captcha). Es wurden daher keine Bewertungen, Sterne oder Rezensionstexte übernommen |

## 2. Strategie

**Positionierung:** Der Grieche am Bahnhof Opladen, der zugleich Kneipe und Biergarten ist – bodenständig, herzlich, mit Geschichte.

**Kommunikation:** Direkt und warm, in ganzen Sätzen, mit „Sie“. Konkrete Gerichte und Orte statt Werbesprache. Keine Superlative außer im belegten Zitat.

**Seitenstruktur**

| Seite | Ziel | Suchintention |
|---|---|---|
| `/` Startseite | In Sekunden: was, wo, wann offen, anrufen | Marke, „Grieche/Imbiss Opladen“ |
| `/speisekarte` | Auswahl treffen, vorbestellen | „Gyros Opladen“, „Speisekarte Bahnstadtgrill“ |
| `/biergarten` | Besuch im Garten, Gruppenanfrage | „Biergarten Opladen“ |
| `/fussball-dart` | Spieltag planen, Plätze anfragen | „Fußball schauen Opladen“, „Kneipe Opladen“ |
| `/ueber-uns` | Vertrauen und Wiedererkennung | „Zur Schwelle Opladen“ |
| `/kontakt` | Anfahrt, Zeiten, Anfrage, FAQ | „Bahnstadtgrill Öffnungszeiten/Telefon“ |
| `/impressum`, `/datenschutz` | Pflichtangaben | – (noindex) |

Bewusst **nicht** gebaut: Ortslandingpages für Langenfeld, Monheim usw. (wären Doorway-Pages ohne eigenen Inhalt). Das Einzugsgebiet steht stattdessen einmal natürlich auf der Kontaktseite und in den strukturierten Daten.

**Conversion:** Telefon ist der Hauptweg (Kopfzeile, Hero, jede Abschlussfläche, feste Leiste auf dem Smartphone mit Anrufen / Route / Speisekarte). Das Formular ist der zweite Weg für alles Planbare und sagt klar, dass eine Anfrage noch keine Reservierung ist.

**SEO:** individuelle Titel und Beschreibungen, Canonicals, Sitemap, robots.txt, Open Graph, JSON-LD (`Restaurant` + `BarOrPub`, `Menu`, `FAQPage`, `BreadcrumbList`, `WebSite`), einheitliche NAP-Daten aus einer Quelle.

## 3. Designsystem

**Leitidee:** Bahnhof trifft Taverne. Die blau-weiße Markise über dem Eingang ist echt und wird zum Markenzeichen; Schildschrift, Gleisnummern und eine Abfahrtstafel greifen die Eisenbahn-Geschichte des Ortes auf.

| Element | Festlegung |
|---|---|
| Wiedererkennung | Markise (Hero, Logo, Streifenbänder) und Gleisschilder: Küche = Gleis 1, Theke = Gleis 2, Biergarten = Gleis 3 |
| Besonderer Moment | Abfahrtstafel mit Uhrzeit vor Ort und Live-Status „Jetzt geöffnet bis …“ |
| Primärfarbe | Markisenblau `#17479b` (dunkel `#0f2f6b`, hell `#e2e9f5`) |
| Flächen | Papier `#f4efe4`, erhöht `#fbf8f1`, abgesenkt `#e9e2d2`; Nacht `#101318` für Theke und Tafel |
| Text | Tinte `#15181d`, weich `#414650`, gedämpft `#5c6169` |
| Anzeige | Bernstein `#f2b233` nur in der Tafel; Grün/Rot nur für den Öffnungsstatus |
| Schrift | Barlow Condensed (Überschriften, Versalien wie auf Bahnhofsschildern), Barlow (Text), Fraunces (Zitate) |
| Raster | 4-px-Raster; Abschnitte 80/112 px; Inhaltsbreite 76 rem |
| Radien | Bedienelemente 6 px, Karten 10 px, Flächen 16 px |
| Buttons | 48 px hoch; primär blau, sekundär Kontur, auf dunklem Grund hell |
| Icons | Lucide, Linienstil, in Textfarbe |
| Bewegung | kurzes Einblenden im Hero, dezentes Aufsteigen beim Scrollen (reines CSS), Farbwechsel bei Hover; alles aus bei „Bewegung reduzieren“ |
| Bildsprache | Bewusst ohne Stockfotos: Grafik und Typografie tragen die Seite, bis echte Fotos vorliegen |

Alle Werte liegen als Tokens in `src/app/globals.css`.

## 4. Agent- und Tool-Assessment

| Kategorie | Einstufung | Tatsächlich genutzt |
|---|---|---|
| Web-Recherche (Suche, Seitenabruf) | ESSENTIAL | ja – Unternehmensrecherche, Quellenprüfung; zwei Abruf-Agents für Artikel und Verzeichnisse |
| Browser-Automatisierung (Playwright/Chromium) | ESSENTIAL | ja – Screenshots Desktop/Mobil, Funktionstests, Barrierefreiheit (axe-core), Lighthouse |
| Design-Skill „unslop“ | RECOMMENDED | ja – als Prüfraster gegen austauschbare KI-Optik |
| Eingebettete Next.js-16-Dokumentation | ESSENTIAL | ja – neue Konventionen dieser Version |
| GitHub-Anbindung | ESSENTIAL | ja – Commit und Push auf den Entwicklungszweig |
| Weitere Subagents (Branding, Content, SEO, QA …) | NOT NEEDED | nein – Umfang ließ sich konsistenter in einer Hand umsetzen |
| Bildgenerierung | RECOMMENDED | **nicht verfügbar** – daher grafisches Konzept ohne Fotos |
| Google Business Profile / Places API | RECOMMENDED | **nicht verfügbar** (kein Zugang) – Profil nur verlinkt |
| Gmail-/Kalender-Connector | NOT NEEDED | vorhanden, aber nicht verbunden und fürs Projekt nicht nötig |
| Analytics, Tag Manager, CRM, Newsletter, Chatbot, Shop/Payment | NOT NEEDED | nein – kein Mehrwert für eine Gaststätte dieser Größe, dafür Consent-Pflichten |
| Online-Bestellung / Lieferdienst | OPTIONAL | vorbereitet (`business.links.onlineOrder`), nicht aktiv |
| Google Search Console | RECOMMENDED (nach Go-live) | durch den Inhaber einzurichten |

## 5. Qualitätssicherung

Geprüft am Produktions-Build:

| Prüfung | Ergebnis |
|---|---|
| Build, TypeScript, ESLint | fehlerfrei |
| Darstellung | alle 8 Seiten + 404 auf 1440 px und iPhone-Breite gesichtet, kein horizontales Scrollen |
| Funktion (19 automatisierte Tests, alle bestanden) | Formular: Pflichtfelder, Fehlermeldungen, Werte bleiben erhalten, Versand per SMTP an ein Testpostfach, Honeypot, Mindestzeit, Sendebegrenzung; Karte lädt erst nach Klick; keine Cookies; keine Drittanfragen beim Laden; mobiles Menü; Sprunglink; Live-Status |
| Barrierefreiheit (axe-core, WCAG 2.2 AA) | 0 Verstöße auf allen Seiten, Desktop und Mobil |
| Lighthouse mobil, finaler Build | Startseite 99 / 100 / 100 / 100, Kontakt 100 / 100 / 100 / 100 (Performance / Accessibility / Best Practices / SEO); LCP 0,9 s, CLS 0. Speisekarte im vorletzten Build: 96 / 100 / 100 / 100 |
| Links | 36 interne Links inkl. Sprungmarken erreichbar |

Lighthouse-Werte stammen aus einer lokalen Messung mit simulierter Drosselung; auf dem echten Hosting können sie abweichen.

Nicht geprüft: echte Geräte (nur Emulation), Safari und Firefox, Versand über das echte Postfach, externe Links (Google, Facebook) aus dieser Umgebung heraus.

## 6. Offene Punkte – bitte vom Inhaber bestätigen

**Pflicht vor Veröffentlichung**

1. **Impressum:** Name des Inhabers bzw. Firma und Rechtsform, ggf. USt-IdNr. (`business.legal`). Ein Verzeichnis nennt einen Inhabernamen; er wurde bewusst nicht übernommen.
2. **Datenschutz:** Hosting-Anbieter eintragen, Datum setzen, Texte rechtlich prüfen lassen. Impressum und Datenschutz sind Entwürfe, keine Rechtsberatung.
3. **Öffnungszeiten** Mo–Sa 11:30–21:00, So Ruhetag: aus zwei Quellen, aber nicht vom Inhaber bestätigt. Feiertage und Biergarten-Zeiten ergänzen.
4. **Speisekarte:** Gerichte stammen aus einem öffentlichen Verzeichnis (Stand 06/2026) und müssen mit der aktuellen Karte abgeglichen werden. **Preise fehlen** absichtlich, weil sie nicht verlässlich zuzuordnen waren.
5. **SMTP-Zugang** für das Formular einrichten und einmal echt testen.

**Inhaltlich zu bestätigen**

6. Vorbestellen und Abholen per Telefon (steht in FAQ und Abschlussflächen).
7. Angaben „hausgemacht“ für Metaxasauce, Paprikasauce und Frikadelle (Tzatziki und Krautsalat sind vom Auftraggeber bestätigt).
8. Umbenennung „Zigeuner Art“ → „Paprika Art“ auf der Website: bewusste Empfehlung, in `menu.ts` änderbar.
9. Fußball: Es wird nicht behauptet, welche Wettbewerbe gezeigt werden. Wenn Übertragungsrechte feststehen, konkret benennen.
10. Zitate aus „Lust auf Leverkusen“ sind kurz, gekennzeichnet und verlinkt. Empfehlung: Stadtmarketing kurz um Zustimmung bitten. In einem Zitat wurden zwei offensichtliche Tippfehler des Originals korrigiert.
11. Kartenzahlung, Lieferung, Online-Bestellung: in Verzeichnissen erwähnt, hier nicht dargestellt, bis bestätigt.
12. `priceRange` „€“ in den strukturierten Daten ist eine Einschätzung aus „faire Preise“.

**Empfohlen**

13. **Fotos:** Die Seite kommt ohne aus, gewinnt aber deutlich mit echten Bildern (Gyros Pita, Markise von außen, Biergarten, Theke am Spieltag, der Patron). Ein halber Tag mit einem Fotografen genügt.
14. **Google-Profil:** heißt dort offenbar noch „Zur Schwelle“. Name, Adresse, Telefon und Website im Profil an die Website angleichen. Danach echte Sternebewertung, Anzahl und Datum in `business.googleRating` eintragen und den Rezensionslink (`business.links.googleReview`, benötigt die Place-ID) setzen.
15. E-Mail-Adresse auf eigener Domain (z. B. `info@bahnstadtgrill.de`) statt Gmail.
16. Koordinaten des Lokals in den strukturierten Daten ergänzen, sobald sie aus dem Google-Profil vorliegen.

## 7. Go-live-Checkliste

- [ ] Punkte 1–5 erledigt; auf keiner Seite steht mehr „[Bitte ergänzen: …]“
- [ ] Inhalte (Punkte 6–12) vom Inhaber freigegeben
- [ ] Umgebungsvariablen beim Hoster gesetzt, `NEXT_PUBLIC_SITE_URL` stimmt mit der Domain überein
- [ ] Domain aufgeschaltet, HTTPS aktiv, `www` leitet auf die Hauptdomain um
- [ ] Formular mit echtem Postfach getestet (Anfrage kommt an, Antwort-Adresse stimmt)
- [ ] Telefon- und Routenlink auf einem echten Smartphone getestet
- [ ] Auf iPhone (Safari) und Android (Chrome) durchgeklickt
- [ ] Strukturierte Daten im Rich-Results-Test von Google geprüft
- [ ] Google Search Console eingerichtet, Sitemap `/sitemap.xml` eingereicht
- [ ] Website-Adresse im Google-Unternehmensprofil und auf Facebook eingetragen
- [ ] Alte Platzhalterseite auf `bahnstadtgrill.de` abgelöst
