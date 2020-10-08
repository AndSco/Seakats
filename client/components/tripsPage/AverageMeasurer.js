import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const Icon = props => {
  if (props.iconCategory === "fontAwesome") {
    return (
      <FontAwesome name={props.name} size={25} color={Colors.textDarkGrey} />
    );
  } else if (props.iconCategory === "feather") {
    return <Feather name={props.name} size={25} color={Colors.textDarkGrey} />;
  } else if (props.iconCategory === "materialIcons") {
    return (
      <MaterialIcons name={props.name} size={25} color={Colors.textDarkGrey} />
    );
  }
};

const AverageMeasurer = props => {
  return (
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.container}>
        <Icon iconCategory={props.iconLeftCategory} name={props.iconLeft} />
        <View style={styles.line}>
          <View
            style={{
              ...styles.marker,
              left: props.averageValue ? props.averageValue : 0
            }}
          ></View>
        </View>
        <Icon iconCategory={props.iconRightCategory} name={props.iconRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center"
  },
  line: {
    height: 3,
    borderRadius: 8,
    width: 240,
    backgroundColor: Colors.textLightestGrey,
    marginHorizontal: 12
  },
  marker: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: Colors.fourthiary,
    position: "relative",
    bottom: 6
  },
  label: {
    fontSize: 16,
    color: Colors.textLightGrey,
    marginBottom: 15
  }
});

export default AverageMeasurer;
