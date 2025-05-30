import { useState } from 'react';
import axios from 'axios';
import City from './City';
import './App.css';
import Lottie from 'lottie-react';
import clearAnimation from './assets/animations/clear.json';
import rainAnimation from './assets/animations/rain.json';
import cloudsAnimation from './assets/animations/cloud.json';
import snowAnimation from './assets/animations/snow.json';

function App() {
  const API_KEY = "63556b9faa481dd282a92a013f6c6de3";
  const [city, setCity] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [animationData, setAnimationData] = useState(cloudsAnimation);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (inputValue.trim() === "") {
        setError("Lütfen bir şehir adı girin.");
        setCity(null);
        return;
      }
      setError(null);
      await fetchWeather(inputValue.trim());
    }
  };

  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=tr`
      );
      setCity(res.data);
      selectAnimation(res.data.weather[0].main);
    } catch (err) {
      setCity(null);
      setError("Şehir bulunamadı veya API hatası.");
    }
  };

  const selectAnimation = (weatherMain) => {
    const condition = weatherMain.toLowerCase();
    if (condition.includes("clear")) {
      setAnimationData(clearAnimation);
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      setAnimationData(rainAnimation);
    } else if (condition.includes("snow")) {
      setAnimationData(snowAnimation);
    } else {
      setAnimationData(cloudsAnimation);
    }
  };

  return (
    <div className="app-container">
      {/* Sol Taraf - Bilgi Container */}
      <div className="info-container">
        <div className="main-div">
          <h1 className="header">🌤️ Hava Durumu</h1>
          <input
            className="inpt"
            type="text"
            placeholder="Şehir adı yazıp Enter'a basın..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          {error && <div className="error-message">{error}</div>}

          <City city={city} />
        </div>
      </div>

      {}
      <div className="animation-container">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

export default App;