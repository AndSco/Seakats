import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import ScreenView from "../wrapperComponents/ScreenView";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const InfoPage = () => {
  return (
    <ScreenView>
      <Text>Here will be useful info</Text>
    </ScreenView>
  );
};

InfoPage.navigationOptions = navData => {
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

const styles = StyleSheet.create({});

export default InfoPage;
