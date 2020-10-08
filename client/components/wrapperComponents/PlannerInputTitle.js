import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const PlannerInputTitle = props => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    padding: 15,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 7
  },
  title: {
    fontSize: 20,
    fontFamily: "roboto-light",
    textAlign: "center"
  }
});

export default PlannerInputTitle;
