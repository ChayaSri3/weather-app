import React, { useState, useEffect } from "react";
import "./Weather.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const API_KEY = import.meta.env.VITE_APP_ID;

function Weather() {
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState({});

  const fetchWeather = async (cityName) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeatherData({
      temperature: Math.round(data.main.temp),
      location: data.name,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].main.toLowerCase(),
    });
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const getIcon = (condition) => {
    switch (condition) {
      case "clouds": return cloud_icon;
      case "rain": return rain_icon;
      case "clear": return clear_icon;
      case "snow": return snow_icon;
      default: return clear_icon;
    }
  };

  return (
    <div className="weather-container fade-in">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>

      <div className="weather-box">
        <img src={getIcon(weatherData.icon)} alt="weather icon" className="weather-icon" />
        <h1>{weatherData.temperature}&deg;C</h1>
        <h2>{weatherData.location}</h2>
        <div className="details">
          <div className="info">
            <img src={humidity_icon} alt="Humidity" className="weather-icon" />
            <p>Humidity: {weatherData.humidity}%</p>
          </div>
          <div className="info">
            <img src={wind_icon} alt="Wind" className="weather-icon" />
            <p>Wind: {weatherData.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

