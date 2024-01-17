import { fetch } from "resource:///com/github/Aylur/ags/utils.js";

import options from "./options.js";
import icons from "./icons.js";

/**
 * @typedef {Object} ApiParams
 * @property {number} lat
 * @property {number} lon
 * @property {string} exclude
 * @property {string} units
 * @property {string} appid
 * */

export class OpenWeatherMapAPI {
  excludeList = ["minutely", "hourly", "daily", "alerts"];
  baseUrl = "https://api.openweathermap.org/data/3.0/onecall";

  /**
   * @param {string} apiKey
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.units = options.weather.units.value;
    this.lat = options.weather.location.lat.value;
    this.lon = options.weather.location.lon.value;
  }

  /**@param {ApiParams} params */
  #constructParams(params) {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  #isDayOrNight(weather) {
    const dt = weather.current.dt;
    const sunrise = weather.current.sunrise;
    const sunset = weather.current.sunset;

    if (dt > sunrise && dt < sunset) {
      return "day";
    } else {
      return "night";
    }
  }

  #constructWeatherId(weather) {
    const id = weather.current.weather[0].id;
    const dayOrNight = this.#isDayOrNight(weather);
    return `${dayOrNight}-${id}`;
  }

  #constructReturnData(weather) {
    const weatherId = this.#constructWeatherId(weather);
    const icon = this.#weatherIcon(weatherId);
    return {
      temperature: weather.current.temp,
      icon: icon,
    };
  }

  #weatherIcon(weatherId) {
    return icons.weather[weatherId];
  }

  async fetchWeatherInfo() {
    const params = {
      lat: this.lat,
      lon: this.lon,
      exclude: this.excludeList.join(","),
      units: this.units,
      appid: this.apiKey,
    };

    const paramsStr = this.#constructParams(params);

    try {
      const response = await fetch(`${this.baseUrl}?${paramsStr}`);
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
