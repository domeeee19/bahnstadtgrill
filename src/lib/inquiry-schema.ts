import { z } from "zod";
import { occasions, type InquiryField } from "./inquiry";

const occasionValues = occasions.map((o) => o.value) as [string, ...string[]];

const optional = (schema: z.ZodString) =>
  z.preprocess((value) => (value === "" ? undefined : value), schema.optional());

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Namen an.")
    .max(80, "Der Name ist zu lang."),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte geben Sie eine Telefonnummer für Rückfragen an.")
    .max(30, "Die Telefonnummer ist zu lang.")
    .regex(/^[0-9+()/\s-]+$/, "Bitte nur Ziffern, Leerzeichen und + - / ( ) verwenden."),
  email: optional(
    z
      .string()
      .trim()
      .max(120, "Die E-Mail-Adresse ist zu lang.")
      .email("Bitte prüfen Sie die E-Mail-Adresse."),
  ),
  occasion: z.enum(occasionValues, "Bitte wählen Sie ein Anliegen."),
  date: optional(
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte wählen Sie ein gültiges Datum."),
  ),
  time: optional(
    z.string().regex(/^\d{2}:\d{2}$/, "Bitte wählen Sie eine gültige Uhrzeit."),
  ),
  guests: z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : Number(value)),
    z
      .number("Bitte geben Sie eine Zahl an.")
      .int("Bitte geben Sie eine ganze Zahl an.")
      .min(1, "Mindestens eine Person.")
      .max(200, "Für so große Gruppen rufen Sie uns bitte an.")
      .optional(),
  ),
  message: optional(
    z.string().trim().max(1500, "Die Nachricht ist zu lang (maximal 1.500 Zeichen)."),
  ),
} satisfies Record<InquiryField, z.ZodType>);

export type Inquiry = z.infer<typeof inquirySchema>;
