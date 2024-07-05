import React, { useState, useEffect } from "react";
import "./index.css";
import { WeatherContext } from "../WeatherContext"; // Import context
import Header from "../Header";

function Home() {
  const [inputLocation, setInputLocation] = useState("");
  const [displayedLocation, setDisplayedLocation] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    try {
      const apikey = "9ec58e5a6b655d055afe1aad629d4c08"; // Replace with your own API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.message}`);
      } else {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    fetchWeather(displayedLocation);
  }, [displayedLocation]);

  const handleLocationChange = (event) => {
    setInputLocation(event.target.value);
  };

  const handleSearch = () => {
    setDisplayedLocation(inputLocation);
  };

  const renderWeather = () => {
    if (!weatherData) return null;

    const { name, main, weather } = weatherData;
    const temperature = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const humidity = main.humidity;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
      <div className="weather">
        <h2>Weather in {name}</h2>
        <img src={iconUrl} alt={weather[0].description} />
        <p>Temperature: {temperature}°C</p>
        <p>Feels Like: {feelsLike}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Description: {weather[0].description}</p>
      </div>
    );
  };

  return (
    <div className="home">
      <Header />

      <div className="content">
        <section>
          <img
            src="https://img.freepik.com/premium-photo/3d-rendering-search-icon-cartoon-character-holds-large-lens-with-magnifying-glass-clip-art-business-science-highlighted-white-background_728202-1240.jpg"
            alt="weather-app"
            className="image-girl"
          />
        </section>
        <section>
          <input
            placeholder="Enter location"
            type="search"
            value={inputLocation}
            className="input-element"
            onChange={handleLocationChange}
          />
          <button type="button" onClick={handleSearch}>
            Get Weather
          </button>
          {error && <p className="error-message">{error}</p>}
          {weatherData && renderWeather()}
          <WeatherContext.Provider value={{ weatherData, error }}>
            {/* other components can use WeatherContext here */}
          </WeatherContext.Provider>
        </section>
      </div>
    </div>
  );
}

export default Home;
