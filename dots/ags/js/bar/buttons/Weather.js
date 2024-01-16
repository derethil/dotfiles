import Widget from "resource:///com/github/Aylur/ags/widget.js";
import options from "../../options.js";
import { OpenWeatherMapAPI } from "../../weatherapi.js";
import icons from "../../icons.js";
import FontIcon from "../../misc/FontIcon.js";
import PanelButton2 from "../PanelButton.js";
import { env } from "../../utils.js";

const msBetweenPoll = 1000 * 60 * 5;
const api = new OpenWeatherMapAPI(env("OPENWEATHERMAP_API_KEY"));

export default () =>
  PanelButton2({
    class_name: "weather",
    color: "blue",
    icon: FontIcon(icons.weather["day-800"]).poll(msBetweenPoll, (fontIcon) => {
      const getIcon = async () => {
        const response = await api.fetchWeatherInfo();
        fontIcon.icon = response.icon;
      };
      getIcon();
    }),
    content: Widget.Label({
      class_name: "temperature",
      hpack: "center",
    }).poll(msBetweenPoll, (label) => {
      const getTemperature = async () => {
        const response = await api.fetchWeatherInfo();
        label.label = String(Math.round(response.temperature));
      };
      getTemperature();
    }),
  });
