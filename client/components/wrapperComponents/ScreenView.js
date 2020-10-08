import React from "react";
import { View, StyleSheet } from "react-native";
import DismissKeyboard from "./DismissKeyboard";

const ScreenView = props => {
  return (
    <DismissKeyboard>
      <View style={{ ...styles.screen, ...props.style }}>{props.children}</View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

export default ScreenView;
