import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";

import { WWO_CODE } from "../data/weatherCodes.js";
import options from "../..//options.js";
import { wttr } from "../..//utils.js";
import icons from "../..//icons.js";

import FontIcon from "../../misc/FontIcon.js";
import HoverRevealer from "../../misc/HoverRevealer.js";
import PanelButton from "../PanelButton.js";

const unitsSuffix = options.weather.units.value === "metric" ? "C" : "F";

/**
 * @returns {{ temperature: string, weatherDescription: string }}
 */
function getWeatherInfo() {
  const data = wttr(options.weather.location.value);
  const curr = data.current_condition[0];

  const weatherDescription = WWO_CODE[curr.weatherCode];

  return {
    temperature: curr[`temp_${unitsSuffix}`],
    weatherDescription,
  };
}

const weatherInfo = Variable(
  {
    temperature: "0",
    weatherIcon: icons.weather.Unknown,
  },
  {
    poll: [
      900000, // 15 minutes
      () => {
        const { temperature, weatherDescription } = getWeatherInfo();
        return {
          temperature,
          weatherIcon: icons.weather[weatherDescription],
        };
      },
    ],
  }
);

export default () =>
  Widget.EventBox({
    hpack: "center",
    class_name: "weather",
    child: HoverRevealer({
      direction: "up",
      hpack: "center",
      indicator: PanelButton({
        content: FontIcon({
          class_name: "weather-icon",
          hpack: "center",
          setup: (self) =>
            self.hook(weatherInfo, () => {
              // @ts-ignore
              self.icon = weatherInfo.value.weatherIcon;
            }),
        }),
      }),
      child: Widget.Box({
        hpack: "center",
        child: Widget.Label({
          class_name: "weather-temperature",
          hpack: "center",
          setup: (self) =>
            self.hook(weatherInfo, () => {
              self.label = `${weatherInfo.value.temperature}°`;
            }),
        }),
      }),
    }),
  });
