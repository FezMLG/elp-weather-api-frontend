import { Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrentWeather } from "./CurrentWeather.interface";

const label = { inputProps: { "aria-label": "Switch source" } };

const App = () => {
  const [weather, setWeather] = useState<CurrentWeather>();
  const [lat, setLat] = useState(52.24);
  const [lon, setLon] = useState(21.02);
  const [source, setSource] = useState(false);
  const getWeather = async (lat: number, lon: number, source: boolean) => {
    const { data } = await axios.get(
      `http://localhost:4000/current_weather?lat=${lat}&lon=${lon}&alternateSource=${source}`
    );
    setWeather(data);
  };

  useEffect(() => {
    console.log("loading", source);
    getWeather(lat, lon, source);
  }, [source]);

  return (
    <div>
      <div className="parameter flex-row big color center">
        <p>WeatherBIT</p>
        <Switch {...label} onChange={() => setSource(!source)} />
        <p>OpenWeatherMap</p>
      </div>
      <div className="container">
        <div className="parameter color flex-column">
          <form>
            <div className="parameter flex-row">
              <label htmlFor="lat">Latitude</label>
              <input type="number" id="lat" value="52.24" step="0.01"></input>
              <label htmlFor="lon">Longitude</label>
              <input type="number" id="lon" value="21.02" step="0.01"></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div>
        <div className="parameter flex-row left">
          <p>
            lat: <span>{weather?.lat}</span>
          </p>
          <p>
            lon: <span>{weather?.lon}</span>
          </p>
        </div>
        <div className="temp-container">
          <p className="temp">
            <span>{weather?.temperature}</span>°C
          </p>
          <img src={weather?.weather.icon} />
          <p>
            Feel: <span>{weather?.apparent_temperature}</span>°C
          </p>
          <p>{weather?.weather.description}</p>
        </div>
      </div>
      <div className="container three">
        <div className="parameter flex-column big color">
          <i></i>
          <h3 className="title">Pressure</h3>
          <p className="info">
            <span>{weather?.pressure}</span> hPa
          </p>
        </div>
        <div className="parameter flex-column big color">
          <i></i>
          <h3 className="title">Humidity</h3>
          <p className="info">
            <span>{weather?.humidity}</span>%
          </p>
        </div>
        <div className="parameter flex-column big color">
          <i></i>
          <h3 className="title">Wind</h3>
          <p className="info">
            <span>{weather?.wind.speed}</span> m/s
          </p>
          <p className="info">
            <span>{weather?.wind.diriection}</span>°
          </p>
        </div>
      </div>
      <div className="container two">
        <div className="parameter flex-column big color">
          <p className="info">
            <span>{weather?.sunrise}</span>
          </p>
          <h3 className="title">Sunrise</h3>
          <i></i>
        </div>
        <div className="parameter flex-column big color">
          <p className="info">
            <span>{weather?.sunset}</span>
          </p>
          <h3 className="title">Sunset</h3>
          <i></i>
        </div>
      </div>
      <div className="container">
        <div className="parameter flex-row left">
          <p>Last update: </p>
          <span>{weather?.ob_time}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
