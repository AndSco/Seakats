import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>SeaKats App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    height: 80
  },
  headerTitle: {
    color: "white",
    fontFamily: "staatliches",
    marginTop: 25,
    fontSize: 25
  }
});

export default Header;
