/* eslint-disable camelcase */
import { bind, Variable } from "astal";
import { options } from "options";
import { Location } from "state/location";

const location = new Location();

export const queryParameters = Variable.derive(
  [
    bind(location, "location"),
    options.bar.weather.temperatureUnit,
    options.bar.weather.windSpeedUnit,
    options.bar.weather.precipitationUnit,
  ],
  (location, temperatureUnit, windSpeedUnit, precipitationUnit) => {
    return {
      // Location
      latitude: location?.lat ?? 0,
      longitude: location?.lon ?? 0,
      // Units
      temperature_unit: temperatureUnit,
      wind_speed_unit: windSpeedUnit,
      precipitation_unit: precipitationUnit,
      // Formats
      timeformat: "unixtime",
      // Data Selection
      current: ["temperature_2m", "weather_code"],
    };
  },
);
