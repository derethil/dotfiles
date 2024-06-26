import GLib from "types/@girs/glib-2.0/glib-2.0";
import { PopupWindow, PopupWindowProps } from "windows/PopupWindow";
import { NavHeader } from "./NavHeader";

const Location = (): NonNullable<PopupWindowProps["layout"]> => {
  const getClockPosition = () => {
    if (options.bar.layout.start.value.includes("clock")) return "top";
    // TODO: Build PopupWindow for center-left and center-right
    if (options.bar.layout.start.value.includes("clock")) return "bottom";
    return "bottom";
  };

  const clockPosition = getClockPosition();
  return `${clockPosition}-${options.bar.position.value}`;
};

export function Calendar() {
  const Calendar = Widget.Calendar({
    showDetails: false,
    showHeading: false,
    sensitive: false,
  });

  const Date = Variable(GLib.DateTime.new_now_local(), {
    poll: [1000, () => {
      const newDate = GLib.DateTime.new_now_local();
      Calendar.select_day(newDate.get_day_of_month());
      Calendar.select_month(newDate.get_month(), newDate.get_year());
      return newDate;
    }],
  });

  const shiftDate = (newDate: GLib.DateTime) => {
    Date.stopPoll();
    Date.value = newDate;
    Calendar.select_month(Date.value.get_month(), Date.value.get_year());

    const dayOfMonth = Date.value.get_day_of_month();
    Date.value = Date.value.add_days(-dayOfMonth + 1) ?? Date.value;
    Calendar.select_day(Date.value.get_day_of_month());
  };

  const shiftMonth = (shift: number) =>
    shiftDate(Date.value.add_months(shift) ?? Date.value);

  const shiftYear = (shift: number) =>
    shiftDate(Date.value.add_years(shift) ?? Date.value);

  const location = Location();

  return PopupWindow({
    transition: location.endsWith("left") ? "slide_right" : "slide_left",
    exclusivity: "exclusive",
    layout: location,
    name: "calendar",
    onClose: () => {
      Utils.timeout(options.transition.value, () => {
        Date.value = GLib.DateTime.new_now_local();
        Date.startPoll();
      });
    },
    child: Widget.Box({
      className: "container",
      vertical: true,
      children: [
        Widget.Box({
          className: "header",
          vertical: true,
          children: [
            NavHeader({
              className: "month",
              date: Date,
              format: "%B",
              handlePrev: () => shiftMonth(-1),
              handleNext: () => shiftMonth(1),
            }),
            NavHeader({
              className: "year",
              date: Date,
              format: "%Y",
              handlePrev: () => shiftYear(-1),
              handleNext: () => shiftYear(1),
            }),
          ],
        }),
        Calendar,
      ],
    }),
  });
}
