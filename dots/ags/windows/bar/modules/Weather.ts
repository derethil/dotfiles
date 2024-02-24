import { OpenWeatherMapAPI } from "lib/weatherapi";
import icons from "lib/icons";
import FontIcon from "widgets/FontIcon";
import Label from "types/widgets/label";
import { getEnv } from "lib/dotenv";
import IconModule from "../IconModule";

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
