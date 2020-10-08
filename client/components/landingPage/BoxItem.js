import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Shadow from "../wrapperComponents/Shadow";

const BoxItem = props => {
  return (
    <TouchableOpacity onPress={props.function}>
      <Shadow>
        <View
          style={{
            ...styles.box,
            ...props.style,
            backgroundColor: props.bgroundColor
          }}
        >
          {props.needsBadge && props.badgeNumber > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{props.badgeNumber}</Text>
            </View>
          )}
          <Text style={{ ...TextStyles.heading, ...styles.text }}>
            {props.title}
          </Text>
          {props.iconType === "fontAwesome" && (
            <FontAwesome
              name={props.iconName}
              color="white"
              size={33}
              style={styles.icon}
            />
          )}
          {props.iconType === "materialCommunity" && (
            <MaterialCommunityIcons
              name={props.iconName}
              color="white"
              size={33}
              style={styles.icon}
            />
          )}
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 140,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 8
  },
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 15
  },
  badge: {
    position: "absolute",
    top: 0,
    left: -6,
    backgroundColor: Colors.warning,
    padding: 5,
    borderRadius: 15,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.16,
    elevation: 5
  },
  badgeText: {
    fontSize: 18,
    color: "white",
    fontFamily: "proxima-nova-semibold"
  }
});

export default BoxItem;
