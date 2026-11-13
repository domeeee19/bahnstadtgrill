import nodemailer from "nodemailer";
import { business } from "@/content/business";
import { occasions } from "./inquiry";
import type { Inquiry } from "./inquiry-schema";

export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function formatDate(date?: string) {
  if (!date) return "–";
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

export async function sendInquiryMail(inquiry: Inquiry) {
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const occasion =
    occasions.find((entry) => entry.value === inquiry.occasion)?.label ?? inquiry.occasion;

  const lines = [
    `Neue Anfrage über die Website`,
    ``,
    `Anliegen:  ${occasion}`,
    `Name:      ${oneLine(inquiry.name)}`,
    `Telefon:   ${oneLine(inquiry.phone)}`,
    `E-Mail:    ${inquiry.email ?? "–"}`,
    `Datum:     ${formatDate(inquiry.date)}`,
    `Uhrzeit:   ${inquiry.time ? `${inquiry.time} Uhr` : "–"}`,
    `Personen:  ${inquiry.guests ?? "–"}`,
    ``,
    `Nachricht:`,
    inquiry.message ?? "–",
  ];

  await transport.sendMail({
    from: {
      name: `Website ${business.shortName}`,
      address: process.env.CONTACT_FROM ?? process.env.SMTP_USER!,
    },
    to: process.env.CONTACT_TO ?? business.email.address,
    replyTo: inquiry.email
      ? { name: oneLine(inquiry.name), address: inquiry.email }
      : undefined,
    subject: `Anfrage: ${occasion} – ${oneLine(inquiry.name)}`,
    text: lines.join("\n"),
  });
}
