/**
 * Sichtbar markierter Platzhalter für Pflichtangaben, die noch fehlen.
 * Vor der Veröffentlichung dürfen keine Platzhalter mehr auf der Seite stehen.
 */
export function Placeholder({ children }: { children: string }) {
  return (
    <mark className="rounded-[4px] bg-mark px-1.5 py-0.5 font-medium text-ink">
      [Bitte ergänzen: {children}]
    </mark>
  );
}
