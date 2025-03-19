import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { CircleButton, Revealer } from "elements";
import { ArchUpdate } from "lib/archupdate";
import { options } from "options";
import { launchInTerminal } from "utils";

const FOOT_ARGS = "--title 'terminal-arch-update' arch-update -d";

export function PackageUpdates() {
  const updates = ArchUpdate.get_default();

  const reveal = Variable.derive([
    bind(updates, "available"),
    options.bar.updates.minPackages(),
  ])().as(([available, minimum]) => available >= minimum);

  return (
    <Revealer
      className="updates list-item"
      transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
      transitionDuration={options.theme.transition()}
      revealChild={reveal}
    >
      <CircleButton
        onClick={() => launchInTerminal(FOOT_ARGS)}
        tooltip={bind(updates, "available").as(
          (updates) => `${updates} available updates`,
        )}
      >
        <icon icon="package-down-symbolic" />
      </CircleButton>
    </Revealer>
  );
}
