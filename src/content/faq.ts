import { business } from "./business";

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Wann hat der Bahnstadtgrill geöffnet?",
    answer: `Montag bis Samstag von 11:30 bis 21:00 Uhr. Sonntag ist Ruhetag. An Feiertagen rufen Sie am besten kurz an: ${business.phone.display}.`,
  },
  {
    question: "Wo finde ich den Bahnstadtgrill?",
    answer: `An der ${business.address.street} in ${business.address.postalCode} ${business.address.city}-${business.address.district}, am östlichen Ende der Bahnhofsbrücke – direkt am Bahnhof Opladen und an der Neuen Bahnstadt. Sie erkennen uns an der blau-weißen Markise.`,
  },
  {
    question: "Kann ich mein Essen vorbestellen und abholen?",
    answer: `Ja. Rufen Sie uns unter ${business.phone.display} an und sagen Sie, wann Sie kommen – dann ist Ihre Bestellung fertig, wenn Sie da sind.`,
  },
  {
    question: "Muss ich einen Tisch reservieren?",
    answer:
      "In der Regel nicht, kommen Sie einfach vorbei. Für größere Runden, Familienfeiern oder Fußballabende melden Sie sich bitte vorher telefonisch oder über das Anfrageformular.",
  },
  {
    question: "Wann ist der Biergarten geöffnet?",
    answer:
      "Bei schönem Wetter ab nachmittags, innerhalb unserer Öffnungszeiten. Wenn das Wetter nicht mitspielt, sitzen Sie im Wintergarten oder im Gastraum.",
  },
  {
    question: "Gibt es vegetarische Gerichte?",
    answer:
      "Ja: fleischlose Pizzen, Gemüsefrikadelle im Pita-Brot, Salate, gefüllte Weinblätter und Beilagen. Bei veganen Wünschen sprechen Sie uns an, wir sagen Ihnen, was passt.",
  },
  {
    question: "Kann ich bei Ihnen Fußball schauen?",
    answer:
      "Ja. An Spieltagen läuft bei uns Fußball, und wenn Bayer 04 spielt, wird es voll. Welche Partien wir zeigen, erfahren Sie am Telefon.",
  },
  {
    question: "Gibt es Parkplätze?",
    answer:
      "Ja, direkt vor Ort gibt es Parkmöglichkeiten. Vom Bahnhof Opladen kommen Sie zu Fuß über die Bahnhofsbrücke zu uns.",
  },
];
