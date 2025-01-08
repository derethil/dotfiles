export interface MeteoData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: 0;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: "string";
    interval: "seconds";
    temperature_2m: string;
    weather_code: "wmo code";
  };
  current: {
    time: number;
    interval: number;
    temperature_2m: number;
    weather_code: number;
  };
}

interface CurrentWeather {
  temperature: number;
  weatherCode: number;
}
