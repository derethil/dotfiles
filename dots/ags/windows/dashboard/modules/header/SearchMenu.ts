const Applications = await Service.import("applications");

import Gtk from "gi://Gtk?version=3.0";
import { icons } from "lib/icons";
import { toTitleCase } from "lib/utils";
import { Variable as VariableType } from "types/variable";
import { SelectIconMenu } from "widgets/SelectIconMenu";
import { DashboardOverlays as Overlay } from "windows/dashboard/Dashboard";
import { AppItem } from "./AppItem";
import { Application } from "types/service/applications";
import Gdk from "gi://Gdk";
import { StackState, StackStateType } from "lib/stackState";

// Constants and helpers

const WINDOW_NAME = "dashboard";
const setOverlay = (child: Gtk.Widget) => (Overlay.value = [child]);

// Handlers

interface SearchFunctionsProps {
  searchState: StackStateType<Application | null>;
  onClick?: () => void;
}

type SearchHandlersType = Record<keyof typeof icons.searches, (query: string) => Gtk.Widget>;
const createSearchFns = (props: SearchFunctionsProps): SearchHandlersType => ({
  applications: (query) => {
    const results = Applications.query(query);

    props.searchState.setItems(results);
    props.searchState.setIndex(0);

    const items = results.map((app) =>
      AppItem({
        app,
        searchState: props.searchState,
        onClick: props?.onClick,
      }),
    );

    return Widget.Box({
      className: "overlay",
      vertical: true,
      children: items,
    });
  },
  clipboard: () => Widget.Box(),
  projects: () => Widget.Box(),
});

// Widget;

interface SearchTextEntryProps {
  active: VariableType<keyof typeof icons.searches>;
}

function SearchTextEntry(props: SearchTextEntryProps) {
  const resetOverlay = () => setOverlay(Widget.Box());
  const searchState = new StackState<Application | null>(null);

  const SearchHandlers = createSearchFns({
    searchState: searchState,
    onClick: () => {
      App.toggleWindow(WINDOW_NAME);
      resetOverlay();
    },
  });

  const entry = Widget.Entry({
    hexpand: true,
    onAccept: () => {
      if (searchState.items.length === 0) return;
      searchState.value?.launch();
      App.toggleWindow(WINDOW_NAME);
      resetOverlay();
    },
    onChange: (self) => {
      if (self.text === null) return;

      if (self.text === "") {
        resetOverlay();
        return;
      }

      // Get Overlay Results
      const overlay = SearchHandlers[props.active.value](self.text);

      // Position Overlay (I tried to use the allocation but it wasn't right. Magic numbers it is.)
      const { height } = self.get_allocation();
      const parent = self.get_parent()?.get_allocation();

      overlay.set_margin_top(height + 4 + options.theme.spacing.value * 1.333);
      overlay.set_margin_left((parent?.x ?? 0) - 15 - options.theme.spacing.value * 1.333);

      // Open Overlay
      setOverlay(overlay);
    },
    setup: (self) => {
      // Handle Opening Dashboard
      self.hook(App, (_, windowName, visible) => {
        if (windowName !== WINDOW_NAME || !visible) return;
        entry.text = "";
        entry.grab_focus();
        resetOverlay();
      });

      // Handle Changing Search Type
      props.active.connect("changed", () => {
        self.grab_focus();
        self.set_text("");
        resetOverlay();
      });

      // Handle Keyboard Navigation
      self.on("key-press-event", (_, event) => {
        if (searchState.items.length === 0) return;

        const keyval = event.get_keyval()[1];
        if (event.get_state()[1] !== Gdk.ModifierType.CONTROL_MASK) return;

        switch (keyval) {
          case Gdk.KEY_n:
          case Gdk.KEY_Tab:
            searchState.next();
            break;
          case Gdk.KEY_p:
            searchState.prev();
            break;
          case Gdk.KEY_0:
            searchState.setIndex(0);
            break;
        }
      });
    },
  });

  return entry;
}

export function SearchMenu() {
  const active = Variable<keyof typeof icons.searches>("applications");

  return Widget.Box({
    class_name: "text-entry",
    children: [
      SelectIconMenu({
        active: active as VariableType<string>,
        options: Object.entries(icons.searches).reduce(
          (acc, [label, icon]) => ({ ...acc, [toTitleCase(label)]: icon }),
          {} as Record<string, string>,
        ),
      }),
      Widget.Separator({ class_name: "vertical" }),
      SearchTextEntry({ active }),
    ],
  });
}
