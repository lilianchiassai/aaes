import { useEffect, useState } from "react";

export interface Countdown {
  days: string;
  hours: string;
  minutes: string;
}

const pad = (n: number) => (n < 10 ? "0" : "") + n;

function compute(target: number): Countdown {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return { days: String(days), hours: pad(hours), minutes: pad(minutes) };
}

/** Live d/h/m countdown to an ISO target (ticks every 30s, like the prototype). */
export function useCountdown(targetIso: string): Countdown {
  const target = new Date(targetIso).getTime();
  const [value, setValue] = useState<Countdown>(() => compute(target));

  useEffect(() => {
    // Initial value already comes from the lazy useState initializer; just tick.
    const id = setInterval(() => setValue(compute(target)), 30000);
    return () => clearInterval(id);
  }, [target]);

  return value;
}
