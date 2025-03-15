import { bind } from "astal";
import { CircleProgress } from "elements";
import { OpenWeatherMap } from "lib/openweathermap";
import { options } from "options";
import { icon } from "utils";

export function Weather() {
  const weather = OpenWeatherMap.get_default();

  const value = bind(weather, "current").as((current) =>
    current ? current.temperature / 100 : 0,
  );

  const weatherIcon = bind(weather, "current").as((current) => {
    if (!current) return "dialog-question";
    return icon(`${weather.getIconFromCode(current.code)}`, "dialog-question");
  });

  return (
    <CircleProgress
      color={options.theme.color.accent[2].default()}
      value={value}
      className="weather list-item"
    >
      <icon icon={weatherIcon} />
    </CircleProgress>
  );
}
