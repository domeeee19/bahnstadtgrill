import Link from "next/link";
import type { ReactNode } from "react";
import { AwningStripe } from "@/components/brand/Awning";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Plate } from "@/components/ui/Plate";
import { breadcrumbSchema } from "@/lib/seo";

/** Kopfbereich der Unterseiten: Streifenband, Brotkrumen, Titel, Einleitung. */
export function PageHero({
  path,
  breadcrumb,
  plate,
  plateNumber,
  title,
  children,
  actions,
}: {
  path: string;
  breadcrumb: string;
  plate?: string;
  plateNumber?: number;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-paper-raised">
      <AwningStripe />
      <Container className="pb-14 pt-8 lg:pb-20 lg:pt-10">
        <nav aria-label="Brotkrumen" className="text-[0.9375rem] text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline-offset-4 hover:text-ink hover:underline">
                Startseite
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {breadcrumb}
            </li>
          </ol>
        </nav>

        <div className="enter mt-10 max-w-4xl lg:mt-14">
          {plate && <Plate number={plateNumber} label={plate} />}
          <h1 className={`display-1 ${plate ? "mt-5" : ""}`}>{title}</h1>
          {children && <div className="lead mt-6 max-w-2xl text-ink-soft">{children}</div>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </Container>
      <JsonLd data={breadcrumbSchema([{ name: breadcrumb, path }])} />
    </header>
  );
}
