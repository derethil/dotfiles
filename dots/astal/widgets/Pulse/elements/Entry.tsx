import { Gtk, Widget } from "astal/gtk3";
import { TextEntry } from "elements";
import { PulseState } from "../state";

export function Entry() {
  const state = PulseState.get_default();
  const handleClear = () => handleQueryChange("");

  const handleQueryChange = (text: string) => {
    state.query.set(text);
    if (text.length === 0) {
      state.setEndWidget(null);
    } else {
      state.setEndWidget(new Widget.Box({ child: new Widget.Label({ label: "hi" }) }));
    }
  };

  return (
    <box className="entry-wrapper">
      <TextEntry
        expand
        canFocus
        placeholderText={'Type ":" to list subcommands'}
        text={state.query()}
        onChanged={(self) => handleQueryChange(self.get_text())}
        onActivate={(self) => console.log(self.get_text())}
        setup={(self) => self.grab_focus()}
      />
      <revealer
        revealChild={state.query((text) => text.length > 0)}
        transitionDuration={400}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <button onClick={() => handleClear()} cursor="pointer" focusOnClick={false}>
          <icon icon="edit-clear-symbolic" />
        </button>
      </revealer>
    </box>
  );
}
