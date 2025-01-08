import { GObject, property, register, Variable } from "astal";
import { createApi } from "utils/fetch";
import { queryParameters } from "./queryParameters";
import { CurrentWeather, MeteoData } from "./types";

const EMPTY_CURRENT: CurrentWeather = {
  temperature: 0,
  weatherCode: -1,
};

@register({ GTypeName: "OpenMeteo" })
export class OpenMeteo extends GObject.Object {
  static instance: OpenMeteo;
  private api = createApi("https://api.open-meteo.com/v1");
  private interval: number = 1000 * 60 * 30; // 30 minutes

  private _current: CurrentWeather = EMPTY_CURRENT;

  @property(Object)
  get current() {
    return this._current;
  }

  static get_default() {
    if (!this.instance) this.instance = new OpenMeteo();
    return this.instance;
  }

  constructor() {
    super();
    this.pollOpenMeteoData();
  }

  private pollOpenMeteoData() {
    Variable<MeteoData | null>(null).poll(this.interval, async () => {
      try {
        const result = await this.fetchWeatherData();
        if (result) this.processMeteoData(result);
        return result ?? null;
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
      return null;
    });
  }

  private async fetchWeatherData() {
    const result = await this.api.fetchAsync("/forecast", {
      params: queryParameters.get(),
    });

    if (!result) return;

    const data = JSON.parse(result) as MeteoData;
    return data;
  }

  private processMeteoData(data: MeteoData) {
    this._current = {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
    };
    this.notify("current");
  }
}
