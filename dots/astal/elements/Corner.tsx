import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Cairo from "cairo";
import { options } from "options";

interface Props {
  location: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function Corner(props: Props) {
  const isTop = props.location.includes("top");
  const isLeft = props.location.includes("left");
  const isRight = !isLeft;
  const isBottom = !isTop;

  const drawCornerShape = (context: Cairo.Context, radius: number) => {
    switch (props.location) {
      case "top-left":
        context.arc(radius, radius, radius, Math.PI, (3 * Math.PI) / 2);
        context.lineTo(0, 0);
        break;
      case "top-right":
        context.arc(0, radius, radius, (3 * Math.PI) / 2, 2 * Math.PI);
        context.lineTo(radius, 0);
        break;
      case "bottom-left":
        context.arc(radius, 0, radius, Math.PI / 2, Math.PI);
        context.lineTo(0, radius);
        break;
      case "bottom-right":
        context.arc(0, 0, radius, 0, Math.PI / 2);
        context.lineTo(radius, radius);
        break;
    }
  };

  return (
    <box
      halign={isLeft ? Gtk.Align.START : Gtk.Align.END}
      valign={isTop ? Gtk.Align.START : Gtk.Align.END}
      css={`
        padding: 1px;
        margin: ${isTop ? "-1px" : "0"} ${isRight ? "-1px" : "0"}
          ${isBottom ? "-1px" : "0"} ${isLeft ? "-1px" : "0"};
      `}
    >
      {Variable.derive(
        [options.corners.radius, options.corners.color],
        (radius, color) => {
          return (
            <drawingarea
              css={`
                border-radius: ${radius}px;
                background-color: ${color};
              `}
              setup={(self) => {
                const style = self.get_style_context();

                const getRadius = () =>
                  style.get_property("border-radius", Gtk.StateFlags.NORMAL) as number;

                let radius = getRadius();
                self.set_size_request(radius, radius);

                self.connect("draw", (_, cairo: Cairo.Context) => {
                  radius = getRadius();
                  self.set_size_request(radius, radius);

                  const bgColor = style.get_background_color(Gtk.StateFlags.NORMAL);
                  drawCornerShape(cairo, radius);
                  cairo.closePath();
                  cairo.setSourceRGBA(
                    bgColor.red,
                    bgColor.green,
                    bgColor.blue,
                    bgColor.alpha,
                  );
                  cairo.fill();
                });
              }}
            />
          );
        },
      )()}
    </box>
  );
}
