import Clock from "../../misc/Clock.js";
import PanelButton from "../PanelButton.js";
import FontIcon from "../../misc/FontIcon.js";
import icons from "../../icons.js";

/** @param {boolean} ampm */
export default (ampm) =>
  PanelButton({
    class_name: "clock",
    color: "yellow",
    content: Clock({ format: `%I\n%M${ampm ? "\n%p" : ""}` }),
    icon: FontIcon({ icon: icons.clock }),
  });
