/**
 * Geteilte Definitionen für das Anfrageformular (Browser und Server).
 * Die eigentliche Validierung liegt in `inquiry-schema.ts` und läuft nur
 * auf dem Server.
 */
export const occasions = [
  { value: "tisch", label: "Tisch für einen Besuch" },
  { value: "gruppe", label: "Größere Runde oder Feier" },
  { value: "fussball", label: "Plätze zum Fußballschauen" },
  { value: "biergarten", label: "Plätze im Biergarten" },
  { value: "frage", label: "Allgemeine Frage" },
] as const;

export const inquiryFields = [
  "name",
  "phone",
  "email",
  "occasion",
  "date",
  "time",
  "guests",
  "message",
] as const;

export type InquiryField = (typeof inquiryFields)[number];

export type InquiryState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<InquiryField, string>>;
      values?: Partial<Record<InquiryField, string>>;
    };
