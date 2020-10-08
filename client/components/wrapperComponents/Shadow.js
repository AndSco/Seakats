import React from "react";
import { View, StyleSheet } from "react-native";

const Shadow = props => {
  return <View style={styles.shadow}>{props.children}</View>;
};

const styles = StyleSheet.create({
  shadow: {
    // SHADOW FOR IOS
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.16,
    // backgroundColor: "white",
    //SHADOW FOR ANDROID
    elevation: 5
  }
});

export default Shadow;
