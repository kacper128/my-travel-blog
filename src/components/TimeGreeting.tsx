"use client";

import { useEffect, useState } from "react";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { useTimePeriod } from "@/hooks/useTimePeriod";
import { TIME_PERIOD_LABEL } from "@/lib/time-of-day";

const PERIOD_ICON = {
  dawn: Sunrise,
  day: Sun,
  dusk: Sunset,
  night: Moon,
};

export default function TimeGreeting() {
  const period = useTimePeriod();
  const [time, setTime] = useState<string | null>(null);
  const Icon = PERIOD_ICON[period];

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("pl-PL", { hour: "numeric", minute: "2-digit" }));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
      <Icon className="h-4 w-4" />
      {TIME_PERIOD_LABEL[period]}
      {time && <span className="opacity-70">· {time}</span>}
    </span>
  );
}
