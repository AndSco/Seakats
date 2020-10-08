import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import Colors from "../constants/colors";
import PaddlePlannerScreen from "../components/planner/PaddlePlanner";
import ProfileScreen from "../components/profilePage/ProfilePage";
import LandingScreen from "../components/landingPage/LandingPage";
import AlertScreen from "../components/alertScreen/AlertScreen";
import WeatherScreen from "../components/weatherPage/WeatherPage";
import TabNavigatorInfo from "./TabNavigatorInfo";
import TabNavigatorLogbook from "./TabNavigatorLogbook";
import TabNavigatorTrips from "./TabNavigatorTrips";

import MapScreen from "../components/locationPicker/MapScreen";

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "ios" ? "white" : Colors.secondary
  },
  headerTintColor: Platform.OS === "ios" ? Colors.secondary : "white"
};

export const MapNavigator = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        headerTitle: "Map"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const PlannerNavigator = createStackNavigator(
  {
    PaddlePlanner: {
      screen: PaddlePlannerScreen,
      navigationOptions: {
        headerTitle: "Planner"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerTitle: "My Profile"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const LandingNavigator = createStackNavigator(
  {
    Landing: {
      screen: LandingScreen,
      navigationOptions: {
        headerTitle: "SeaKats"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const LogbookNavigator = createStackNavigator(
  {
    Logbook: {
      screen: TabNavigatorLogbook,
      navigationOptions: {
        headerTitle: "Club Logbook"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const TripsNavigator = createStackNavigator(
  {
    Trips: {
      screen: TabNavigatorTrips,
      navigationOptions: {
        headerTitle: "My trips"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const InfoNavigator = createStackNavigator(
  {
    Info: {
      screen: TabNavigatorInfo,
      navigationOptions: {
        headerTitle: "Useful info & Tools"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const WeatherNavigator = createStackNavigator(
  {
    Weather: {
      screen: WeatherScreen,
      navigationOptions: {
        headerTitle: "Weather in Malta"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);

export const AlertNavigator = createStackNavigator(
  {
    Alerts: {
      screen: AlertScreen,
      navigationOptions: {
        headerTitle: "Paddling alerts"
      }
    }
  },
  {
    defaultNavigationOptions: defaultStackNavigationOptions
  }
);
