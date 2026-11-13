import { business, type DayHours, type Weekday } from "@/content/business";

export type OpenStatus =
  | { state: "open"; closesAt: string; closingSoon: boolean }
  | { state: "closed"; opensAt: string; opensDay: "heute" | "morgen" | string };

const WEEKDAY_INDEX: Record<string, Weekday> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Wochentag und Minuten seit Mitternacht in der Zeitzone des Lokals. */
export function localTime(now: Date, timeZone: string = business.timeZone) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: hour * 60 + minute,
    clock: `${get("hour")}:${get("minute")}`,
  };
}

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function hoursFor(day: Weekday, hours: readonly DayHours[] = business.hours) {
  return hours.find((entry) => entry.day === day);
}

export function getOpenStatus(
  now: Date,
  hours: readonly DayHours[] = business.hours,
): OpenStatus | null {
  const { day, minutes } = localTime(now);
  const today = hoursFor(day, hours);

  if (today?.open && today.close) {
    const opens = toMinutes(today.open);
    const closes = toMinutes(today.close);
    if (minutes >= opens && minutes < closes) {
      return {
        state: "open",
        closesAt: today.close,
        closingSoon: closes - minutes <= 45,
      };
    }
    if (minutes < opens) {
      return { state: "closed", opensAt: today.open, opensDay: "heute" };
    }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const next = hoursFor(((day + offset) % 7) as Weekday, hours);
    if (next?.open) {
      return {
        state: "closed",
        opensAt: next.open,
        opensDay: offset === 1 ? "morgen" : next.label,
      };
    }
  }
  return null;
}

export function describeStatus(status: OpenStatus) {
  if (status.state === "open") {
    return status.closingSoon
      ? `Geöffnet – schließt um ${status.closesAt} Uhr`
      : `Jetzt geöffnet bis ${status.closesAt} Uhr`;
  }
  return `Geschlossen – öffnet ${status.opensDay} um ${status.opensAt} Uhr`;
}
