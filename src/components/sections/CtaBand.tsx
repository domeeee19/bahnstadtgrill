import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { business } from "@/content/business";

/** Abschluss jeder Seite: ein klarer nächster Schritt. */
export function CtaBand({
  title = "Hunger? Rufen Sie an",
  children,
  secondary,
}: {
  title?: string;
  children?: ReactNode;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="on-blue bg-blue py-16 text-stripe lg:py-20">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="display-2">{title}</h2>
          <div className="lead mt-5 text-stripe/90">
            {children ?? (
              <p>
                Bestellen Sie telefonisch vor und holen Sie Ihr Essen ab – oder
                kommen Sie einfach vorbei. {business.hoursSummary}.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={business.phone.href}
            variant="chalk"
            icon={<Phone className="size-[1.125rem]" aria-hidden="true" />}
          >
            {business.phone.display}
          </ButtonLink>
          {business.links.onlineOrder && (
            <ButtonLink href={business.links.onlineOrder} variant="outline-chalk">
              Online bestellen
            </ButtonLink>
          )}
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline-chalk">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
