import { icons } from "lib/icons";
import { Opt } from "lib/option";
import { Setter } from "./Setter";

export type RowProps<T> = {
  opt: Opt<T>;
  title: string;
  note?: string;
  type?:
    | "number"
    | "color"
    | "float"
    | "object"
    | "string"
    | "enum"
    | "boolean"
    | "img"
    | "font";
  enums?: string[];
  max?: number;
  min?: number;
};

export const Row = <T>(props: RowProps<T>) => {
  return Widget.Box({
    attribute: { opt: props.opt },
    className: "row",
    tooltipText: props.note ? `Note: ${props.note}` : "",
    children: [
      Widget.Box({
        vertical: true,
        vpack: "center",
        children: [
          Widget.Label({
            xalign: 0,
            className: "row-title",
            label: props.title,
          }),
          Widget.Label({
            xalign: 0,
            className: "id",
            label: props.opt.id,
          }),
        ],
      }),
      Widget.Box({ hexpand: true }),
      Widget.Box({ vpack: "center", child: Setter(props) as any }),
      Widget.Button({
        vpack: "center",
        className: "reset",
        child: Widget.Icon(icons.ui.refresh),
        onClicked: () => props.opt.reset(),
        sensitive: props.opt.bind().as((v) => v !== props.opt.initial),
      }),
    ],
  });
};
