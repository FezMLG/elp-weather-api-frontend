export interface CurrentWeather {
  lat: number;
  lon: number;
  source: string;
  temperature: number;
  apparent_temperature: number;
  pressure: number;
  humidity: number;
  wind: {
    speed: number;
    diriection: number;
  };
  sunrise: string;
  sunset: string;
  ob_time: string;
  weather: {
    icon: string;
    description: string;
  };
}
