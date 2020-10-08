import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Highlight = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <Text style={{ ...styles.value, ...props.textStyle }}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    borderLeftColor: Colors.lightAzure,
    borderRightColor: Colors.lightAzure,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 20
  },
  label: {
    fontSize: 12,
    color: Colors.textLightGrey
  },
  value: {
    fontSize: 35,
    color: Colors.textDarkGrey
  }
});

export default Highlight;
