import React, { useContext, useMemo, useEffect } from "react";
import { WeatherContext } from "../WeatherContext";
import "./index.css"; // Import your CSS file

const Traveller = () => {
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
    <div className="traveller">
      <h2>Travel Tips for Today</h2>
      {formattedWeatherData && (
        <>
          {formattedWeatherData.temperature > 30 && (
            <p className="hot-weather">
              Hot weather ahead! Pack light, breathable clothing. Stay hydrated
              and seek shade during peak sun hours. Consider these activities:
              <ul>
                <li>Visit museums or historical sites.</li>
                <li>Enjoy water activities like swimming or kayaking.</li>
                <li>Explore scenic viewpoints for breathtaking views.</li>
              </ul>
            </p>
          )}
          {formattedWeatherData.rainfall > 5 && (
            <p className="rainy-weather">
              Looks like rain! Pack a raincoat, umbrella, and waterproof shoes.
              Be cautious of slippery surfaces. Consider these options:
              <ul>
                <li>Visit indoor attractions like museums or art galleries.</li>
                <li>Enjoy a cozy cafe or restaurant experience.</li>
                <li>Explore local markets or shops for unique souvenirs.</li>
              </ul>
            </p>
          )}
          {formattedWeatherData.temperature <= 30 &&
            formattedWeatherData.rainfall <= 5 && (
            <p className="pleasant-weather">
              Perfect travel weather! Enjoy exploring outdoors. Pack comfortable
              shoes and clothing suitable for the activities you plan. Here are
              some ideas:
              <ul>
                <li>Go hiking or biking for an active adventure.</li>
                <li>Visit historical landmarks or cultural attractions.</li>
                <li>Relax on a beach or enjoy a scenic picnic.</li>
              </ul>
            </p>
           )}
           
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtboriNEt76KtJwgjlzlDFwds6l4Dm94K1CYKNqbgRg0G8UkwZvo6qvHHQWXFlA2QpBA&usqp=CAU" alt="travel" className="travellers"/>
       
        </>
      )}
    </div>
  );
};

export default Traveller;
