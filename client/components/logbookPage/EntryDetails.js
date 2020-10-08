import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { makeShortDate } from "../../functions/timeFormatting";
import { FontAwesome } from "@expo/vector-icons";

const Line = props => {
  return (
    <View style={styles.line}>
      <FontAwesome
        name={props.icon}
        color={Colors.lightAzure}
        size={20}
        style={styles.icon}
      />
      <Text style={{ color: Colors.tertiary }}>{props.text}</Text>
    </View>
  );
};

const EntryDetails = props => {
  const { entry } = props;

  return (
    <View style={styles.details}>
      <Line icon="calendar" text={makeShortDate(entry.date)} />
      <Line
        icon="clock-o"
        text={` ${entry.departureTime} - ${entry.arrivalTime}`}
      />
      <Line
        icon="map"
        text={` ${entry.from.toUpperCase()}-${entry.to.toUpperCase()}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    marginLeft: 20
  },
  line: {
    flexDirection: "row",
    padding: 4
  },
  icon: {
    marginRight: 7
  }
});

export default EntryDetails;
