import { icons } from "lib/icons";
import { DockButton } from "../DockButton";
import { bash } from "lib/utils";

type Mode = "output" | "window" | "region";

export function Screenshots() {
  const shouldSave = Variable(false);

  const takeScreenshot = (mode: Mode) => {
    let cmd =
      `/usr/bin/hyprshot -m ${mode} -o ${options.docks.screenshotFolder.value}`;
    if (!shouldSave.value) cmd += " --clipboard-only";
    bash(cmd);
  };

  return Widget.Box({
    className: "screenshot-dock tool",
    vpack: "center",
    children: [
      DockButton({
        icon: icons.screenshots.fullscreen,
        tooltip: "Fullscreen",
        handlePrimaryClick: () => takeScreenshot("output"),
      }),
      DockButton({
        icon: icons.screenshots.window,
        tooltip: "Window",
        handlePrimaryClick: () => takeScreenshot("window"),
      }),
      DockButton({
        icon: icons.screenshots.area,
        tooltip: "Region",
        handlePrimaryClick: () => takeScreenshot("region"),
      }),
      Widget.Separator({
        vpack: "center",
        hpack: "center",
        className: "vertical",
      }),
      Widget.Box({
        className: "save-option dock-module",
        children: [
          Widget.Switch({
            state: shouldSave.value,
            onActivate: () => shouldSave.value = !shouldSave.value,
            tooltipText: "Save to Disk",
          }),
          Widget.Icon({
            size: options.docks.iconSize.bind().as((v) => v * 0.75),
            icon: icons.ui.save,
          }),
        ],
      }),
    ],
  });
}
