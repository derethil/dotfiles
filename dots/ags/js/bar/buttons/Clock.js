import App from "resource:///com/github/Aylur/ags/app.js";
import Clock from "../../misc/Clock.js";
import PanelButton from "../PanelButton.js";

export default ({ format = "%I\n%M\n%p" } = {}) =>
  PanelButton({
    class_name: "clock",
    content: Clock({ format }),
  });
