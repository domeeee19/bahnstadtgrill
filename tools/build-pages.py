#!/usr/bin/env python3
"""Erzeugt die Unterseiten (Speisekarte, Impressum, Datenschutz, Bildnachweise) in docs/.

Kopf- und Fußzeile kommen aus docs/index.html, damit alle Seiten gleich aussehen.
Inhalte pflegen: Speisekarte in tools/menu.json, Rechtsangaben in tools/legal.json.
Aufruf:  python3 tools/build-pages.py
"""
import html, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
index = (DOCS / "index.html").read_text(encoding="utf-8")


def between(start, end):
    a = index.index(start)
    b = index.index(end, a) + len(end)
    return index[a:b]


header = between('<header class="nav">', "</header>")
# Links der Startseite zeigen von Unterseiten aus auf index.html
header = re.sub(r'href="#(top|karte|biergarten|theke|besuch)"', r'href="index.html#\1"', header)
header = header.replace('<a class="skip-link" href="index.html#top">', '<a class="skip-link" href="#inhalt">')

links = between('<div class="closing__links">', "</div>\n  </div>\n</footer>")
links = links[: links.rindex("</div>\n  </div>\n</footer>")]
links = re.sub(r'href="#(top|karte|biergarten|theke|besuch)"', r'href="index.html#\1"', links)
actionbar = between('<nav class="actionbar"', "</nav>")

legal = json.loads((ROOT / "tools" / "legal.json").read_text(encoding="utf-8"))


def todo(value, hint):
    return html.escape(value) if value else f'<mark class="todo">[Bitte ergänzen: {html.escape(hint)}]</mark>'


def page(slug, title, description, h1, lead, body, robots="index,follow"):
    return f"""<!doctype html>
<html lang="de" data-type="place" data-radius="soft" data-buttons="block" data-motion>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(description)}">
<meta name="robots" content="{robots}">
<meta property="og:type" content="website">
<meta property="og:title" content="{html.escape(title)}">
<meta property="og:description" content="{html.escape(description)}">
<meta property="og:image" content="share.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#f7f4ed">
<link rel="canonical" href="https://bahnstadtgrill.de/{slug}">
<meta name="site-kind" content="other">
<meta name="page-type" content="place">
<meta name="page-kind" content="place">
<link rel="stylesheet" href="assets/system.css">
<link rel="stylesheet" href="assets/ui/cards.css">
<link rel="stylesheet" href="assets/motion/motion.css">
<link rel="stylesheet" href="assets/layout/layout.css">
<link rel="stylesheet" href="assets/site.css">
<script>document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)</script>
</head>
<body class="subpage">
{header}

<main id="inhalt">
  <section class="section section--page" aria-labelledby="seite-h">
    <div class="wrap">
      <div class="section-head">
        <h1 id="seite-h">{html.escape(h1)}</h1>
        {f'<p class="t-lead">{lead}</p>' if lead else ''}
      </div>
{body}
    </div>
  </section>
</main>

<footer class="footer closing footer--page">
  <div class="wrap">
    {links}
  </div>
</footer>

{actionbar}

<script type="module" src="assets/system.js"></script>
<script type="module" src="assets/motion/motion.js"></script>
</body>
</html>
"""


# ---------------------------------------------------------------- Speisekarte
menu = json.loads((ROOT / "tools" / "menu.json").read_text(encoding="utf-8"))
groups_html = []
for group in menu["groups"]:
    cats = []
    for cat in group["categories"]:
        rows = []
        for item in cat["items"]:
            tags = []
            if item.get("homemade"):
                tags.append("hausgemacht")
            if item.get("vegetarian"):
                tags.append("vegetarisch")
            desc = item.get("description", "")
            extra = ", ".join(tags)
            line = " · ".join(x for x in [desc, extra] if x)
            price = f'<span class="rows__value">{html.escape(item["price"])}&nbsp;€</span>' if item.get("price") else ""
            rows.append(
                f'<li><span class="rows__name">{html.escape(item["name"])}</span>{price}'
                + (f"<p>{html.escape(line)}</p>" if line else "")
                + "</li>"
            )
        intro = f'<p class="muted">{html.escape(cat["intro"])}</p>' if cat.get("intro") else ""
        cats.append(
            f'<div class="karte-gruppe" id="{cat["id"]}"><h3>{html.escape(cat["title"])}</h3>{intro}<ul class="rows">{"".join(rows)}</ul></div>'
        )
    groups_html.append(
        f'<h2 class="karte-titel" id="{group["id"]}">{html.escape(group["title"])}</h2><div class="karte-raster">{"".join(cats)}</div>'
    )
menu_body = "\n".join(groups_html) + f"""
<p class="karte-hinweis">{menu['note']}</p>"""

(DOCS / "speisekarte.html").write_text(
    page(
        "speisekarte.html",
        "Speisekarte: Gyros, Pizza und Schnitzel | Bahnstadtgrill Opladen",
        "Die Speisekarte des Bahnstadtgrill in Leverkusen-Opladen: Gyros Pita, Gyros-Teller, Pizza, Schnitzel, Currywurst, vegetarische Gerichte, Kölsch und Pils vom Fass.",
        "Speisekarte",
        "Alles gibt es zum Hieressen, im Biergarten und zum Mitnehmen. Tzatziki und Krautsalat machen wir selbst.",
        menu_body,
    ),
    encoding="utf-8",
)

# ---------------------------------------------------------------- Impressum
L = legal
impressum = f"""<div class="prose">
<h2>Angaben gemäß § 5 DDG</h2>
<p>Bahnstadtgrill Opladen<br>{todo(L['owner'], 'Vor- und Nachname des Inhabers bzw. Firma mit Rechtsform und Vertretungsberechtigten')}<br>Lützenkirchener Straße 12<br>51379 Leverkusen</p>
<h2>Kontakt</h2>
<p>Telefon: <a class="link" href="tel:+49217180154">02171 80154</a><br>E-Mail: <a class="link" href="mailto:bahnstadtgrill@gmail.com">bahnstadtgrill@gmail.com</a></p>
<h2>Umsatzsteuer-ID</h2>
<p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {todo(L['vatId'], 'USt-IdNr., falls vorhanden – sonst Abschnitt löschen')}</p>
<h2>Verantwortlich für den Inhalt</h2>
<p>{todo(L['owner'], 'Name der verantwortlichen Person')}, Anschrift wie oben</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Bildnachweise</h2>
<p>Die Bildnachweise stehen auf einer <a class="link" href="credits.html">eigenen Seite</a>.</p>
</div>"""
(DOCS / "impressum.html").write_text(
    page("impressum.html", "Impressum | Bahnstadtgrill Opladen", "Impressum und Anbieterkennzeichnung des Bahnstadtgrill Opladen.", "Impressum", "", impressum, "noindex,follow"),
    encoding="utf-8",
)

# ---------------------------------------------------------------- Datenschutz
datenschutz = f"""<div class="prose">
<h2>Verantwortlicher</h2>
<p>Bahnstadtgrill Opladen, {todo(L['owner'], 'Name des Inhabers')}, Lützenkirchener Straße 12, 51379 Leverkusen. Telefon <a class="link" href="tel:+49217180154">02171 80154</a>, E-Mail <a class="link" href="mailto:bahnstadtgrill@gmail.com">bahnstadtgrill@gmail.com</a>.</p>
<h2>Kurz gesagt</h2>
<p>Diese Website setzt keine Cookies, nutzt kein Tracking und lädt beim Aufruf nichts von Google oder anderen Drittanbietern. Schriften und Bilder liegen auf demselben Server wie die Seite.</p>
<h2>Hosting</h2>
<p>Die Website wird gehostet bei: {todo(L['host'], 'Name und Anschrift des Hosting-Anbieters, ggf. Hinweis auf Auftragsverarbeitung und Drittlandübermittlung')}. Beim Aufruf verarbeitet der Anbieter technisch notwendige Daten (IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser), um die Seite auszuliefern und abzusichern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
<h2>Kontakt per Telefon oder E-Mail</h2>
<p>Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu beantworten (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Unser E-Mail-Postfach wird von Google (Gmail) bereitgestellt; dabei können Daten auch außerhalb der EU verarbeitet werden.</p>
<h2>Links zu anderen Anbietern</h2>
<p>„Route planen“ öffnet die Suche von OpenStreetMap, der Facebook-Link unsere Facebook-Seite. Daten gehen erst an diese Anbieter, wenn Sie den Link anklicken. Dort gelten deren Datenschutzbestimmungen.</p>
<h2>Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Eine Nachricht an <a class="link" href="mailto:bahnstadtgrill@gmail.com">bahnstadtgrill@gmail.com</a> genügt. Beschweren können Sie sich bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.</p>
<h2>Stand</h2>
<p>{todo(L['asOf'], 'Datum der rechtlichen Prüfung')}</p>
</div>"""
(DOCS / "datenschutz.html").write_text(
    page("datenschutz.html", "Datenschutz | Bahnstadtgrill Opladen", "Datenschutzerklärung des Bahnstadtgrill Opladen: keine Cookies, kein Tracking.", "Datenschutz", "", datenschutz, "noindex,follow"),
    encoding="utf-8",
)

# ---------------------------------------------------------------- Bildnachweise
credits = json.loads((DOCS / "assets" / "img" / "credits.json").read_text(encoding="utf-8"))["photos"]
used = set(re.findall(r"photo-(f\d+)", index + (DOCS / "speisekarte.html").read_text(encoding="utf-8")))
rows = []
for c in credits:
    if c["id"] not in used:
        continue
    rows.append(
        f'<li><span class="rows__name">{html.escape(c["by"])}</span><p>{html.escape(c["source"])}, '
        f'<a class="link" href="{c["licenceUrl"]}" rel="noopener">{html.escape(c["licence"])}</a>, '
        f'<a class="link" href="{c["page"]}" rel="noopener">Originaldatei</a>; für die Website zugeschnitten</p></li>'
    )
for own in legal.get("ownPhotos", []):
    rows.append(f'<li><span class="rows__name">{html.escape(own)}</span><p>Foto des Bahnstadtgrill Opladen</p></li>')
(DOCS / "credits.html").write_text(
    page(
        "credits.html",
        "Bildnachweise | Bahnstadtgrill Opladen",
        "Herkunft und Lizenzen der Fotos auf der Website des Bahnstadtgrill Opladen.",
        "Bildnachweise",
        "Fotos von Wikimedia Commons unter freien Lizenzen. Sie werden nach und nach durch eigene Fotos des Hauses ersetzt.",
        f'<ul class="rows credits-list">{"".join(rows)}</ul>',
        "noindex,follow",
    ),
    encoding="utf-8",
)
print("geschrieben: speisekarte.html, impressum.html, datenschutz.html, credits.html")
