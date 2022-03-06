import { Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { OPEN_WEATHER, WEATHERBIT } from "./constants";
import { CurrentWeather } from "./CurrentWeather.interface";

const label = { inputProps: { "aria-label": "Switch source" } };

const App = () => {
  const [weather, setWeather] = useState<CurrentWeather>();
  const [lat, setLat] = useState(52.24);
  const [lon, setLon] = useState(21.02);
  const [source, setSource] = useState(false);
  const [switchState, setSwitchState] = useState(false);

  const getWeather = async () => {
    setSwitchState(true);
    localStorage.setItem("lat", String(lat));
    localStorage.setItem("lon", String(lon));
    const { data } = await axios.get(
      `http://localhost:4000/current_weather?lat=${lat}&lon=${lon}&alternateSource=${source}`
    );
    setWeather(data);
    setSwitchState(false);
  };

  const handleSwitch = () => {
    setSource(!source);
    if (source) {
      document.querySelector(`#${OPEN_WEATHER}`)?.classList.add("selected");
      document.querySelector(`#${WEATHERBIT}`)?.classList.remove("selected");
    } else {
      document.querySelector(`#${OPEN_WEATHER}`)?.classList.remove("selected");
      document.querySelector(`#${WEATHERBIT}`)?.classList.add("selected");
    }
  };

  const handleSubmit = () => {
    setLat(Number((document.querySelector(`#lat`) as HTMLInputElement)?.value));
    setLon(Number((document.querySelector(`#lon`) as HTMLInputElement)?.value));
  };

  useEffect(() => {
    if (localStorage.getItem("lat") && localStorage.getItem("lon")) {
      setLat(Number(localStorage.getItem("lat")));
      setLon(Number(localStorage.getItem("lon")));
    }
  }, []);

  useEffect(() => {
    getWeather();
  }, [source, lat, lon]);

  return (
    <div className="main-container">
      <div className="parameter flex-row big color switch-container mg-btm20">
        <p className="source selected" id={OPEN_WEATHER}>
          OpenWeatherMap
        </p>
        <Switch
          {...label}
          onChange={handleSwitch}
          id="changeSourceSwitch"
          disabled={switchState}
        />
        <p className="source" id={WEATHERBIT}>
          WeatherBIT
        </p>
      </div>
      <div className="container mg-btm20 parameter color flex-column p-20">
        <form>
          <div className="parameter flex-row gap40 mg-btm10">
            <div className="parameter flex-column left">
              <label htmlFor="lat">Latitude</label>
              <input
                type="number"
                id="lat"
                defaultValue={localStorage.getItem("lat") || lat}
                step="0.01"
              ></input>
            </div>
            <div className="parameter flex-column left">
              <label htmlFor="lon">Longitude</label>
              <input
                type="number"
                id="lon"
                defaultValue={localStorage.getItem("lon") || lon}
                step="0.01"
              ></input>
            </div>
          </div>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
      <div className="mg-btm20 weather-container">
        <div className="parameter flex-row left">
          <p>
            lat: <span>{weather?.lat}</span>
          </p>
          <p>
            lon: <span>{weather?.lon}</span>
          </p>
        </div>
        <div className="temp-container">
          <div className="parameter flex-row spacebetween">
            <p className="temp">
              <span>{weather?.temperature}</span>°C
            </p>
            <img
              src={weather?.weather.icon}
              className="icon s80"
              alt="current_weather_icon"
            />
          </div>
          <div className="parameter flex-row spacebetween">
            <p>
              Feel: <span>{weather?.apparent_temperature}</span>°C
            </p>
            <p className="weather-description">
              {weather?.weather.description}
            </p>
          </div>
        </div>
      </div>
      <div className="container three mg-btm20">
        <div className="parameter flex-column xl color">
          <img
            src="/assets/surface-protection.png"
            alt="pressure_icon"
            className="icon s40"
          />
          <h3 className="title">Pressure</h3>
          <p className="info">
            <span>{weather?.pressure}</span> hPa
          </p>
        </div>
        <div className="parameter flex-column xl color">
          <img
            src="/assets/water.png"
            alt="humidity_icon"
            className="icon s40"
          />
          <h3 className="title">Humidity</h3>
          <p className="info">
            <span>{weather?.humidity}</span>%
          </p>
        </div>
        <div className="parameter flex-column xl color">
          <img src="/assets/wind.png" alt="wind_icon" className="icon s40" />
          <h3 className="title">Wind</h3>
          <p className="info">
            <span>{weather?.wind.speed}</span> m/s
          </p>
          <p className="info">
            <span>{weather?.wind.diriection}</span>°
          </p>
        </div>
      </div>
      <div className="container two mg-btm20">
        <div className="parameter flex-column xl color">
          <p className="info">
            <span>{weather?.sunrise}</span>
          </p>
          <h3 className="title">Sunrise</h3>
          <img
            src="/assets/sunrise--v1.png"
            alt="sunrise_icon"
            className="icon s80"
          />
        </div>
        <div className="parameter flex-column xl color">
          <p className="info">
            <span>{weather?.sunset}</span>
          </p>
          <h3 className="title">Sunset</h3>
          <img
            src="/assets/sunset--v2.png"
            alt="sunset_icon"
            className="icon s80"
          />
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
