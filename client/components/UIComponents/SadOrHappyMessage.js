import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";

const SadOrHappyMessage = props => {
  return (
    <View style={styles.container}>
      <Text style={{ ...TextStyles.boldTitle, textAlign: "center" }}>
        {props.mainMessage}
      </Text>
      <Text style={{ ...TextStyles.secondaryDetails, textAlign: "center" }}>
        {props.restOfMessage}
      </Text>
      <Entypo
        name={props.sad ? "emoji-sad" : "emoji-happy"}
        size={120}
        color={Colors.lightAzure}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20
  }
});

export default SadOrHappyMessage;
