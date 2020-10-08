import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";

const ListItem = props => {
  return (
    <View style={styles.item}>
      <Text style={{ ...TextStyles.bodyText, color: Colors.textLightGrey }}>
        {props.label}
      </Text>
      <Text style={{ ...TextStyles.bodyText, color: Colors.textDarkGrey }}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    width: "100%",
    padding: 5,
    justifyContent: "space-between"
  }
});

export default ListItem;
