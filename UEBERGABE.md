# Übergabe: Website Bahnstadtgrill Opladen

Stand: 13.11.2026 · Redesign mit dem Taste Skill 2.5.1

## Ergebnis der Prüfung

**GATE: PASS** (Endprüfung des Taste Skills, Runde 3 von 3) für `docs/index.html`.

| Prüfung | Ergebnis |
|---|---|
| Copy-Lint | 0 FAIL, 0 WARN |
| Consistency-Check 1440 / 1024 / 820 / 768 / 390 | 0 offene FAIL, 16 WARN |
| Layout-Check (eine Sektion pro Bildschirm, gleiche Kanten) | ohne Befund auf allen fünf Größen |
| Seite bei 320 px | kein Überlauf |

Begründete Ausnahmen (`.taste-skill/waivers.json`): Hausnummer, Postleitzahl im JSON-LD und Telefonnummer (zweimal). Diese Angaben stammen vom Auftraggeber, die Regeln des Skills zielen aber auf erfundene Kontaktdaten. Hinzu kommt ein Hover-Übergang aus dem Kit selbst.

Verbleibende Warnungen, bewusst gelassen:

- Die Buttons sind auf Deutsch („Route planen“). Die Prüfung erwartet englische Verben.
- Die Platzhalter-Fotos haben unterschiedliche Farbstimmungen. Das erledigt sich mit eigenen Fotos.
- Einige Abstände zwischen Abschnitten weichen leicht ab.

## Gestaltung

| | |
|---|---|
| Seitentyp | Ort („place“): Fotos, Schrift und flache Farbe, keine Effekte |
| Farben | heller Grund #f7f4ed, Tinte #1b1e24, Akzent: das Blau der Markise #17479b |
| Schrift | EB Garamond (Überschriften), Jost (Text), lokal eingebunden |
| Logo | Nachzeichnung des Hausschilds (Bogen, „Bahnstadt“, Lok, „Grill“) in `docs/assets/logo/` |
| Aufbau | Startbild → Anfahrt & Öffnungszeiten → Speisekarte → Biergarten → Theke → Abschluss |
| Bewegung | Einblenden des Startbilds, das Biergarten-Foto „entwickelt sich“ beim Erscheinen, Hover-Effekte |
| Handy | feste Leiste mit „Anrufen“ und „Route planen“ |

## Öffnungszeiten (vom Auftraggeber bestätigt)

- Gaststätte und Küche: Montag bis Samstag 11:30–21:00, Sonntag Ruhetag
- Biergarten: Montag bis Samstag 17:00–22:00

## Offene Punkte

**Vom Inhaber benötigt**

1. **Fotos als Dateien** in den Ordner `fotos/` hochladen: Patron am Gyros-Spieß, drei Biergarten-Fotos, Fassade mit Schild. Im Chat kamen sie nur als Vorschau an. Bis dahin stehen auf der Seite lizenzfreie Platzhalter von Wikimedia Commons (siehe `credits.html`).
2. **Logo-Originaldatei**, falls vorhanden. Bis dahin ist eine Nachzeichnung im Einsatz.
3. **Impressum:** Inhaber bzw. Firma mit Rechtsform, gegebenenfalls USt-IdNr. Einzutragen in `tools/legal.json`, danach `python3 tools/build-pages.py` ausführen.
4. **Datenschutz:** Hosting-Anbieter und Datum der rechtlichen Prüfung (ebenfalls `tools/legal.json`). Beide Rechtstexte sind Entwürfe.
5. **Speisekarte:** Gerichte mit der aktuellen Karte abgleichen und Preise ergänzen (`tools/menu.json`, Feld `price`).

**Zu bestätigen**

6. Biergarten-Text: „auf dem Rasen oder unter dem Sonnendach“ ist aus Ihren Fotos abgeleitet.
7. Theke: Bayer-04-Spiele werden gezeigt, und Dart gibt es (laut Angaben des Auftraggebers).
8. „Schnitzel Paprika Art“ statt „Zigeuner Art“: Das ist eine Empfehlung und lässt sich in `tools/menu.json` ändern.

## Go-live-Checkliste

- [ ] Eigene Fotos eingebaut, Platzhalter und `credits.html` angepasst
- [ ] Punkte 3–5 erledigt, kein „[Bitte ergänzen: …]“ mehr auf den Seiten
- [ ] Domain bahnstadtgrill.de auf das Hosting zeigen lassen (GitHub Pages: Custom domain)
- [ ] Auf iPhone und Android durchgeklickt, Anruf- und Routenlink getestet
- [ ] Google-Unternehmensprofil: Name, Adresse, Telefon und Website angleichen
- [ ] Google Search Console einrichten, Sitemap einreichen
