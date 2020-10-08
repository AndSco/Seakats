import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const INPUT_RESET = "RESET_FORM";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };

    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };

    case INPUT_RESET:
      return {
        value: "",
        isValid: false,
        touched: false
      };

    default:
      return state;
  }
};

const Input = props => {
  const initialState = {
    value: "",
    isValid: false,
    touched: false
  };

  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const { isThereError } = props;
  // If there was an error, reset form
  useEffect(() => {
    if (isThereError) {
      console.log("error from props", props.isThereError);
      dispatch({
        type: INPUT_RESET
      });
    }
  }, [isThereError]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid
    });
  };

  const inputLostFocus = () => {
    dispatch({
      type: INPUT_BLUR
    });
  };

  const { onInputChange, id } = props;
  // If the input has been filled up, send the info to parent component!
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onBlur={inputLostFocus}
        onChangeText={textChangeHandler}
        autoCorrect={false}
      />
      {!inputState.isValid && inputState.touched && (
        <Text style={styles.error}>{props.errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    paddingVertical: 20
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderBottomColor: Colors.textLightGrey,
    borderBottomWidth: 0.6,
    width: "100%"
  },
  label: {
    color: Colors.textLightGrey,
    fontSize: 14
  },
  error: {
    fontSize: 10,
    color: Colors.warning,
    padding: 2
  }
});

export default Input;
