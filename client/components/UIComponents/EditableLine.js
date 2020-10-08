import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CardContent from "./CardContent";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/colors";

const EditableLine = props => {
  const [startEditing, setStartEditing] = useState(false);

  const finishEditing = () => {
    setStartEditing(false);
  };

  return (
    <View style={styles.line}>
      <CardContent
        label={props.label}
        value={props.value}
        editable={startEditing}
        changeTextFunction={props.changeTextFunction}
        inputId={props.inputId}
        onFinishEditing={finishEditing}
        isNumberInput={props.numberPad}
        shorten={props.shorten}
      />
      <TouchableOpacity onPress={() => setStartEditing(true)}>
        <FontAwesome
          name={"edit"}
          size={20}
          color={Colors.textLightGrey}
          style={{ marginLeft: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50
  }
});

export default EditableLine;
