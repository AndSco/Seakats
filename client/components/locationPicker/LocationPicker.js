import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import SubmitButton from "../wrapperComponents/SubmitButton";
import Spinner from "../UIComponents/Spinner";
import { useSelector } from "react-redux";
import axios from "axios";
import apiURL from "../../assets/apiUrl";

const LocationPicker = props => {
  const [currentLocation, setCurrentLocation] = useState();
  const [isLoading, setIsLoading] = useState();
  const currentSessionId = useSelector(store => store.session._id);

  console.log("Current Session", currentSessionId);

  const updateCoordsInSession = async (latitude, longitude, timestamp) => {
    try {
      const response = await axios.patch(
        `${apiURL}/api/session/${currentSessionId}/updatePosition`,
        { latitude: latitude, longitude: longitude, timestamp: timestamp }
      );

      const resData = response.data;
      console.log("POSITION UPDATE", resData);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => console.log("location", currentLocation), [currentLocation]);

  const verifyPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.LOCATION);
    if (response.status !== "granted") {
      Alert.alert(
        "Permission refused",
        "We use the location in case in you don't check out from a paddle",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsLoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setCurrentLocation(location);
      updateCoordsInSession(
        location.coords.latitude,
        location.coords.longitude,
        location.timestamp
      );
    } catch (err) {
      Alert.alert("Something went wrong", `${err.message}`, [{ text: "OK" }]);
    }
    setIsLoading(false);
  };

  return (
    <View style={{ ...styles.container, ...props.style }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Text>
          {currentLocation
            ? `${currentLocation.coords.latitude} - ${currentLocation.coords.longitude}`
            : "No coordinates yet"}
        </Text>
      )}
      <SubmitButton
        title="UPDATE YOUR POSITION"
        function={getLocation}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    width: "100%"
  }
});

export default LocationPicker;
