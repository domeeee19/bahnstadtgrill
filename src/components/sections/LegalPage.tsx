import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";

export function LegalPage({
  path,
  title,
  intro,
  children,
}: {
  path: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero path={path} breadcrumb={title} title={title}>
        {intro ? <p>{intro}</p> : null}
      </PageHero>
      <Container className="py-16 lg:py-24">
        <div className="legal max-w-3xl">{children}</div>
      </Container>
    </>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 className="display-3">{title}</h2>
      <div className="prose-site mt-4 text-ink-soft">{children}</div>
    </section>
  );
}
