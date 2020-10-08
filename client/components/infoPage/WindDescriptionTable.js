import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { windDescriptionTable } from "../../assets/windConversionTable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";

const Row = props => {
  const { windSpeed, label, effectLand, effectsSea } = props.condition;
  console.log(props.condition);
  return (
    <View style={styles.rowContainer}>
      <View style={styles.label}>
        <View style={styles.windSpeed}>
          <MaterialCommunityIcons
            name="weather-windy"
            size={30}
            color={Colors.lightAzure}
          />
          <Text style={{ ...TextStyles.boldTitle, ...styles.windSpeedText }}>
            {windSpeed}
            <Text style={{ fontSize: 14 }}> KN</Text>
          </Text>
        </View>
        <Text style={{ ...styles.conditionLabel }}>{label}</Text>
      </View>

      <View style={styles.details}>
        <Text style={{ ...TextStyles.label }}>Effects on sea</Text>
        <Text>{effectsSea}</Text>
      </View>
      <View>
        <Text style={{ ...TextStyles.label }}>Effects on land</Text>
        <Text>{effectLand}</Text>
      </View>
    </View>
  );
};

const WindDescriptionTable = props => {
  return (
    <View>
      {windDescriptionTable.map(condition => (
        <Row condition={condition} key={condition.label} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    marginVertical: 20
  },
  label: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center"
  },
  windSpeed: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
    borderRightColor: Colors.textLightGrey,
    borderRightWidth: 1
  },
  windSpeedText: {
    paddingLeft: 10,
    fontSize: 22,
    color: Colors.darkest
  },
  conditionLabel: {
    paddingLeft: 15
  },
  details: {
    paddingVertical: 15
  }
});

export default WindDescriptionTable;
