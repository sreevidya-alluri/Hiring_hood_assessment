import React, { useContext, useMemo, useEffect } from "react";
import { WeatherContext } from "../WeatherContext";
import "./index.css"; // Import your CSS file

const EventPlanner = () => {
  const { weatherData } = useContext(WeatherContext);

  const formattedWeatherData = useMemo(() => {
    if (!weatherData) return null; // Return null if no weather data

    const { main = {}, weather = [] } = weatherData;
    const temperature = Math.round(main.temp);
    const rainfall = weather[0]?.rain?.["1h"] || 0; // Assuming rain data structure

    return { temperature, rainfall };
  }, [weatherData]);

  useEffect(() => {
    console.log("Weather data updated:", weatherData); // Optional for debugging
  }, [weatherData]);

  return (
    <div className="event-planner">
      <h2>Plan Your Perfect Event</h2>
      {formattedWeatherData && (
        <>
          {formattedWeatherData.temperature > 25 && ( // Access temperature
            <p className="hot-weather">
              It's a hot one! Consider these options:
              <ul>
                <li>Pool party or water games to cool down.</li>
                <li>Outdoor movie night with cooling fans.</li>
                <li>Shady location with plenty of water for guests.</li>
              </ul>
            </p>
          )}
          {formattedWeatherData.rainfall > 2 && ( // Access rainfall
            <p className="rainy-weather">
              Looks like rain! Plan for an indoor venue or:
              <ul>
                <li>Tent or covered area for outdoor events.</li>
                <li>Backup plan for indoor activities in case of heavy rain.</li>
                <li>Umbrellas or raincoats for guests.</li>
              </ul>
            </p>
          )}
          {formattedWeatherData.temperature <= 25 && // Access temperature and rainfall
            formattedWeatherData.rainfall <= 2 && (
            <p className="pleasant-weather">
              Perfect weather! Enjoy these event ideas:
              <ul>
                <li>Outdoor games and activities.</li>
                <li>Barbecue or picnic setting.</li>
                <li>No need for special weather precautions.</li>
              </ul>
            </p>
          )}
        </>
      )}
      <img src="https://thumbs.dreamstime.com/b/event-management-abstract-concept-vector-illustration-corporate-party-planning-service-software-meeting-organizer-production-266952156.jpg" alt='event-planners' className="event"/>
    </div>
  );
};

export default EventPlanner;
