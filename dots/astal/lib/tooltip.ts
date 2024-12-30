import { Binding } from "astal";
import { Gtk } from "astal/gtk3";
import { toBinding } from "utils";

export function addTooltip(
  self: Gtk.Widget,
  tooltip: Binding<string> | string,
) {
  self.set_has_tooltip(true);
  self.connect("query-tooltip", (...[, , , , tooltipWidget]) => {
    toBinding(tooltip).subscribe((text) => {
      tooltipWidget.set_text(text);
    });
    return true;
  });
}
