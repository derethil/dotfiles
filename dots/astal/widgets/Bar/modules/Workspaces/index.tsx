import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { bash } from "lib/util";
import { options } from "options";
import { WorkspaceIndicator } from "./WorkspaceIndicator";

function scroll(direction: "next" | "previous") {
  bash(`scrollworkspace ${direction}`).catch((err: unknown) =>
    console.error(`Failed to scroll workspace: ${String(err)}`),
  );
}

export function Workspaces() {
  const wsOptions = options.bar.workspaces;
  const hypr = Hyprland.get_default();

  const shown = Variable.derive(
    [bind(hypr, "workspaces"), wsOptions.dynamic, wsOptions.count],
    (workspaces, dynamic, count) => {
      const wIds = workspaces.map((ws) => ws.id);
      if (dynamic) return wIds;
      const showUpTo = Math.max(...wIds, count);
      return Array.from({ length: showUpTo }).map((_, i) => i + 1);
    },
  );

  const handleScroll = (direction: number) => {
    if (direction > 0) scroll("next");
    else scroll("previous");
  };

  return (
    <eventbox
      cursor="pointer"
      valign={Gtk.Align.CENTER}
      onDestroy={() => shown.drop()}
      className="workspaces"
      onScroll={(_, event) => handleScroll(event.delta_y)}
    >
      <box vertical>
        {shown((id) =>
          id
            .filter((id) => id >= 0)
            .sort((a, b) => a - b)
            .map((id) => <WorkspaceIndicator id={id} />),
        )}
      </box>
    </eventbox>
  );
}
