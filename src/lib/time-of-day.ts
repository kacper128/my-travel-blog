export type TimePeriod = "dawn" | "day" | "dusk" | "night";

export function getTimePeriod(date: Date = new Date()): TimePeriod {
  const hour = date.getHours();
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
}

export const TIME_PERIOD_LABEL: Record<TimePeriod, string> = {
  dawn: "Świt",
  day: "Dzień",
  dusk: "Zmierzch",
  night: "Noc",
};
