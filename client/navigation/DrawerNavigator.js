import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import {
  PlannerNavigator,
  ProfileNavigator,
  LandingNavigator,
  WeatherNavigator,
  AlertNavigator,
  MapNavigator
} from "./ScreensNavigators";
import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import TabNavigatorInfo from "./TabNavigatorInfo";
import { useDispatch } from "react-redux";
import Colors from "../constants/colors";
import { logout } from "../store/actions/auth";
import TabNavigatorLogbook from "./TabNavigatorLogbook";
import TabNavigatorTrips from "./TabNavigatorTrips";
import TextStyles from "../constants/textStyles";
import TopMenuDrawer from "./TopMenuDrawer";

const DrawerNavigator = createDrawerNavigator(
  {
    Landing: {
      screen: LandingNavigator,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="home" color={tintColor} size={23} />
        )
      }
    },
    PaddlePlanner: {
      screen: PlannerNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="waves" color={tintColor} size={23} />
        )
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="user" color={tintColor} size={23} />
        )
      }
    },
    "Useful Info & Tools": {
      screen: TabNavigatorInfo,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="info-circle" color={tintColor} size={23} />
        )
      }
    },
    Trips: {
      screen: TabNavigatorTrips,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="map" color={tintColor} size={23} />
        ),
        drawerLabel: "My Trips"
      }
    },
    Logbook: {
      screen: TabNavigatorLogbook,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="book-open"
            color={tintColor}
            size={23}
          />
        ),
        drawerLabel: "Club Logbook"
      }
    },
    Weather: {
      screen: WeatherNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="weather-windy"
            color={tintColor}
            size={23}
          />
        ),
        drawerLabel: "Weather in Malta"
      }
    },
    Alert: {
      screen: AlertNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="alert-circle-outline"
            color={tintColor}
            size={23}
          />
        ),
        drawerLabel: "Active alerts"
      }
    },
    Map: {
      screen: MapNavigator,
      navigationOptions: {
        drawerLabel: "Map",
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="map-marker" color={tintColor} size={23} />
        )
      }
    }
  },
  {
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 30, paddingBottom: 20 }}>
          <TopMenuDrawer navigation={props.navigation} />
          <View style={{ flex: 1 }}>
            <DrawerNavigatorItems {...props} />
          </View>
          <TouchableOpacity
            style={{
              justifyContent: "flex-end",
              alignItems: "center"
            }}
            onPress={() => {
              dispatch(logout());
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary,
                width: "100%",
                padding: 10,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  ...TextStyles.boldTitle,
                  color: "white",
                  fontSize: 20
                }}
              >
                LOG OUT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
);

export default DrawerNavigator;
