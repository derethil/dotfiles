import Gtk from "gi://Gtk";
import { subclass } from "resource:///com/github/Aylur/ags/widget.js";
import { register } from "resource:///com/github/Aylur/ags/widgets/widget.js";
import AgsLabel from "resource:///com/github/Aylur/ags/widgets/label.js";

type FontIconProps =
  | (import("types/widgets/label").Props & {
      icon: string;
    })
  | undefined;

class FontIcon extends AgsLabel<any> {
  static {
    register(this);
  }

  constructor(params: FontIconProps) {
    const { icon = "", ...rest } = params || {};

    super(rest as Exclude<FontIconProps, "icon">);
    this.toggleClassName("font-icon");

    if (typeof params === "object") this.icon = icon;

    if (typeof params === "string") this.icon = params;

    // Default to centering the icon
    // @ts-ignore
    this.hpack = rest.hpack || "center";
    // @ts-ignore
    this.vpack = rest.vpack || "center";
  }

  get icon() {
    return this.label;
  }
  set icon(icon) {
    this.label = icon;
  }

  get size() {
    return this.get_style_context().get_property(
      "font-size",
      Gtk.StateFlags.NORMAL
    );
  }

  vfunc_get_preferred_height(): [number, number] {
    return [this.size, this.size];
  }

  vfunc_get_preferred_width(): [number, number] {
    return [this.size, this.size];
  }
}

export default subclass<typeof FontIcon, FontIconProps>(FontIcon);
