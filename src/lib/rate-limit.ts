/**
 * Einfache Zugriffsbegrenzung im Arbeitsspeicher (pro Serverinstanz).
 * Reicht als Schutz gegen Formular-Spam einer kleinen Website; bei hohem
 * Aufkommen durch einen gemeinsamen Speicher (z. B. Redis/KV) ersetzen.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Speicher nicht unbegrenzt wachsen lassen.
  if (hits.size > 5000) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= windowMs)) hits.delete(entry);
    }
  }
  return false;
}
