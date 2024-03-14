import { icons } from "lib/icons";
import { StackStateType } from "lib/stackState";
import { icon } from "lib/utils";
import { Application } from "types/service/applications";

interface AppItemProps {
  app: Application;
  onClick?: () => void;
  searchState: StackStateType<Application | null>;
}

export function AppItem({ app, onClick, searchState }: AppItemProps) {
  const title = Widget.Label({
    class_name: "title",
    label: app.name,
    xalign: 0,
    truncate: "end",
  });

  const appIcon = Widget.Icon({
    class_name: "icon",
    icon: icon(app.icon_name, icons.fallback.executable),
  });

  return Widget.Button({
    className: "app-item",
    child: Widget.Box({
      hpack: "start",
      children: [appIcon, title],
    }),

    onPrimaryClick: () => {
      app.launch();
      onClick?.();
    },
    setup: (self) => {
      self.hook(searchState, () => {
        self.toggleClassName("active", searchState.value === app);
      });
    },
  });
}
