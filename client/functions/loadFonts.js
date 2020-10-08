import * as Font from "expo-font";

export default fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "roboto-light": require("../assets/fonts/Roboto-Light.ttf"),
    "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "proxima-nova-regular": require("../assets/fonts/Proxima-Nova-Regular.otf"),
    "proxima-nova-condensed-black": require("../assets/fonts/Proxima-Nova-Condensed-Black.otf"),
    "proxima-nova-bold": require("../assets/fonts/Proxima-Nova-Bold.otf"),
    "proxima-nova-alt-extra-condensed-light": require("../assets/fonts/Proxima-Nova-Alt-Extra-Condensed-Light.otf"),
    "proxima-nova-light": require("../assets/fonts/Proxima-Nova-Light.otf"),
    "proxima-nova-semibold": require("../assets/fonts/Proxima-Nova-Semibold.otf"),
    "proxima-nova-alt-extra-condensed-semibold": require("../assets/fonts/Proxima-Nova-Alt-Extra-Condensed-Semibold.otf")
  });
};
