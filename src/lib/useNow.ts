"use client";

import { useSyncExternalStore } from "react";

const TICK = 30_000;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, TICK);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
}

const getSnapshot = () => Math.floor(Date.now() / TICK);
const getServerSnapshot = () => null;

/**
 * Aktuelle Zeit, alle 30 Sekunden aktualisiert.
 * Auf dem Server und beim ersten Rendern `null` – so bleibt die Seite
 * statisch und es gibt keine Abweichung zwischen Server und Browser.
 */
export function useNow(): Date | null {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return tick === null ? null : new Date(tick * TICK);
}
