import { Widget } from "astal/gtk3";
import { TextEntry } from "elements";
import { PulseState } from "../state";

export function Entry() {
  const state = PulseState.get_default();

  const handleQueryChange = (text: string) => {
    state.query.set(text);
    if (text.length === 0) {
      state.setEndWidget(null);
    } else {
      state.setEndWidget(new Widget.Box({ child: new Widget.Label({ label: "hi" }) }));
    }
  };

  return (
    <TextEntry
      expand
      canFocus
      placeholderText={'Type ":" to list subcommands'}
      text={state.query()}
      onChanged={(self) => handleQueryChange(self.get_text())}
      onActivate={(self) => console.log(self.get_text())}
      setup={(self) => self.grab_focus()}
    />
  );
}
