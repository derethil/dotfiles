import { icons } from "lib/icons";
import { Variable as VariableType } from "types/variable";
import { SelectIconMenu } from "widgets/SelectIconMenu";
import { DashboardOverlay } from "windows/dashboard/Dashboard";
import Gdk from "gi://Gdk";
import { ApplicationSearch, ProjectsSearch, type Search } from "./Search";
import { StackState, StackStateType } from "lib/stackState";

// Constants and helpers

export const WINDOW_NAME = "dashboard";

// Widget;

interface SearchTextEntryProps {
  active: StackStateType<string>;
}

type Handlers = Record<string, Search>;

function SearchTextEntry(props: SearchTextEntryProps) {
  const searchers: Handlers = {
    Applications: new ApplicationSearch(),
    Projects: new ProjectsSearch(),
  };

  const entry = Widget.Entry({
    hexpand: true,
    onAccept: () => {
      searchers[props.active.value].onAccept();
      App.toggleWindow(WINDOW_NAME);
      DashboardOverlay.resetOverlay();
    },
    onChange: (self) => {
      if (self.text === null) return;

      if (self.text === "") {
        DashboardOverlay.resetOverlay();
        return;
      }

      const overlay = searchers[props.active.value].handleChange(self.text);

      // Position Overlay (I tried to use the allocation but it wasn't right. Magic numbers it is.)
      const { height } = self.get_allocation();
      const parent = self.get_parent()?.get_allocation();

      overlay.set_margin_top(height + 4 + options.theme.spacing.value * 1.333);
      overlay.set_margin_left((parent?.x ?? 0) - 15 - options.theme.spacing.value * 1.333);

      // Open Overlay
      DashboardOverlay.setOverlay(overlay);
    },
    setup: (self) => {
      // Handle Opening Dashboard
      self.hook(App, (_, windowName, visible) => {
        if (windowName !== WINDOW_NAME || !visible) return;
        entry.text = "";
        entry.grab_focus();
        DashboardOverlay.resetOverlay();
      });

      // Handle Changing Search Type
      props.active.connect("changed", () => {
        self.grab_focus();
        self.set_text("");
        DashboardOverlay.resetOverlay();
      });

      // Handle Keyboard Navigation
      self.on("key-press-event", (_, event: Gdk.Event) => {
        const keyval = event.get_keyval()[1];
        const state = event.get_state()[1];
        if (state !== Gdk.ModifierType.CONTROL_MASK) return; // Only handle control key events
        if (keyval === Gdk.KEY_space) {
          props.active.next();
        }
        searchers[props.active.value].handleKeyVal(keyval);
      });
    },
  });

  return entry;
}

export function SearchMenu() {
  const active = new StackState(["Applications", "Projects"]);

  return Widget.Box({
    class_name: "text-entry",
    children: [
      SelectIconMenu({
        active: active as VariableType<string>,
        options: {
          Applications: icons.searches.applications,
          Clipboard: icons.searches.clipboard,
          Projects: icons.searches.projects,
        },
      }),
      Widget.Separator({ class_name: "vertical" }),
      SearchTextEntry({ active }),
    ],
  });
}
