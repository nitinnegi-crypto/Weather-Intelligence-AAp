export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyForecast;
}
