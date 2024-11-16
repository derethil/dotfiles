import { Variable } from "astal";

interface Time {
  day: string;
  month: string;
  year: string;
  hours: string;
  minutes: string;
}

export const Time = Variable<Time | null>(null).poll(
  1000,
  "date '+%d!%m!%Y!%I!%M'",
  (v) => {
    const [day, month, year, hours, minutes] = v.split("!");
    return { day, month, year, hours, minutes };
  },
);
