import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
//for Android!
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform } from "react-native";
import LogbookScreen from "../components/logbookPage/LogbookPage";
import CurrentlyPaddlingScreen from "../components/logbookPage/CurrentlyPaddling";
import Colors from "../constants/colors";
import { createStackNavigator } from "react-navigation-stack";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "ios" ? "white" : Colors.secondary
  },
  headerTintColor: Platform.OS === "ios" ? Colors.secondary : "white"
};

const LogbookNavigator = createStackNavigator(
  {
    Logbook: {
      screen: LogbookScreen,
      navigationOptions: {
        headerTitle: "Logbook"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const CurrentlyPaddlingNavigator = createStackNavigator(
  {
    CurrentlyPaddling: {
      screen: CurrentlyPaddlingScreen,
      navigationOptions: {
        headerTitle: "Who's paddling now"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const tabScreenConfig = {
  Logbook: {
    screen: LogbookNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        // Tabinfo is given to us by RN. Among others, it contains the tintColor we set up below (activeTintColor)
        return (
          <MaterialCommunityIcons
            name="book-open"
            color={tabInfo.tintColor}
            size={22}
          />
        );
      },
      // this will only apply in Material tabBar for Android
      tabBarColor: Colors.secondary
    }
  },
  "Who's paddling now": {
    screen: CurrentlyPaddlingNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <FontAwesome name="map-pin" color={tabInfo.tintColor} size={22} />
        );
      },
      tabBarColor: Colors.secondary
    }
  }
};

const TabNavigatorLogbook =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.secondary,
          style: {
            // paddingVertical: 10,
            height: 55
          }
        }
      });

export default TabNavigatorLogbook;
