import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const HighlightUnderline = props => {
  return (
    <View style={{ ...styles.userName, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  userName: {
    padding: 4,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 6
  }
});

export default HighlightUnderline;
