import { GObject, property, register } from "astal";
import { createApi } from "utils/fetch";
import { queryParameters } from "./queryParameters";
import { WEATHER_ICON_MAP } from "./weatherIcons";

@register({ GTypeName: "OpenWeatherMap" })
export class OpenWeatherMap extends GObject.Object {
  static instance: OpenWeatherMap;
  private api = createApi("https://api.openweathermap.org/data/3.0/");
  private interval: Milliseconds = 1000 * 60 * 5; // 5 minutes

  private _current: CurrentWeather | null = null;

  @property(Object)
  get current() {
    return this._current;
  }

  static get_default() {
    if (!this.instance) this.instance = new OpenWeatherMap();
    return this.instance;
  }

  constructor() {
    super();
    this.poll().catch(console.error);
    setInterval(() => this.poll(), this.interval);
  }

  public getIconFromCode(code: number): string | undefined {
    if (!this.current) return;
    const { sunrise, sunset } = this.current;
    const isDay = sunrise < new Date() && sunset > new Date();
    const prefix = isDay ? "day" : "night";
    return `${WEATHER_ICON_MAP[`${prefix}-${code}`]}-symbolic`;
  }

  private async poll() {
    try {
      const result = await this.fetch();
      if (result) this.process(result);
      return result ?? null;
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
    return null;
  }

  private async fetch() {
    const result = await this.api.fetchAsync("/onecall", {
      params: queryParameters.get(),
      cacheTimeout: this.interval,
    });

    if (!result) return;

    const data = JSON.parse(result) as OpenWeatherMapResponse;
    return data;
  }

  private process(data: OpenWeatherMapResponse) {
    this._current = this.parseCurrent(data.current);
    this.notify("current");
  }

  private parseCurrent(current: OpenWeatherMapCurrent): CurrentWeather {
    return {
      temperature: current.temp,
      code: current.weather[0].id,
      sunrise: new Date(current.sunrise * 1000),
      sunset: new Date(current.sunset * 1000),
    };
  }
}
