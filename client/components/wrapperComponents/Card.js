import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    // SHADOW FOR IOS
    shadowColor: Colors.secondary,
    shadowOffset: {
      width: 1.5,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 0.12,
    backgroundColor: "white",
    //SHADOW FOR ANDROID
    elevation: 3,
    borderColor: Colors.textLightestGrey,
    borderWidth: 1,
    marginBottom: 30,
    width: "100%",
    padding: 20,
    paddingBottom: 30
  }
});

export default Card;
