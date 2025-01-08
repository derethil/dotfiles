import { bind } from "astal";
import { CircleProgress } from "elements";
import { OpenMeteo } from "lib/openmeteo";
import { fromCode } from "lib/openmeteo/wmo";
import { options } from "options";

export function Weather() {
  const openMeteo = OpenMeteo.get_default();

  const value = bind(openMeteo, "current").as(
    (current) => current.temperature / 100,
  );

  const imageCss = bind(openMeteo, "current").as((current) => {
    const result = fromCode(current.weatherCode);
    if (result) return `background-image: url("${result.iconPath}");`;
    return "";
  });

  return (
    <CircleProgress
      color={options.theme.color.accent[2].default()}
      value={value}
    >
      <box className="weather">
        <box className="icon" css={imageCss} />
      </box>
    </CircleProgress>
  );
}
