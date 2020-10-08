import React from "react";
import { Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import SubmitButton from "../wrapperComponents/SubmitButton";
import ScreenView from "../wrapperComponents/ScreenView";

const ModalInput = props => {
  return (
    <ScreenView style={{ backgroundColor: Colors.tertiary }}>
      <Text
        style={{ ...TextStyles.bodyHeading, color: "white", marginBottom: 30 }}
      >
        {props.title}
      </Text>
      <TextInput
        keyboardType="number-pad"
        placeholder={props.placeholder}
        style={styles.input}
        onChangeText={text => props.stateFunction(text)}
      />
      <SubmitButton
        title={props.buttonTitle}
        style={{
          ...styles.button,
          backgroundColor: Colors.primary,
          alignSelf: "center"
        }}
        function={props.modalClosingFunction}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 50,
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    fontSize: 50,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 10,
    borderColor: Colors.secondary,
    backgroundColor: Colors.textLightestGrey,
    color: Colors.textDarkGrey,
    alignSelf: "center",
    textAlign: "center"
  }
});

export default ModalInput;
