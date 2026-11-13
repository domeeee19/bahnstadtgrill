import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/faq";

/** Aufklappbare Fragen – funktioniert ohne JavaScript (<details>). */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="faq group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-5 text-lg font-semibold transition-colors duration-150 hover:text-blue">
            <span>{item.question}</span>
            <Plus
              className="faq-icon mt-1 size-5 shrink-0 text-blue transition-transform duration-200 ease-out"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-2xl pb-6 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
