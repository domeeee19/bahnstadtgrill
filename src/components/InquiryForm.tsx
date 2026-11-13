"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { Check, CircleAlert, LoaderCircle, Phone } from "lucide-react";
import { submitInquiry } from "@/app/kontakt/actions";
import { buttonClasses } from "@/components/ui/Button";
import { business } from "@/content/business";
import { occasions, type InquiryField, type InquiryState } from "@/lib/inquiry";

const initialState: InquiryState = { status: "idle" };

const inputClass =
  "mt-2 block w-full min-h-12 rounded-control border-[1.5px] border-ink/40 bg-stripe px-3.5 py-2.5 text-base text-ink transition-colors duration-150 placeholder:text-ink-muted hover:border-ink focus:border-blue focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 aria-invalid:border-closed";

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Zeitstempel erst im Browser setzen (Spam-Schutz, keine Server-Abweichung).
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [state]);

  // Rückmeldung nach dem Absenden in den Fokus holen.
  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus({ preventScroll: true });
    statusRef.current?.scrollIntoView({ block: "center" });
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-panel border border-open/40 bg-stripe p-6 focus:outline-none sm:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-open text-stripe">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="display-3 mt-6">Danke, Ihre Anfrage ist angekommen</h3>
        <p className="mt-3 max-w-lg text-ink-soft">
          Wir melden uns so bald wie möglich bei Ihnen. Bitte beachten Sie: Erst
          mit unserer Rückmeldung ist Ihr Platz bestätigt. Wenn es eilt, rufen
          Sie uns einfach an.
        </p>
        <a href={business.phone.href} className={buttonClasses("outline", "mt-6")}>
          <Phone className="size-[1.125rem]" aria-hidden="true" />
          <span>{business.phone.display}</span>
        </a>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  const field = (name: InquiryField) => ({
    id: `anfrage-${name}`,
    name,
    defaultValue: values[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `anfrage-${name}-fehler` : undefined,
  });

  const errorText = (name: InquiryField) =>
    errors[name] ? (
      <p id={`anfrage-${name}-fehler`} className="mt-1.5 text-[0.9375rem] font-medium text-closed">
        {errors[name]}
      </p>
    ) : null;

  const label = "block font-semibold";
  const optional = <span className="font-normal text-ink-muted"> (optional)</span>;

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-panel border border-line bg-paper-raised p-6 sm:p-10"
    >
      {state.status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 flex gap-3 rounded-card border border-closed/40 bg-stripe p-4 font-medium text-closed focus:outline-none"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>{state.message}</p>
        </div>
      )}

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="anfrage-name" className={label}>
            Name
          </label>
          <input {...field("name")} type="text" autoComplete="name" required className={inputClass} />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor="anfrage-phone" className={label}>
            Telefon
          </label>
          <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" required className={inputClass} />
          {errorText("phone")}
        </div>

        <div>
          <label htmlFor="anfrage-email" className={label}>
            E-Mail{optional}
          </label>
          <input {...field("email")} type="email" autoComplete="email" className={inputClass} />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor="anfrage-occasion" className={label}>
            Anliegen
          </label>
          <select
            {...field("occasion")}
            defaultValue={values.occasion || occasions[0].value}
            required
            className={inputClass}
          >
            {occasions.map((occasion) => (
              <option key={occasion.value} value={occasion.value}>
                {occasion.label}
              </option>
            ))}
          </select>
          {errorText("occasion")}
        </div>

        <div className="grid grid-cols-2 items-end gap-x-4 gap-y-6 sm:col-span-2 sm:grid-cols-3 sm:gap-x-6">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="anfrage-date" className={label}>
              Datum{optional}
            </label>
            <input {...field("date")} type="date" className={inputClass} />
            {errorText("date")}
          </div>
          <div>
            <label htmlFor="anfrage-time" className={label}>
              Uhrzeit{optional}
            </label>
            <input {...field("time")} type="time" min="11:30" max="21:00" step={900} className={inputClass} />
            {errorText("time")}
          </div>
          <div>
            <label htmlFor="anfrage-guests" className={label}>
              Personen{optional}
            </label>
            <input {...field("guests")} type="number" min={1} max={200} inputMode="numeric" className={inputClass} />
            {errorText("guests")}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="anfrage-message" className={label}>
            Nachricht{optional}
          </label>
          <textarea
            {...field("message")}
            rows={4}
            maxLength={1500}
            className={`${inputClass} resize-y`}
          />
          {errorText("message")}
        </div>
      </div>

      {/* Honeypot gegen Spam: für Menschen unsichtbar und nicht fokussierbar. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="anfrage-website">Website (bitte leer lassen)</label>
        <input id="anfrage-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <p className="mt-6 text-[0.9375rem] text-ink-soft">
        Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten. Näheres
        steht in der{" "}
        <Link href="/datenschutz#anfrageformular" className="text-link">
          Datenschutzerklärung
        </Link>
        . Sonntag ist Ruhetag.
      </p>

      <button type="submit" disabled={pending} className={buttonClasses("primary", "mt-6 w-full sm:w-auto")}>
        {pending && <LoaderCircle className="size-[1.125rem] animate-spin" aria-hidden="true" />}
        <span>{pending ? "Wird gesendet …" : "Anfrage senden"}</span>
      </button>
    </form>
  );
}
