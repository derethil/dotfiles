import { icons } from "lib/icons";
import { StackStateType } from "lib/stackState";
import { icon } from "lib/utils";

interface SearchItemProps<T> {
  onClick: () => void;
  searchState: StackStateType<T>;
  icon?: string | null;
  label: string;
  formatLabel?: (label: string) => string;
  selector?: (state: StackStateType<T>) => string;
}

export function SearchItem<T>(props: SearchItemProps<T>) {
  const title = Widget.Label({
    class_name: "title",
    label: props.formatLabel ? props.formatLabel(props.label) : props.label,
    xalign: 0,
    truncate: "end",
  });

  const iconWidget = props.icon
    ? Widget.Icon({
      class_name: "icon",
      icon: icon(props.icon, icons.fallback.executable),
    })
    : null;

  return Widget.Button({
    className: "app-item",
    child: Widget.Box({
      hpack: "start",
      children: iconWidget ? [iconWidget, title] : [title],
    }),
    onPrimaryClick: () => props.onClick(),
    setup: (self) => {
      self.hook(props.searchState, () => {
        self.toggleClassName(
          "active",
          typeof props.searchState.value === "string"
            ? props.label === props.searchState.value
            // @ts-ignore
            : props.selector(props.searchState) === props.label,
        );
      });
    },
  });
}
