import { icons } from "lib/icons";

export interface OpenWeatherMapAPI {
  apiKey: string;
  units: "metric" | "imperial";
  lat: number;
  lon: number;
  baseUrl: string;
  excludeList: string[];

  fetchWeatherInfo(): Promise<{ temperature: string; icon: string }>;
}

export class OpenWeatherMapAPI {
  excludeList = ["minutely", "hourly", "daily", "alerts"];
  baseUrl = "https://api.openweathermap.org/data/3.0/onecall";
  iconUrl = "https://openweathermap.org/img/wn/";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.units = options.bar.weather.units.value;
    this.lat = options.bar.weather.location.lat.value;
    this.lon = options.bar.weather.location.lon.value;
  }

  #isDayOrNight(weather: any) {
    const dt = weather.current.dt;
    const sunrise = weather.current.sunrise;
    const sunset = weather.current.sunset;

    if (dt > sunrise && dt < sunset) {
      return "day";
    } else {
      return "night";
    }
  }

  private constructWeatherId(weather: any): keyof typeof WEATHER_ID_TO_ICON {
    const id = weather.current.weather[0].id;
    const dayOrNight = this.#isDayOrNight(weather);
    console.log(weather.current);

    const key = `${dayOrNight}-${id}`;

    if (!(key in WEATHER_ID_TO_ICON)) {
      console.error(`Weather icon not found for ${key}`);
      return "init";
    }

    return key as keyof typeof WEATHER_ID_TO_ICON;
  }

  private constructReturnData(weather: any) {
    const weatherId = this.constructWeatherId(weather);

    return {
      temperature: weather.current.temp,
      icon: WEATHER_ID_TO_ICON[weatherId],
    };
  }

  public async fetchWeatherInfo() {
    try {
      const response = await Utils.fetch(this.baseUrl, {
        params: {
          lat: this.lat,
          lon: this.lon,
          exclude: this.excludeList.join(","),
          units: this.units,
          appid: this.apiKey,
        },
      });
      const data = await response.json();
      return this.constructReturnData(data);
    } catch (error) {
      console.error(`${error}`);
      return {
        temperature: "0",
        icon: WEATHER_ID_TO_ICON["init"],
      };
    }
  }
}

const WEATHER_ID_TO_ICON = {
  "init": "dialog-question-symbolic",
  "day-200": "day-thunderstorm",
  "day-201": "day-thunderstorm",
  "day-202": "day-thunderstorm",
  "day-210": "day-lightning",
  "day-211": "day-lightning",
  "day-212": "day-lightning",
  "day-221": "day-lightning",
  "day-230": "day-thunderstorm",
  "day-231": "day-thunderstorm",
  "day-232": "day-thunderstorm",
  "day-300": "day-sprinkle",
  "day-301": "day-sprinkle",
  "day-302": "day-rain",
  "day-310": "day-rain",
  "day-311": "day-rain",
  "day-312": "day-rain",
  "day-313": "day-rain",
  "day-314": "day-rain",
  "day-321": "day-sprinkle",
  "day-500": "day-sprinkle",
  "day-501": "day-rain",
  "day-502": "day-rain",
  "day-503": "day-rain",
  "day-504": "day-rain",
  "day-511": "day-rain-mix",
  "day-520": "day-showers",
  "day-521": "day-showers",
  "day-522": "day-showers",
  "day-531": "day-storm-showers",
  "day-600": "day-snow",
  "day-601": "day-sleet",
  "day-602": "day-snow",
  "day-611": "day-rain-mix",
  "day-612": "day-rain-mix",
  "day-615": "day-rain-mix",
  "day-616": "day-rain-mix",
  "day-620": "day-rain-mix",
  "day-621": "day-snow",
  "day-622": "day-snow",
  "day-701": "day-showers",
  "day-711": "smoke",
  "day-721": "day-haze",
  "day-731": "dust",
  "day-741": "day-fog",
  "day-761": "dust",
  "day-762": "dust",
  "day-781": "tornado",
  "day-800": "day-sunny",
  "day-801": "day-cloudy-gusts",
  "day-802": "day-cloudy-gusts",
  "day-803": "day-cloudy-gusts",
  "day-804": "day-sunny-overcast",
  "day-900": "tornado",
  "day-902": "hurricane",
  "day-903": "snowflake-cold",
  "day-904": "hot",
  "day-906": "day-hail",
  "day-957": "strong-wind",
  "night-200": "night-alt-thunderstorm",
  "night-201": "night-alt-thunderstorm",
  "night-202": "night-alt-thunderstorm",
  "night-210": "night-alt-lightning",
  "night-211": "night-alt-lightning",
  "night-212": "night-alt-lightning",
  "night-221": "night-alt-lightning",
  "night-230": "night-alt-thunderstorm",
  "night-231": "night-alt-thunderstorm",
  "night-232": "night-alt-thunderstorm",
  "night-300": "night-alt-sprinkle",
  "night-301": "night-alt-sprinkle",
  "night-302": "night-alt-rain",
  "night-310": "night-alt-rain",
  "night-311": "night-alt-rain",
  "night-312": "night-alt-rain",
  "night-313": "night-alt-rain",
  "night-314": "night-alt-rain",
  "night-321": "night-alt-sprinkle",
  "night-500": "night-alt-sprinkle",
  "night-501": "night-alt-rain",
  "night-502": "night-alt-rain",
  "night-503": "night-alt-rain",
  "night-504": "night-alt-rain",
  "night-511": "night-alt-rain-mix",
  "night-520": "night-alt-showers",
  "night-521": "night-alt-showers",
  "night-522": "night-alt-showers",
  "night-531": "night-alt-storm-showers",
  "night-600": "night-alt-snow",
  "night-601": "night-alt-sleet",
  "night-602": "night-alt-snow",
  "night-611": "night-alt-rain-mix",
  "night-612": "night-alt-rain-mix",
  "night-615": "night-alt-rain-mix",
  "night-616": "night-alt-rain-mix",
  "night-620": "night-alt-rain-mix",
  "night-621": "night-alt-snow",
  "night-622": "night-alt-snow",
  "night-701": "night-alt-showers",
  "night-711": "smoke",
  "night-721": "day-haze",
  "night-731": "dust",
  "night-741": "night-fog",
  "night-761": "dust",
  "night-762": "dust",
  "night-781": "tornado",
  "night-800": "night-clear",
  "night-801": "night-alt-cloudy-gusts",
  "night-802": "night-alt-cloudy-gusts",
  "night-803": "night-alt-cloudy-gusts",
  "night-804": "night-alt-cloudy",
  "night-900": "tornado",
  "night-902": "hurricane",
  "night-903": "snowflake-cold",
  "night-904": "hot",
  "night-906": "night-alt-hail",
  "night-957": "strong-wind",
};
