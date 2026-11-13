"use server";

import { headers } from "next/headers";
import { business } from "@/content/business";
import { inquiryFields, type InquiryField, type InquiryState } from "@/lib/inquiry";
import { inquirySchema } from "@/lib/inquiry-schema";
import { mailConfigured, sendInquiryMail } from "@/lib/mail";
import { isRateLimited } from "@/lib/rate-limit";

const callUs = `Bitte rufen Sie uns an: ${business.phone.display}.`;

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const raw = Object.fromEntries(
    inquiryFields.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  ) as Record<InquiryField, string>;

  // Honeypot: Dieses Feld sehen nur Bots. Erfolg vortäuschen, nichts senden.
  if (formData.get("website")) {
    return { status: "success" };
  }

  // Formulare, die in unter drei Sekunden abgeschickt werden, sind Bots.
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 3000) {
    return {
      status: "error",
      message: "Das ging sehr schnell. Bitte senden Sie die Anfrage noch einmal ab.",
      values: raw,
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: `Sie haben gerade mehrere Anfragen gesendet. ${callUs}`,
      values: raw,
    };
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<InquiryField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as InquiryField | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return {
      status: "error",
      message: "Bitte prüfen Sie die markierten Felder.",
      fieldErrors,
      values: raw,
    };
  }

  if (!mailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      // Lokale Entwicklung ohne Mailserver: Anfrage im Terminal ausgeben.
      console.info("[Anfrage – kein SMTP konfiguriert]", parsed.data);
      return { status: "success" };
    }
    console.error("Anfrageformular: SMTP ist nicht konfiguriert.");
    return {
      status: "error",
      message: `Das Formular ist im Moment nicht erreichbar. ${callUs}`,
      values: raw,
    };
  }

  try {
    await sendInquiryMail(parsed.data);
    return { status: "success" };
  } catch (error) {
    console.error("Anfrageformular: Versand fehlgeschlagen.", error);
    return {
      status: "error",
      message: `Ihre Anfrage konnte nicht gesendet werden. ${callUs}`,
      values: raw,
    };
  }
}
