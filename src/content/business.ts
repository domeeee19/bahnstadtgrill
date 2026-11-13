/**
 * Zentrale Unternehmensdaten (Single Source of Truth).
 *
 * Alles, was auf mehreren Seiten vorkommt – Name, Adresse, Telefon,
 * Öffnungszeiten, Profile –, wird ausschließlich hier gepflegt.
 * Werte mit `null` sind noch nicht bestätigt; die Website blendet die
 * zugehörigen Elemente dann automatisch aus bzw. zeigt einen Platzhalter.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sonntag … 6 = Samstag

export type DayHours = {
  day: Weekday;
  label: string;
  short: string;
  /** `null` = Ruhetag. Zeiten im Format HH:MM, Ortszeit Europe/Berlin. */
  open: string | null;
  close: string | null;
};

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bahnstadtgrill.de"
).replace(/\/$/, "");

const street = "Lützenkirchener Straße 12";
const postalCode = "51379";
const city = "Leverkusen";
const district = "Opladen";
const mapsQuery = encodeURIComponent(
  `Bahnstadtgrill, ${street}, ${postalCode} ${city}`,
);

export const business = {
  name: "Bahnstadtgrill Opladen",
  shortName: "Bahnstadtgrill",
  formerName: "Zur Schwelle",
  claim: "Griechischer Grill, Kneipe und Biergarten am Bahnhof Opladen",

  address: {
    street,
    postalCode,
    city,
    district,
    region: "Nordrhein-Westfalen",
    country: "DE",
    /** So steht es auf der Seite – eine Zeile. */
    oneLine: `${street}, ${postalCode} ${city}-${district}`,
  },

  phone: {
    display: "02171 80154",
    e164: "+49217180154",
    href: "tel:+49217180154",
  },

  email: {
    address: "bahnstadtgrill@gmail.com",
    href: "mailto:bahnstadtgrill@gmail.com",
  },

  /** Quelle: Stadtmarketing Leverkusen, bestätigt durch speisekartenweb.de (Stand 06/2026). */
  hours: [
    { day: 1, label: "Montag", short: "Mo", open: "11:30", close: "21:00" },
    { day: 2, label: "Dienstag", short: "Di", open: "11:30", close: "21:00" },
    { day: 3, label: "Mittwoch", short: "Mi", open: "11:30", close: "21:00" },
    { day: 4, label: "Donnerstag", short: "Do", open: "11:30", close: "21:00" },
    { day: 5, label: "Freitag", short: "Fr", open: "11:30", close: "21:00" },
    { day: 6, label: "Samstag", short: "Sa", open: "11:30", close: "21:00" },
    { day: 0, label: "Sonntag", short: "So", open: null, close: null },
  ] satisfies DayHours[],
  hoursSummary: "Mo–Sa 11:30–21:00 Uhr, Sonntag Ruhetag",
  beerGardenNote: "Biergarten bei schönem Wetter ab nachmittags",
  timeZone: "Europe/Berlin",

  links: {
    /** Vom Inhaber geteilter Link zum Google-Unternehmensprofil. */
    googleProfile: "https://share.google/wQrjQuwJbGND05kUd",
    /**
     * Direktlink „Rezension schreiben". Benötigt die Place-ID aus dem
     * Google-Unternehmensprofil: https://search.google.com/local/writereview?placeid=…
     * Solange `null`, verlinkt die Seite nur auf das Profil.
     */
    googleReview: null as string | null,
    mapsRoute: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
    mapsPlace: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    mapsEmbed: `https://www.google.com/maps?q=${mapsQuery}&hl=de&z=16&output=embed`,
    facebook: "https://www.facebook.com/100083409045368/",
    /** Online-Bestellung/Lieferdienst – erst eintragen, wenn bestätigt. */
    onlineOrder: null as string | null,
  },

  /**
   * Google-Bewertung. Wird nur angezeigt, wenn beide Werte gesetzt sind.
   * Bitte ausschließlich die echten Zahlen aus dem Google-Profil eintragen
   * und das Abrufdatum pflegen.
   */
  googleRating: {
    value: null as number | null,
    count: null as number | null,
    asOf: null as string | null,
  },

  /** Regionen, aus denen Gäste kommen (für Texte und strukturierte Daten). */
  serviceArea: [
    "Leverkusen-Opladen",
    "Leverkusen",
    "Bergisch Neukirchen",
    "Langenfeld",
    "Monheim am Rhein",
    "Burscheid",
    "Köln",
  ],

  cuisine: ["Griechisch", "Deutsch", "Pizza", "Imbiss"],

  /**
   * Rechtliche Pflichtangaben für Impressum und Datenschutz.
   * `null` erzeugt auf der Seite einen sichtbar markierten Platzhalter.
   */
  legal: {
    ownerName: null as string | null,
    legalForm: null as string | null,
    vatId: null as string | null,
    hostingProvider: null as string | null,
  },
} as const;

export const press = {
  source: "Lust auf Leverkusen",
  publisher: "Stadtmarketing Leverkusen",
  author: "Hendrik Neubauer",
  url: "https://lust-auf-leverkusen.de/bahnstadt-grill-neue-bahnstadt-opladen/",
  headline: "Beste Gyros Pita von Welt!",
  quote: "Hier gibt es die beste Gyros Pita von Welt!",
  quoteBy: "Frau Krüger, Gast",
  excerpt:
    "Das Fleisch ist innen saftig und außen knusprig, der Krautsalat und der Tzatziki schmecken hausgemacht.",
} as const;
