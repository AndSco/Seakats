import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import WeatherBox from "./WeatherBox";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "../UIComponents/Spinner";
import apiURL from "../../assets/apiUrl";

const WeatherPage = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [forecastDay, setForecastDay] = useState("one");
  const [weatherData, setWeatherData] = useState(null);

  const getNextDayForecastHandler = () => {
    if (forecastDay === "one") {
      setForecastDay("two");
    } else if (forecastDay === "two") {
      setForecastDay("three");
    }
    return;
  };

  const getPreviousDayForecastHandler = () => {
    if (forecastDay === "one") {
      return;
    } else if (forecastDay === "two") {
      setForecastDay("one");
    } else if (forecastDay === "three") {
      setForecastDay("two");
    }
    return;
  };

  const apiUrl = `${apiURL}/api/weather/${forecastDay}`;

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => setWeatherData(data))
        .then(() => setIsLoading(false));
    } catch (err) {
      console.log(err);
      throw err;
    }
  }, [forecastDay]);

  return isLoading ? (
    <Spinner style={{ marginTop: "35%" }} />
  ) : (
    <WeatherBox
      dataObject={weatherData}
      dayNumber={forecastDay}
      getNextDayForecast={getNextDayForecastHandler}
      getPreviousDayForecast={getPreviousDayForecastHandler}
    />
  );
};

WeatherPage.navigationOptions = navData => {
  return {
    headerLeft: (
      <Ionicons
        name="ios-menu"
        style={{ paddingHorizontal: 16 }}
        size={30}
        color={Platform.OS === "android" ? "white" : Colors.secondary}
        onPress={() => navData.navigation.toggleDrawer()}
      />
    )
  };
};

export default WeatherPage;
