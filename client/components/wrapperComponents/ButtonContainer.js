import React from "react";
import { View, StyleSheet } from "react-native";

const ButtonContainer = props => {
  let buttonAlignment = "space-between";

  if (props.moveRight) {
    buttonAlignment = "center";
  }

  return (
    <View
      style={{
        ...styles.buttonContainer,
        ...props.style,
        justifyContent: buttonAlignment
      }}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 15
  }
});

export default ButtonContainer;
