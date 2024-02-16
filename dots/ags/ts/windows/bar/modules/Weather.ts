import Widget from "resource:///com/github/Aylur/ags/widget.js";
import options from "ts/options.js";
import { OpenWeatherMapAPI } from "ts/lib/weatherapi";
import icons from "ts/icons.js";
import FontIcon from "ts/widgets/FontIcon.js";
import PanelButton from "../../../widgets/PanelButton.js";
import Label from "types/widgets/label.js";
import { getEnv } from "ts/lib/dotenv.js";

const msBetweenPoll = 1000 * 60 * 5;
const api = new OpenWeatherMapAPI(getEnv("OPENWEATHERMAP_API_KEY") ?? "");

const setTemperature = async (label: Label<any>) => {
  const response = await api.fetchWeatherInfo();
  label.label = String(Math.round(response.temperature));
};

const setIcon = async (fontIcon: any) => {
  const response = await api.fetchWeatherInfo();
  fontIcon.icon = response.icon;
};

export default () =>
  PanelButton({
    class_name: "weather",
    color: "blue",
    icon: FontIcon({ icon: icons.weather.init }).poll(msBetweenPoll, setIcon),
    content: Widget.Label({
      class_name: "temperature",
      hpack: "center",
    }).poll(msBetweenPoll, setTemperature),
  });
