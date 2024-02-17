import { OpenWeatherMapAPI } from "ts/lib/weatherapi";
import icons from "ts/icons.js";
import FontIcon from "ts/widgets/FontIcon.js";
import Label from "types/widgets/label.js";
import { getEnv } from "ts/lib/dotenv.js";
import IconModule from "../IconModule.js";

const msBetweenPoll = 1000 * 60 * 5;
const api = new OpenWeatherMapAPI(getEnv("OPENWEATHERMAP_API_KEY") ?? "");

const setTemperature = async (label: Label<any>) => {
  const response = await api.fetchWeatherInfo();
  label.label = String(Math.round(response.temperature));
};

const setIcon = async (fontIcon: any) => {
  const response = await api.fetchWeatherInfo();
  fontIcon.label = response.icon;
};

export default () =>
  IconModule({
    class_name: "weather",
    labelColor: "blue",
    icon: FontIcon({ label: icons.weather.init }).poll(msBetweenPoll, setIcon),
    child: Widget.Label({
      class_name: "temperature",
    }).poll(msBetweenPoll, setTemperature),
  });
