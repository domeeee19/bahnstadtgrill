# Bahnstadtgrill Opladen – Website

Website des **Bahnstadtgrill Opladen** (ehemals „Zur Schwelle“): griechischer Grill, Kneipe und Biergarten am Bahnhof Opladen, Lützenkirchener Straße 12, 51379 Leverkusen.

**Branch `claude/fancy-redesign`:** eigenständige, verspieltere Gestaltung „Abfahrt Gyros“ – Nachtblau, Markisenblau und Signal-Orange, animierte Fallblatt-Abfahrtstafel mit Live-Uhr und Öffnungsstatus, Laufband, Speisekarte mit Tabs und Bildvorschau am Mauszeiger, Biergarten-Polaroids, Spieltag-Tafel, ein Gleis, das sich beim Scrollen durch die Geschichte zeichnet, und eine animierte Wegskizze vom Bahnhof. Reines HTML, CSS und JavaScript ohne Abhängigkeiten; alle Animationen ruhen bei „Bewegung reduzieren“.

Offene Punkte und die Go-live-Checkliste stehen in [`UEBERGABE.md`](UEBERGABE.md).

## Aufbau

Die fertige Website liegt als statisches HTML in `docs/`. Es gibt keinen Build-Schritt, und GitHub Pages kann den Ordner direkt ausliefern.

```
docs/
  index.html           Startseite
  speisekarte.html     Speisekarte Imbiss         ┐
  biergarten-karte.html Biergarten-Karte          │
  impressum.html       Impressum                  │ erzeugt von tools/build-pages.py
  datenschutz.html     Datenschutzerklärung       │ (Kopf- und Fußzeile aus index.html)
  credits.html         Bildnachweise              ┘
  assets/styles.css    gesamte Gestaltung
  assets/app.js        Fallblatt-Tafel, Live-Status, Tabs, Scroll-Effekte
  assets/logo/         Logo (Nachzeichnung des Hausschilds)
  assets/img/          Fotos (WebP)
  assets/fonts/        Anton, DM Sans, Fraunces – lokal (keine Verbindung zu Google Fonts)
tools/
  build-pages.py       erzeugt die Unterseiten
  menu.json            Speisekarte Imbiss (Preise: Feld "price", z. B. "9,50")
  biergarten-karte.json Biergarten-Karte (gleiches Format; leer = Hinweis „wird neu geschrieben“)
  legal.json           Inhaber, USt-ID, Hoster, Stand
```

## Inhalte ändern

- **Startseite:** direkt in `docs/index.html`.
- **Speisekarten, Impressum, Datenschutz:** `tools/menu.json`, `tools/biergarten-karte.json` bzw. `tools/legal.json` bearbeiten, dann ausführen:

```bash
python3 tools/build-pages.py
```

- **Öffnungszeiten:** Texte in `docs/index.html`, die Logik für „Jetzt geöffnet“ oben in `docs/assets/app.js` (`OPEN`, `CLOSE`, `GARDEN_OPEN`, `GARDEN_CLOSE`).
- **Fotos tauschen:** neue Datei nach `docs/assets/img/` legen und das `src` im HTML ändern. Die Stellen sind mit `<!--HERO-PHOTO-->` und `<!--GARDEN-PHOTOS-->` markiert.

## Lokal ansehen

```bash
python3 -m http.server 8000 --directory docs
```

Danach http://localhost:8000 öffnen.

## Vorschau über GitHub Pages

1. Repository auf **public** stellen (Settings → General → Danger Zone → Change visibility).
2. Settings → **Pages** → Source „Deploy from a branch“ → Branch `claude/fancy-redesign`, Ordner `/docs` → Save.
3. Nach ein bis zwei Minuten ist die Seite unter https://domeeee19.github.io/bahnstadtgrill/ erreichbar.

## Tischreservierung Biergarten

Das Formular im Abschnitt `#reservieren` prüft die Eingaben (kein Sonntag, kein vergangenes Datum, 17–21 Uhr) und öffnet dann das E-Mail-Programm des Gastes mit einer fertigen Anfrage an bahnstadtgrill@gmail.com. Es läuft ohne Server, also auch auf GitHub Pages.

Soll die Anfrage ohne E-Mail-Programm ankommen, einen Formular-Dienst (z. B. Formspree) anlegen und dessen Adresse in `docs/index.html` bei `data-endpoint=""` am Formular eintragen. Dann sendet die Seite direkt und zeigt eine Bestätigung; die Datenschutzerklärung muss diesen Dienst dann nennen.
