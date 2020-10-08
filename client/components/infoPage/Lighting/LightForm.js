import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  View
} from "react-native";
import Colors from "../../../constants/colors";
import { LightInputProcessor } from "./helperFunctions";
import SubmitButton from "../../wrapperComponents/SubmitButton";

const LightForm = props => {
  const [formInput, setFormInput] = useState("");

  const handleChange = input => {
    setFormInput(input);
  };

  const handleSubmit = () => {
    if (formInput.length < 3) {
      console.log("No valid light");
      return;
    }

    const thereAreErrors = LightInputProcessor.thereAreErrors(formInput);

    if (thereAreErrors) {
      Alert.alert(
        "Something is wrong",
        `Cannot recognise this light... Make sure the characters and spacings are correct.`
      );
      return;
    }

    const generatedLight = LightInputProcessor.generateLight(formInput);

    console.log("GENERATED", generatedLight);
    props.onLightSubmit(generatedLight);
    setFormInput("");
  };

  return (
    <View style={styles.container}>
      <Text>
        Enter a light name as found on a nautical chart for a visual
        representation of its characteristics
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={formInput}
          autoCapitalize={"words"}
          autoCorrect={false}
        />

        <SubmitButton
          title="SEE THE LIGHT"
          function={handleSubmit}
          style={{ alignSelf: "center", width: "80%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {},
  input: {
    width: Dimensions.get("window").width * 0.7,
    height: 40,
    padding: 6,
    borderBottomColor: Colors.textLightGrey,
    borderBottomWidth: 1,
    marginVertical: 5,
    alignSelf: "center",
    fontSize: 20,
    textAlign: "center"
  }
});

export default LightForm;
