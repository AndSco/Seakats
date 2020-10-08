import React from "react";
import { View, StyleSheet } from "react-native";

const Light = props => {
  return (
    <View style={styles.lightContainer}>
      <View
        style={{
          ...styles.light,
          backgroundColor: props.fixed
            ? props.color
            : props.occulting && !props.condition
            ? props.color
            : props.occulting && props.condition
            ? "black"
            : props.alternating && props.condition
            ? props.firstColor
            : props.alternating && !props.condition
            ? props.secondColor
            : !props.condition
            ? "black"
            : props.color
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    paddingVertical: 10
  },
  light: {
    height: 140,
    width: 140,
    borderRadius: 70
  }
});

export default Light;
