import { bind, Variable } from "astal";
import { Gtk, Widget } from "astal/gtk3";
import { EntryProps } from "astal/gtk3/widget";
import { animate } from "lib/animate";

interface Props extends EntryProps {
  placeholderTransitionDuration?: number;
}

export function TextEntry({ setup, ...props }: Props) {
  const placeholderOpacity = Variable(0);

  const handleAnimatePlaceholder = (self: Gtk.Label) => {
    self.opacity = placeholderOpacity.get();
    placeholderOpacity.subscribe((value) => {
      animate(self, "opacity", value, {
        duration: props.placeholderTransitionDuration ?? 75,
      });
    });
  };

  const handleKeyPress = (self: Gtk.Entry) => {
    const get = () => (self.get_text().length === 0 ? 1 : 0);
    placeholderOpacity.set(get());
    self.connect("notify::text", () => placeholderOpacity.set(get()));
  };

  const entry = new Widget.Entry({
    ...props,
    setup: (self) => {
      setup?.(self);
      handleKeyPress(self);
    },
  });

  return (
    <box className="entry-wrapper">
      <overlay
        passThrough
        onDestroy={() => placeholderOpacity.drop()}
        overlay={
          <label
            className="placeholder"
            halign={Gtk.Align.START}
            label={props.placeholderText}
            setup={(self) => self.connect("realize", handleAnimatePlaceholder)}
          />
        }
      >
        {entry}
      </overlay>
      <revealer
        revealChild={bind(entry, "text").as((text) => text.length > 0)}
        transitionDuration={400}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <button onClick={() => entry.set_text("")} cursor="pointer" focusOnClick={false}>
          <icon icon="edit-clear-symbolic" />
        </button>
      </revealer>
    </box>
  );
}
