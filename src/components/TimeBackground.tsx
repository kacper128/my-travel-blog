"use client";

import { useEffect } from "react";
import { useTimePeriod } from "@/hooks/useTimePeriod";

export default function TimeBackground() {
  const period = useTimePeriod();

  useEffect(() => {
    document.documentElement.setAttribute("data-time", period);
  }, [period]);

  return <div aria-hidden className="atmosphere" />;
}
