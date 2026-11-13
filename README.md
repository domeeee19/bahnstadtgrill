# Bahnstadtgrill Opladen – Website

Website des **Bahnstadtgrill Opladen** (ehemals „Zur Schwelle“): griechischer Grill, Kneipe und Biergarten am Bahnhof Opladen, Lützenkirchener Straße 12, 51379 Leverkusen.

Gestaltet und geprüft mit dem [Taste Skill](https://github.com/leonxlnx/taste-skill) (v2.5.1). Die Startseite besteht dessen Endprüfung (`GATE: PASS`). Offene Punkte und die Go-live-Checkliste stehen in [`UEBERGABE.md`](UEBERGABE.md).

## Aufbau

Die fertige Website liegt als statisches HTML in `docs/`. Es gibt keinen Build-Schritt, und GitHub Pages kann den Ordner direkt ausliefern.

```
docs/
  index.html           Startseite (eine Seite, Abschnitte #besuch, #karte, #biergarten, #theke)
  speisekarte.html     ganze Speisekarte          ┐
  impressum.html       Impressum                  │ erzeugt von tools/build-pages.py
  datenschutz.html     Datenschutzerklärung       │
  credits.html         Bildnachweise              ┘
  assets/              Kit des Taste Skills (system.css/js, motion, layout, moments), unverändert
  assets/site.css      Seiten-Tokens, Schriften und die wenigen eigenen Regeln
  assets/jetzt.js      „Jetzt geöffnet / Geschlossen“ auf Deutsch
  assets/logo/         Logo (Nachzeichnung des Hausschilds) und Bildzeichen
  assets/img/          Fotos (WebP in mehreren Breiten)
  assets/fonts/        EB Garamond und Jost, lokal (keine Verbindung zu Google Fonts)
tools/
  build-pages.py       erzeugt die Unterseiten
  menu.json            Speisekarte (Preise: Feld "price", z. B. "9,50")
  legal.json           Inhaber, USt-ID, Hoster, Stand – füllt Impressum und Datenschutz
```

## Inhalte ändern

- **Startseite:** direkt in `docs/index.html`.
- **Speisekarte, Impressum, Datenschutz:** `tools/menu.json` bzw. `tools/legal.json` bearbeiten, dann ausführen:

```bash
python3 tools/build-pages.py
```

- **Öffnungszeiten:** in `docs/index.html` an zwei Stellen (Kurzzeile im Startbild, Tabelle `dl.hours` im Abschnitt „Anfahrt“) sowie im JSON-LD-Block im `<head>`. Die Tabelle steuert die Anzeige „Jetzt geöffnet“.
- **Fotos tauschen:** neue Datei nach `docs/assets/img/` legen und das `src`/`srcset` im HTML ändern. Die Stellen sind mit `<!--HERO-PHOTO-->`, `<!--GARDEN-PHOTO-->` und `<!--CLOSE-PHOTO-->` markiert.

## Lokal ansehen

```bash
python3 -m http.server 8000 --directory docs
```

Danach http://localhost:8000 öffnen.

## Vorschau über GitHub Pages

1. Repository auf **public** stellen (Settings → General → Danger Zone → Change visibility).
2. Settings → **Pages** → Source „Deploy from a branch“ → Branch `claude/friendly-euler-oxar07`, Ordner `/docs` → Save.
3. Nach ein bis zwei Minuten ist die Seite unter https://domeeee19.github.io/bahnstadtgrill/ erreichbar.

## Prüfen mit dem Taste Skill

```bash
node <skill>/scripts/gate.mjs docs/index.html
```

Die begründeten Ausnahmen stehen in `.taste-skill/waivers.json` (echte Adresse und Telefonnummer des Lokals, ein Hover-Übergang des Kits).
