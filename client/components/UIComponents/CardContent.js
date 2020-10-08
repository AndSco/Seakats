import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import TextStyles from "../../constants/textStyles";
import Colors from "../../constants/colors";
import CustomModal from "./Modal";
import SubmitButton from "../wrapperComponents/SubmitButton";
import { FontAwesome } from "@expo/vector-icons";
import ScreenView from "../wrapperComponents/ScreenView";

const CardContent = props => {
  const { editable, taller } = props;
  return (
    <View
      style={{
        ...styles.container,
        alignItems: props.centered ? "center" : "flex-start",
        marginHorizontal: props.centered ? 20 : 0,
        height: editable || taller ? 52 : 42,
        maxWidth: !props.wide ? Dimensions.get("window").width * 0.6 : "100%",
        maxHeight: props.wide ? 100 : 52
      }}
    >
      <Text
        style={{
          ...TextStyles.bodyText,
          color: props.labelColor ? props.labelColor : Colors.textLightGrey,
          fontSize: 12
        }}
      >
        {props.label}
      </Text>

      {editable ? (
        <CustomModal>
          <ScreenView style={{ backgroundColor: Colors.tertiary }}>
            <Text
              style={{ ...TextStyles.bodyHeading, color: Colors.textLightGrey }}
            >
              Edit{" "}
              <Text style={{ ...TextStyles.bodyHeading, color: "white" }}>
                {props.label}:
              </Text>
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={5}
              value={props.value}
              onChangeText={text =>
                props.changeTextFunction(props.inputId, text, true)
              }
              style={styles.input}
              keyboardType={props.isNumberInput ? "number-pad" : "default"}
            />
            <SubmitButton
              style={{ backgroundColor: Colors.greenTouch }}
              title={<FontAwesome name={"check"} size={25} color="white" />}
              function={props.onFinishEditing}
            />
          </ScreenView>
        </CustomModal>
      ) : (
        <Text
          style={{
            ...TextStyles.bodyText,
            color: props.valueColor ? props.valueColor : Colors.textDarkGrey,
            fontSize: 16
          }}
        >
          {props.shorten ? `${props.value.slice(0, 30)}...` : props.value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    // justifyContent: "space-between",
    paddingVertical: 10
  },
  input: {
    color: Colors.textLightestGrey,
    fontSize: 30,
    width: "90%",
    borderBottomColor: Colors.textLightGrey,
    borderBottomWidth: 0.4,
    paddingBottom: 5,
    paddingHorizontal: 15,
    marginTop: 35,
    marginBottom: 50,
    textAlign: "center"
  }
});

export default CardContent;
