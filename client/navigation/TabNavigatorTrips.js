import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome } from "@expo/vector-icons";
//for Android!
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform } from "react-native";
import TripsScreen from "../components/tripsPage/TripsPage";
import StatsScreen from "../components/tripsPage/StatsPage";
import Colors from "../constants/colors";
import { createStackNavigator } from "react-navigation-stack";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "ios" ? "white" : Colors.secondary
  },
  headerTintColor: Platform.OS === "ios" ? Colors.secondary : "white"
};

const TripsNavigator = createStackNavigator(
  {
    Trips: {
      screen: TripsScreen,
      navigationOptions: {
        headerTitle: "My trips"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const StatsNavigator = createStackNavigator(
  {
    Stats: {
      screen: StatsScreen,
      navigationOptions: {
        headerTitle: "My paddles in numbers"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const tabScreenConfig = {
  "My trips": {
    screen: TripsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        // Tabinfo is given to us by RN. Among others, it contains the tintColor we set up below (activeTintColor)
        return <FontAwesome name="map" color={tabInfo.tintColor} size={22} />;
      },
      // this will only apply in Material tabBar for Android
      tabBarColor: Colors.secondary
    }
  },
  "My stats": {
    screen: StatsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <FontAwesome name="bar-chart-o" color={tabInfo.tintColor} size={22} />
        );
      },
      tabBarColor: Colors.secondary
    }
  }
};

const TabNavigatorTrips =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.secondary,
          style: {
            height: 55
          }
        }
      });

export default TabNavigatorTrips;
