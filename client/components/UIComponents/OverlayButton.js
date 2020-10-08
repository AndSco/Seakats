import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const OverlayButton = props => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  return (
    <View style={{ ...styles.container, ...props.containerStyle }}>
      <TouchableWithoutFeedback
        style={{
          ...styles.button,
          borderTopRightRadius: isConfirmationOpen ? 0 : 30,
          borderBottomRightRadius: isConfirmationOpen ? 0 : 30
        }}
        onPress={() => setIsConfirmationOpen(!isConfirmationOpen)}
      >
        <FontAwesome name="trash" color={Colors.fourthiary} size={30} />
      </TouchableWithoutFeedback>
      {isConfirmationOpen && (
        <View style={styles.confirmationBox}>
          <Text style={{ ...TextStyles.secondaryDetails, ...styles.text }}>
            {props.taskDescription}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={props.function}>
              <FontAwesome
                name="check"
                size={30}
                color="white"
                style={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsConfirmationOpen(false)}>
              <FontAwesome
                name="remove"
                size={30}
                color={Colors.lightAzure}
                style={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 60,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 10
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: Colors.lightAzure,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmationBox: {
    backgroundColor: Colors.secondary,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30
  },
  text: {
    textTransform: "uppercase",
    color: "white"
    // fontWeight: "bold"
  }
});

export default OverlayButton;
