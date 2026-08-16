"use client";

import { useEffect, useState } from "react";
import { getTimePeriod, type TimePeriod } from "@/lib/time-of-day";

export function useTimePeriod(): TimePeriod {
  const [period, setPeriod] = useState<TimePeriod>("day");

  useEffect(() => {
    const apply = () => setPeriod(getTimePeriod());
    apply();
    const id = window.setInterval(apply, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return period;
}
