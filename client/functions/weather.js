import { useState, useEffect } from "react";
import apiURL from "../assets/apiUrl";

export const getTodayWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = `${apiURL}/api/weather/one`;

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => setWeatherData(data))
        .then(() => setIsLoading(false));
    } catch (err) {
      throw err;
    }
  }, []);

  return [weatherData, isLoading];
};
