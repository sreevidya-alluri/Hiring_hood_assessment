import React, { useContext, useMemo, useEffect } from "react";
import { WeatherContext } from "../WeatherContext";
import "./index.css"

const Farmers = () => {
  const { weatherData } = useContext(WeatherContext);

  const formattedWeatherData = useMemo(() => {
    if (!weatherData) return null;

    const { main = {}, weather = [] } = weatherData;
    const temperature = Math.round(main.temp);
    const rainfall = weather[0]?.rain?.['1h'] || 0; // Assuming rain data structure
    const humidity = main.humidity;
    
    return { temperature, humidity, rainfall };
  }, [weatherData]);

  const cropSuggestions = useMemo(() => {
    if (!formattedWeatherData) return [];

    const suggestions = [];
    const { temperature, humidity, rainfall } = formattedWeatherData;

    if (temperature > 30) {
      suggestions.push("Consider planting heat-tolerant crops like millet and sorghum.");
    }
    if (rainfall > 5) {
      suggestions.push("Ensure proper drainage to protect crops from waterlogging. Rice,Taro would be good");
    }
    if (humidity > 60) {
      suggestions.push(`The dew point is currently at ${humidity} degrees Celsius, indicating a high saturation of moisture in the air. Okra,potatoes,watermelon would be good`);
    }

    return suggestions;
  }, [formattedWeatherData]);

  useEffect(() => {
    console.log("Weather data updated:", weatherData); // Optional for debugging
  }, [weatherData]);

  return (
    <div className="farmers">
      <h2 className="alert">ALERT!</h2>
      {formattedWeatherData && ( 
        <>

          {formattedWeatherData.rainfall > 5 && (
            <p className="heavy-rain">Heavy Rainfall Warning: {formattedWeatherData.rainfall} mm in the last hour.</p>
          )}
          {formattedWeatherData.temperature > 30 && (
            <p className="high-temp">Warning: High temperatures. Ensure proper hydration and adjust workload.</p>
          )}
          {formattedWeatherData.humidity > 60 && (
            <p className="high-humidity">High Humidity: Be aware of potential for fungal diseases.</p>
          )}
          
          {cropSuggestions.length > 0 && (
            <div className="crops-suggestion">
              <h3>Crop Suggestions:</h3>
              <ul>
                {cropSuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          <img src="https://i.pinimg.com/736x/d1/53/cd/d153cd1937b7ff8213af59487a068567.jpg" className="farmers-img" alt="farmers"/>
          
        </>
      )}
    </div>
  );
};

export default Farmers;
