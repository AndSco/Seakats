import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "../components/loginForm/AuthForm";
import DrawerNavigator from "./DrawerNavigator";
import { AlertNavigator } from "./ScreensNavigators";
import StartupScreen from "../components/startupScreen/StartupScreen";

// SWITCH NAVIGATOR FOR LOGIN - 1st
const SwitchNavigator = createSwitchNavigator({
  Startup: {
    screen: StartupScreen
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: "SeaKats"
    }
  },
  Landing: DrawerNavigator,
  Alerts: AlertNavigator
});

export default createAppContainer(SwitchNavigator);
