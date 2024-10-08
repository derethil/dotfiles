import { Binding } from "types/service";
import { BoxProps } from "types/widgets/box";

interface IconModuleProps extends BoxProps {
  icon: BoxProps["child"];
  labelColor?: string | Binding<any, any, string>;
  threeColumns?: boolean | Binding<any, any, boolean>;
}

const constructor = (onlyPrimary: boolean, labelColor: string) => {
  const color = onlyPrimary ? "primary" : labelColor;
  return `bg-${color} icon-container`;
};

const iconContainerClassNames = (labelColor: IconModuleProps["labelColor"]) => {
  if (!labelColor) return "icon-container";

  if (typeof labelColor === "string") {
    return options.bar.onlyPrimary.bind().as((onlyPrimary) =>
      constructor(onlyPrimary, labelColor)
    );
  }

  return Utils.merge([options.bar.onlyPrimary.bind(), labelColor], constructor);
};

const getClasses = (
  always: string,
  threeColumns: IconModuleProps["threeColumns"],
) => {
  if (!threeColumns) return always;
  if (typeof threeColumns === "boolean") return `${always} three-columns`;
  return threeColumns.as((value) => value ? `${always} three-columns` : always);
};

export function IconModule(props: IconModuleProps) {
  const { icon, labelColor, ...rest } = props;
  return Widget.Box({
    ...rest,
    child: Widget.Box({
      classNames: ["bar-module", "bar-module-icon"],
      hexpand: true,
      vertical: true,
      children: [
        Widget.Box({
          className: iconContainerClassNames(labelColor),
          vertical: true,
          child: icon,
        }),
        Widget.Box({
          className: getClasses("content-container", props.threeColumns),
          vertical: true,
          child: props.child,
        }),
      ],
    }),
  });
}
