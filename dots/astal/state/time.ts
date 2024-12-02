import { Variable } from "astal";

interface Time {
  day: string;
  month: string;
  year: string;
  hours: string;
  minutes: string;
  abbrWeekday: string;
}

export const Time = Variable<Time | null>(null).poll(1000, "date '+%d!%m!%Y!%I!%M!%a'", (v) => {
  const [day, month, year, hours, minutes, abbrWeekday] = v.split("!");
  return { day, month, year, hours, minutes, abbrWeekday };
});
