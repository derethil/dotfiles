import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { TextEntry } from "elements";

interface Props {
  query: Variable<string>;
  handleQueryChange: (text: string) => void;
}

export function Entry(props: Props) {
  const handleClear = () => {
    props.handleQueryChange("");
  };

  return (
    <box className="entry-wrapper">
      <TextEntry
        expand
        canFocus
        placeholderText={'Type ":" to list subcommands'}
        text={props.query()}
        onChanged={(self) => props.handleQueryChange(self.get_text())}
        onActivate={(self) => console.log(self.get_text())}
        setup={(self) => self.grab_focus()}
      />
      <revealer
        revealChild={props.query((text) => text.length > 0)}
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
