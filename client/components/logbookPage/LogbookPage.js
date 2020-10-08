import React, { useState, useEffect, useCallback } from "react";
import { View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import axios from "axios";
import Spinner from "../UIComponents/Spinner";
import { groupTripsByDate } from "../../functions/timeFormatting";
import DayGroupedPaddles from "./DayGroupedPaddles";
import useSelectionHook from "../../functions/selectionHook";
import apiURL from "../../assets/apiUrl";

const LogbookPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupedTrips, setGroupedTrips] = useState(null);
  const [whatIsSelected, setWhatIsSelected] = useSelectionHook();

  const setAsSelected = heading => {
    setWhatIsSelected(heading);
  };

  const fetchTrips = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiURL}/api/trips`);
      const trips = await response.data;
      const grouped = await groupTripsByDate(trips);
      setGroupedTrips(grouped);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    if (groupedTrips) {
      groupedTrips.map(trip => {
        console.log("date", trip.date);
        trip.trips.map(trip => console.log(trip.from));
      });
    }
  }, [groupedTrips]);

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <DayGroupedPaddles
          days={groupedTrips}
          isLoading={isLoading}
          fetchTrips={fetchTrips}
          whatIsSelected={whatIsSelected}
          setAsSelected={setAsSelected}
        />
      )}
    </View>
  );
};

LogbookPage.navigationOptions = navData => {
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

export default LogbookPage;
