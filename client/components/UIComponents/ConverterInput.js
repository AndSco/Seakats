import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import TextStyles from "../../constants/textStyles";

const ConverterInput = props => {
  return (
    <View style={styles.line}>
      <Text
        style={{
          ...TextStyles.bodyText,
          fontSize: 15,
          textTransform: "uppercase"
        }}
      >
        {props.label}
      </Text>
      <TextInput
        placeholder={props.label}
        keyboardType="decimal-pad"
        style={TextStyles.textInput}
        value={props.value}
        onChangeText={text => props.handleChange(text, props.label)}
        onFocus={props.resetForms}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default ConverterInput;
