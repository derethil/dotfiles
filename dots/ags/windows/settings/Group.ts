import { icons } from "lib/icons";
import { Row } from "./Row";

// FIX: Remove any type from Row
interface GroupProps<T> {
  title: string;
  rows?: ReturnType<typeof Row<any>>[];
}

export const Group = <T>(props: GroupProps<T>) => {
  const { title, rows = [] } = props;

  return Widget.Box({
    className: "group",
    vertical: true,
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            hpack: "start",
            vpack: "end",
            className: "group-title",
            label: title,
            setup: (w) => Utils.idle(() => w.visible = !!title),
          }),
          title
            ? Widget.Button({
              hexpand: true,
              hpack: "end",
              child: Widget.Icon(icons.ui.refresh),
              className: "group-reset",
              sensitive: Utils.merge(
                rows.map(({ attribute: { opt } }) =>
                  opt.bind().as((v) => v !== opt.initial)
                ),
                (...values) => values.some((b) => b),
              ),
              on_clicked: () =>
                rows.forEach((row) => row.attribute.opt.reset()),
            })
            : Widget.Box(),
        ],
      }),
      Widget.Box({
        vertical: true,
        children: rows,
      }),
    ],
  });
};
