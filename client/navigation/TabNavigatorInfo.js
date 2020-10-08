import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
//for Android!
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform } from "react-native";
import NumbersScreen from "../components/infoPage/NumbersSection";
import ConvertersScreen from "../components/infoPage/ConvertersSection";
import NauticalLightScreen from "../components/infoPage/NauticalLightSection";
import Colors from "../constants/colors";
import { createStackNavigator } from "react-navigation-stack";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "ios" ? "white" : Colors.secondary
  },
  headerTintColor: Platform.OS === "ios" ? Colors.secondary : "white"
};

const UsefulNumbersNavigator = createStackNavigator(
  {
    UsefulNumbers: {
      screen: NumbersScreen,
      navigationOptions: {
        headerTitle: "Useful Info & Tools"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const NauticalLighNavigator = createStackNavigator(
  {
    UsefulNumbers: {
      screen: NauticalLightScreen,
      navigationOptions: {
        headerTitle: "Nautical Lights"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const ConvertersNavigator = createStackNavigator(
  {
    UsefulNumbers: {
      screen: ConvertersScreen,
      navigationOptions: {
        headerTitle: "Converters"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

const tabScreenConfig = {
  "Useful Info": {
    screen: UsefulNumbersNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        // Tabinfo is given to us by RN. Among others, it contains the tintColor we set up below (activeTintColor)
        return (
          <MaterialCommunityIcons
            name="radio-handheld"
            color={tabInfo.tintColor}
            size={22}
          />
        );
      },
      // this will only apply in Material tabBar for Android
      tabBarColor: Colors.secondary
    }
  },
  Converters: {
    screen: ConvertersNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <FontAwesome name="calculator" color={tabInfo.tintColor} size={22} />
        );
      },
      tabBarColor: Colors.secondary
    }
  },
  "Nautical Lights": {
    screen: NauticalLighNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <MaterialCommunityIcons
            name="lighthouse-on"
            color={tabInfo.tintColor}
            size={22}
          />
        );
      },
      tabBarColor: Colors.secondary
    }
  }
};

const TabBarNavigator =
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

export default TabBarNavigator;
