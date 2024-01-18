import Widget from "resource:///com/github/Aylur/ags/widget.js";
import options from "../../options.js";
import { OpenWeatherMapAPI } from "../../weatherapi.js";
import icons from "../../icons.js";
import FontIcon from "../../misc/FontIcon.js";
import PanelButton from "../PanelButton.js";
import { env } from "../../utils.js";

const msBetweenPoll = 1000 * 60 * 5;
const api = new OpenWeatherMapAPI(env("OPENWEATHERMAP_API_KEY"));

const setTemperature = async (label) => {
  const response = await api.fetchWeatherInfo();
  label.label = String(Math.round(response.temperature));
};

const setIcon = async (fontIcon) => {
  const response = await api.fetchWeatherInfo();
  fontIcon.icon = response.icon;
};

export default () =>
  PanelButton({
    class_name: "weather",
    color: "blue",
    icon: FontIcon(icons.weather.init).poll(msBetweenPoll, setIcon),
    content: Widget.Label({
      class_name: "temperature",
      hpack: "center",
    }).poll(msBetweenPoll, setTemperature),
  });
