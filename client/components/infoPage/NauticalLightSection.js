import React from "react";
import { Platform } from "react-native";
import ScreenView from "../wrapperComponents/ScreenView";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import LightVisualiser from "./Lighting/LightVisualiser";

const NauticalLightSection = () => {
  return (
    <ScreenView>
      <LightVisualiser />
    </ScreenView>
  );
};

NauticalLightSection.navigationOptions = navData => {
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

export default NauticalLightSection;
