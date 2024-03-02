import { icons } from "lib/icons";
import { SelectIconMenu } from "widgets/SelectIconMenu";

const WINDOW_NAME = "dashboard";

export function TextEntry() {
  const active = Variable("applications");

  const entry = Widget.Entry({
    hexpand: true,
    on_accept: (self) => {
      Utils.notify("Searching " + self.text);
    },
    setup: (self) => {
      self.hook(App, (_, windowName, visible) => {
        if (windowName !== WINDOW_NAME || !visible) return;
        self.text = "";
        self.grab_focus();
      });
    },
  });

  active.connect("changed", () => {
    entry.grab_focus();
  });

  return Widget.Box({
    class_name: "text-entry",
    children: [
      SelectIconMenu({
        active,
        options: {
          Applications: icons.searches.applications,
          Clipboard: icons.searches.clipboard,
          Projects: icons.searches.projects,
        },
      }),
      Widget.Separator({ class_name: "vertical" }),
      entry,
    ],
  });
}
