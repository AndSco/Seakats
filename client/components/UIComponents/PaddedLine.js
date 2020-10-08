import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const PaddedLine = props => {
  return (
    <View style={{ paddingBottom: 5 }}>
      <Text style={{ ...styles.text, ...props.textStyles }}>
        {props.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.textLightestGrey,
    fontSize: 16,
    lineHeight: 24
  }
});

export default PaddedLine;
