import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import useOpenPaddlesHook from "../../functions/openPaddlesHook";

const MapScreen = props => {
  const [openSessions, isLoading] = useOpenPaddlesHook();
  console.log("OPEN SESSIONS", openSessions);
  const lastPositions = !openSessions
    ? null
    : openSessions
        .filter(session => session.lastLatitude && session.lastLongitude)
        .map(session => {
          const coordsObj = {};
          coordsObj.latitude = session.lastLatitude;
          coordsObj.longitude = session.lastLongitude;
          coordsObj.timestamp = session.lastLocationTimeStamp;
          return coordsObj;
        });

  const latitude = props.navigation.getParam("latitude");
  const longitude = props.navigation.getParam("longitude");

  const mapRegion = {
    latitude: latitude ? latitude : 35.9375,
    longitude: longitude ? longitude : 14.3754,
    latitudeDelta: latitude ? 0.0922 : 0.1,
    longitudeDelta: longitude ? 0.0421 : 0.47
  };

  return (
    <MapView region={mapRegion} style={{ flex: 1 }} mapType="satellite">
      {lastPositions &&
        lastPositions.map((position, index) => (
          <Marker
            key={index.toString()}
            title="location"
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude
            }}
            description="Paddler is here"
            pinColor={Colors.primary}
          />
        ))}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
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

export default MapScreen;
