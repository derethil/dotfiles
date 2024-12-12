import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import { EntryProps } from "astal/gtk3/widget";
import { animate } from "lib/animate";

interface Props extends EntryProps {
  placeholderTransitionDuration?: number;
}

export function TextEntry({ setup, ...props }: Props) {
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
          setup={(self) => {
            showPlaceholder.subscribe((value) => {
              const to = value ? 1 : 0;
              animate(self, "opacity", to, {
                duration: props.placeholderTransitionDuration ?? 75,
              });
            });
          }}
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
