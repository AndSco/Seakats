import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const UserNameUnderlined = props => {
  return <View style={styles.userName}>{props.children}</View>;
};

const styles = StyleSheet.create({
  userName: {
    padding: 4,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 6
  }
});

export default UserNameUnderlined;
