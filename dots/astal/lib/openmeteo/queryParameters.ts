/* eslint-disable camelcase */
import { Variable } from "astal";
import { options } from "options";

export const queryParameters = Variable.derive(
  [
    options.bar.weather.latitude,
    options.bar.weather.longitude,
    options.bar.weather.temperatureUnit,
    options.bar.weather.windSpeedUnit,
    options.bar.weather.precipitationUnit,
  ],
  (latitude, longitude, temperatureUnit, windSpeedUnit, precipitationUnit) => ({
    // Location
    latitude,
    longitude,
    // Units
    temperature_unit: temperatureUnit,
    wind_speed_unit: windSpeedUnit,
    precipitation_unit: precipitationUnit,
    // Formats
    timeformat: "unixtime",
    // Data Selection
    current: ["temperature_2m", "weather_code"],
  }),
);
