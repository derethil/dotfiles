import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import { Revealer } from "elements";
import { ArchUpdate } from "lib/archupdate";
import { options } from "options";
import { launchInTerminal } from "utils";
import { CircleButton } from "../elements";

const FOOT_ARGS = "--title 'terminal-arch-update' arch-update -d";

export function PackageUpdates() {
  const updates = ArchUpdate.get_default();

  return (
    <box className="updates">
      <Revealer
        transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
        transitionDuration={options.theme.transition()}
        revealChild={bind(updates, "available").as(
          (available) => available > 0,
        )}
      >
        <CircleButton
          onClick={() => launchInTerminal(FOOT_ARGS)}
          tooltip={bind(updates, "available").as(
            (updates) => `${updates} aviailable updates`,
          )}
        >
          <icon icon="package-down-symbolic" />
        </CircleButton>
      </Revealer>
    </box>
  );
}
