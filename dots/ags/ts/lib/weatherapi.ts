import { fetch } from "resource:///com/github/Aylur/ags/utils.js";

import options from "ts/options";
import icons from "ts/icons";

export interface OpenWeatherMapAPI {
  apiKey: string;
  units: string;
  lat: number;
  lon: number;
  baseUrl: string;
  excludeList: string[];

  fetchWeatherInfo(): Promise<{ temperature: string; icon: string }>;
}

export class OpenWeatherMapAPI {
  excludeList = ["minutely", "hourly", "daily", "alerts"];
  baseUrl = "https://api.openweathermap.org/data/3.0/onecall";

  /**
   * @param {string} apiKey
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.units = options.weather.units.value;
    this.lat = options.weather.location.lat.value;
    this.lon = options.weather.location.lon.value;
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

  #constructWeatherId(weather: any): keyof typeof icons.weather {
    const id = weather.current.weather[0].id;
    const dayOrNight = this.#isDayOrNight(weather);

    const key = `${dayOrNight}-${id}`;

    if (!(key in icons.weather)) {
      console.error(`Weather icon not found for ${key}`);
      return "init";
    }
    return key as keyof typeof icons.weather;
  }

  #constructReturnData(weather: any) {
    const weatherId = this.#constructWeatherId(weather);
    const icon = this.#weatherIcon(weatherId);
    return {
      temperature: weather.current.temp,
      icon: icon,
    };
  }

  #weatherIcon(weatherId: keyof typeof icons.weather) {
    return icons.weather[weatherId];
  }

  async fetchWeatherInfo() {
    try {
      const response = await fetch(this.baseUrl, {
        params: {
          lat: this.lat,
          lon: this.lon,
          exclude: this.excludeList.join(","),
          units: this.units,
          appid: this.apiKey,
        },
      });
      const data = await response.json();
      return this.#constructReturnData(data);
    } catch (error) {
      console.error(`${error}`);
      return {
        temperature: "0",
        icon: icons.weather.init,
      };
    }
  }
}
