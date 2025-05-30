import React from "react";
import "./City.css";

function City({ city }) {
  if (!city) return null;

  const weatherIcon = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧",
    Snow: "❄️",
    Mist: "☁️",
    Fog: "☁️"
  }[city.weather[0].main] || "🌈";

  return (
    <div className="city-div">
      <div className="city-text">
        <div><strong>{city.name} {weatherIcon}</strong></div>
        <div>
          <span>🌡 Sıcaklık</span>
          <span>{Math.round(city.main.temp)}°C</span>
        </div>
        <div>
          <span>🤒 Hissedilen</span>
          <span>{Math.round(city.main.feels_like)}°C</span>
        </div>
        <div>
          <span>💧 Nem</span>
          <span>{city.main.humidity}%</span>
        </div>
        <div>
          <span>🌬 Rüzgar</span>
          <span>{Math.round(city.wind.speed * 3.6)} km/s</span>
        </div>
        <div>
          <span>🌥 Durum</span>
          <span>{city.weather[0].description}</span>
        </div>
      </div>
    </div>
  );
}

export default City;