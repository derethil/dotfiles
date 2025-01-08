enum WeatherCode {
  Clear = 0,
  MostlyClear = 1,
  PartlyCloudy = 2,
  Overcast = 3,
  Fog = 45,
  IcyFog = 48,
  LightDrizzle = 51,
  Drizzle = 53,
  HeavyDrizzle = 55,
  LightShowers = 80,
  Showers = 81,
  HeavyShowers = 82,
  LightRain = 61,
  Rain = 60,
  HeavyRain = 65,
  LightFreezingDrizzle = 56,
  FreezingDrizzle = 57,
  LightFreezingRain = 66,
  FreezingRain = 67,
  SnowGrains = 77,
  LightSnowShowers = 85,
  SnowShowers = 86,
  LightSnow = 71,
  Snow = 73,
  HeavySnow = 75,
  Thunderstorm = 95,
  LightThunderstormHail = 96,
  ThunderstormHail = 97,
}

interface WeatherCodeInterpretation {
  iconPath: string;
  description: string;
}

function interpretCode(iconCode: string, description: string) {
  const icon = `${SRC}/assets/images/weather/${iconCode}.png`;
  return { iconPath: icon, description };
}

// prettier-ignore
const WEATHER_CODES: Record<WeatherCode, WeatherCodeInterpretation> = {
  [WeatherCode.Clear]: interpretCode("clear", "Clear Sky"),
  [WeatherCode.MostlyClear]: interpretCode("mostly-clear", "Mostly Clear"),
  [WeatherCode.PartlyCloudy]: interpretCode("partly-cloudy", "Partly Cloudy"),
  [WeatherCode.Overcast]: interpretCode("overcast", "Overcast"),
  [WeatherCode.Fog]: interpretCode("fog", "Fog"),
  [WeatherCode.IcyFog]: interpretCode("icy-fog", "Icy Fog"),
  [WeatherCode.LightDrizzle]: interpretCode("light-drizzle", "Light Drizzle"),
  [WeatherCode.Drizzle]: interpretCode("drizzle", "Drizzle"),
  [WeatherCode.HeavyDrizzle]: interpretCode("heavy-drizzle", "Heavy Drizzle"),
  [WeatherCode.LightShowers]: interpretCode("light-showers", "Light Showers"),
  [WeatherCode.Showers]: interpretCode("showers", "Showers"),
  [WeatherCode.HeavyShowers]: interpretCode("heavy-showers", "Heavy Showers"),
  [WeatherCode.LightRain]: interpretCode("light-rain", "Light Rain"),
  [WeatherCode.Rain]: interpretCode("rain", "Rain"),
  [WeatherCode.HeavyRain]: interpretCode("heavy-rain", "Heavy Rain"),
  [WeatherCode.LightFreezingDrizzle]: interpretCode("light-freezing-drizzle", "Light Freezing Drizzle"),
  [WeatherCode.FreezingDrizzle]: interpretCode("freezing-drizzle", "Freezing Drizzle"),
  [WeatherCode.LightFreezingRain]: interpretCode("light-freezing-rain", "Light Freezing Rain"),
  [WeatherCode.FreezingRain]: interpretCode("freezing-rain", "Freezing Rain"),
  [WeatherCode.SnowGrains]: interpretCode("snow-grains", "Snow Grains"),
  [WeatherCode.LightSnowShowers]: interpretCode("light-snow-showers", "Light Snow Showers"),
  [WeatherCode.SnowShowers]: interpretCode("snow-showers", "Snow Showers"),
  [WeatherCode.LightSnow]: interpretCode("light-snow", "Light Snow"),
  [WeatherCode.Snow]: interpretCode("snow", "Snow"),
  [WeatherCode.HeavySnow]: interpretCode("heavy-snow", "Heavy Snow"),
  [WeatherCode.Thunderstorm]: interpretCode("thunderstorm", "Thunderstorm"),
  [WeatherCode.LightThunderstormHail]: interpretCode("thunderstorm-with-hail", "Light Thunderstorm with Hail"),
  [WeatherCode.ThunderstormHail]: interpretCode("thunderstorm-with-hail", "Thunderstorm with Hail"),
};

export function fromCode(weatherCode: number) {
  if (!(weatherCode in WEATHER_CODES)) return;
  return WEATHER_CODES[weatherCode as WeatherCode];
}
