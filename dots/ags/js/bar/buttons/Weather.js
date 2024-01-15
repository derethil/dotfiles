import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";

import { WWO_CODE } from "../data/weatherCodes.js";
import options from "../..//options.js";
import { wttr } from "../..//utils.js";
import icons from "../..//icons.js";

import FontIcon from "../../misc/FontIcon.js";
import PanelButton2 from "../PanelButton.js";

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
  PanelButton2({
    class_name: "weather",
    color: "blue",
    icon: FontIcon({
      icon: weatherInfo.value.weatherIcon,
      setup: (self) =>
        self.hook(weatherInfo, () => {
          // @ts-expect-error
          self.icon = weatherInfo.value.weatherIcon;
        }),
    }),
    content: Widget.Label({
      class_name: "temperature",
      hpack: "center",
      setup: (self) =>
        self.hook(weatherInfo, () => {
          self.label = `${weatherInfo.value.temperature}`;
        }),
    }),
  });
