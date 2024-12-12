import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { EntryProps } from "astal/gtk3/widget";

export function TextEntry({ setup, ...props }: EntryProps) {
  const showPlaceholder = Variable(false);

  return (
    <overlay
      passThrough
      onDestroy={() => showPlaceholder.drop()}
      overlay={
        <label
          className="placeholder"
          halign={Gtk.Align.START}
          label={props.placeholderText}
          visible={showPlaceholder()}
        />
      }
    >
      <entry
        {...props}
        setup={(self) => {
          setup?.(self);
          showPlaceholder.set(self.get_text().length === 0);
          self.connect("notify::text", () => {
            showPlaceholder.set(self.get_text().length === 0);
          });
        }}
      ></entry>
    </overlay>
  );
}
