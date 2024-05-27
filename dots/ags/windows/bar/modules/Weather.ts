import { getEnv } from "lib/dotenv";
import { OpenWeatherMapAPI, WeatherInfo } from "lib/weatherapi";
import { IconModule } from "../IconModule";

const INITIAL: WeatherInfo = {
  icon: "dialog-question-symbolic",
  temperature: 0,
};

const msBetweenPoll = 1000 * 60 * 5;
const api = new OpenWeatherMapAPI(getEnv("OPENWEATHERMAP_API_KEY") ?? "");

const weatherInfo = Variable<WeatherInfo>(INITIAL, {
  poll: [msBetweenPoll, async () => await api.fetchWeatherInfo()],
});

export function Weather() {
  return IconModule({
    className: "weather",
    labelColor: "blue",
    icon: Widget.Icon({
      icon: weatherInfo.bind("value").as((v) => v.icon),
      size: 32,
    }),
    child: Widget.Label({
      label: weatherInfo.bind("value").as((v) =>
        Math.round(v.temperature).toString()
      ),
      className: "temperature",
    }),
  });
}
