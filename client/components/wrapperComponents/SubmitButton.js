import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";

const SubmitButton = props => {
  let TouchableWrapper = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableWrapper = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableWrapper onPress={props.function}>
        <View style={{ ...styles.submitButton, ...props.style }}>
          <Text
            style={{
              ...styles.title,
              ...TextStyles.buttonText,
              ...props.textStyle
            }}
          >
            {props.title}
          </Text>
        </View>
      </TouchableWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 15,
    overflow: "hidden"
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginTop: 15,
    borderRadius: 15,
    width: 110
  },
  title: {
    color: "white",
    textAlign: "center"
  }
});

export default SubmitButton;
