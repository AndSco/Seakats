import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextStyles from "../../../constants/textStyles";
import PaddedLine from "../../UIComponents/PaddedLine";

const LightDescription = ({ lightObject }) => {
  console.log("OBJ", lightObject);

  return (
    <View style={styles.descriptionBox}>
      <View style={styles.abbreviation}>
        <Text style={{ color: "white", fontStyle: "italic", fontSize: 25 }}>
          -- {lightObject.abbreviation} --
        </Text>
      </View>

      <View style={styles.nameContainer}>
        <Text style={{ ...TextStyles.boldTitle, ...styles.name }}>
          {lightObject.isGrouped
            ? `Grouped ${lightObject.type} (${lightObject.numberOfFlashes})`
            : lightObject.type}
        </Text>
      </View>

      <PaddedLine content={lightObject.description} />

      <View style={styles.otherDetails}>
        {!lightObject.isAlternating ? (
          <PaddedLine content={`Color: ${lightObject.color.color}`} />
        ) : (
          <PaddedLine
            content={`Colors: ${lightObject.color.firstColor.color} and ${lightObject.color.secondColor.color}`}
          />
        )}

        {lightObject.type !== "Fixed" && (
          <PaddedLine
            content={`Period: ${lightObject.period / 1000} seconds`}
          />
        )}

        {lightObject.numberOfFlashes && (
          <PaddedLine
            content={`Num. of flashes: ${
              typeof lightObject.numberOfFlashes === "number"
                ? lightObject.numberOfFlashes
                : lightObject.numberOfFlashes.join(" + ")
            } over ${lightObject.period / 1000} seconds`}
          />
        )}

        {lightObject.lightHeight && (
          <PaddedLine content={`Light height: ${lightObject.lightHeight}m`} />
        )}

        {lightObject.visibleFrom && (
          <PaddedLine content={`Visible from: ${lightObject.visibleFrom}NM`} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionBox: {
    width: "80%",
    marginTop: 60,
    justifyContent: "center"
    // alignItems: "center"
  },
  abbreviation: {
    marginBottom: 30,
    alignSelf: "center"
  },
  nameContainer: {
    alignSelf: "center"
  },
  name: {
    color: "white",
    marginBottom: 12,
    textAlign: "center"
  },
  otherDetails: {
    marginVertical: 20
  }
});

export default LightDescription;
