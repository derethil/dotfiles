import { bind, Variable } from "astal";
import { getEnv } from "lib/env";
import { options } from "options";
import { Location } from "state/location";

const location = Location.get_default();

export const queryParameters = Variable.derive(
  [bind(location, "location"), options.bar.weather.units],
  (location, units) => {
    return {
      // Location
      lat: location?.lat ?? 0,
      lon: location?.lon ?? 0,
      // Units
      units,
      exclude: ["daily", "minutely", "hourly", "alerts"],
      // API Key
      appid: getEnv("OPENWEATHERMAP_API_KEY"),
    };
  },
);
