import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextStyles from "../../constants/textStyles";

const LineInList = props => {
  return (
    <View style={styles.details}>
      <Text style={{ ...TextStyles.label }}>{props.label}</Text>
      <Text>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    paddingBottom: 15
  }
});

export default LineInList;
