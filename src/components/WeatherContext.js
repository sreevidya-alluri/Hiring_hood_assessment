import React, { createContext, useState, useEffect } from "react";
const WeatherContext = createContext({ weatherData: null });

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (setWeatherData) => { // Receive setWeatherData
    const location = "Hyderabad"; // Or use state for user input
    const apikey = "9ec58e5a6b655d055afe1aad629d4c08"; // Replace with your API key

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching weather:", errorData.message);
      } else {
        const data = await response.json();
        setWeatherData(data); 
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    fetchWeather(setWeatherData); // Call fetchWeather on component mount
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
export { WeatherContext };
