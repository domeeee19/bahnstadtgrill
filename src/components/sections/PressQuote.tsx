import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Plate } from "@/components/ui/Plate";
import { press } from "@/content/business";

/** Zitat aus dem Gastrotipp des Stadtmarketings – mit Quelle und Link. */
export function PressQuote() {
  return (
    <section className="on-blue bg-blue py-20 text-stripe lg:py-28">
      <Container>
        <Plate label={`Gastrotipp · ${press.source}`} tone="blue" />
        <figure className="reveal mt-8 max-w-5xl">
          <blockquote
            cite={press.url}
            className="font-serif text-[clamp(2.25rem,1.3rem+4.2vw,4.75rem)] font-[420] leading-[1.05] tracking-[-0.015em]"
          >
            <p>„{press.quote}“</p>
          </blockquote>
          <figcaption className="mt-8 grid gap-6 border-t border-stripe/25 pt-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
            <p className="font-semibold">
              {press.quoteBy}
              <span className="block font-normal text-stripe/80">
                zitiert in „{press.source}“, dem Gastro-Guide von {press.publisher}
              </span>
            </p>
            <div className="text-stripe/90">
              <p>
                Der Tester gibt ihr recht: „{press.excerpt}“ Und die Teigtasche?
                Die hebt man sich am besten bis zum Schluss auf.
              </p>
              <a
                href={press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
              >
                Den ganzen Gastrotipp lesen
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
