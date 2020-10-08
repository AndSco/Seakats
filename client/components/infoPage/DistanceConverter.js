import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import { FontAwesome } from "@expo/vector-icons";
import { convertDistance } from "../../functions/nautical";

const DistanceConverter = props => {
  const [isCellActive, setIsCellActive] = useState("nm");
  const [nm, setNm] = useState("");
  const [km, setKm] = useState("");
  const bothValuesAreReset = km === "" && nm === "";

  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{ ...TextStyles.boldTitle, alignSelf: "center", fontSize: 16 }}
      >
        {"Nautical miles to kilometres".toUpperCase()}
      </Text>
      <View style={styles.converter}>
        <TextInput
          style={TextStyles.textInput}
          keyboardType="decimal-pad"
          placeholder="NM"
          value={
            isCellActive === "nm" || bothValuesAreReset
              ? nm.toString()
              : convertDistance(+km, "km")
                  .toFixed(2)
                  .toString()
          }
          onChangeText={text => setNm(text)}
          onFocus={() => {
            setIsCellActive("nm");
            setNm("");
            setKm("");
          }}
        />
        <FontAwesome
          name="exchange"
          size={30}
          color={Colors.lightAzure}
          style={{ marginHorizontal: 10 }}
        />
        <TextInput
          style={TextStyles.textInput}
          keyboardType="decimal-pad"
          placeholder="KM"
          value={
            isCellActive === "km" || bothValuesAreReset
              ? km.toString()
              : convertDistance(+nm, "nm")
                  .toFixed(2)
                  .toString()
          }
          onChangeText={text => setKm(text)}
          onFocus={() => {
            setIsCellActive("km");
            setKm("");
            setNm("");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  converter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  textInput: {
    width: 100,
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 20,
    borderColor: Colors.lightAzure,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 5,
    marginBottom: 6
  }
});

export default DistanceConverter;
