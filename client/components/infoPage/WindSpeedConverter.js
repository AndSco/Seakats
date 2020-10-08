import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { windSpeedAllUnitConverter } from "../../functions/nautical";
import { unitLimits } from "../../assets/windConversionTable";
import ConverterInput from "../UIComponents/ConverterInput";

const WindSpeedConverter = () => {
  const [windObject, setWindObject] = useState(windSpeedAllUnitConverter());
  useEffect(() => console.log(windObject), [windObject]);

  const isAboveLimit = (enteredValue, originUnit) => {
    const upperLimit = unitLimits[originUnit];
    console.log("up limit", upperLimit);
    return {
      isAbove: +enteredValue > upperLimit,
      upperLimit
    };
  };

  const handleChange = (value, originUnit) => {
    if (value === "") {
      resetForms();
      return;
    }

    const { isAbove, upperLimit } = isAboveLimit(value, originUnit);
    console.log("check", originUnit, isAbove, upperLimit);

    if (isAbove) {
      Alert.alert(`${originUnit} max is ${upperLimit}!`);
      return;
    }

    const newObject = windSpeedAllUnitConverter(value, originUnit);
    console.log("newObj", newObject);
    setWindObject(newObject);
  };

  const resetForms = () => {
    setWindObject(windSpeedAllUnitConverter());
  };

  return (
    <View style={styles.container}>
      <ConverterInput
        label="knots"
        value={windObject.knots.toString()}
        handleChange={handleChange}
        resetForms={resetForms}
      />
      <ConverterInput
        label="beaufort"
        value={windObject.beaufort.toString()}
        handleChange={handleChange}
        resetForms={resetForms}
      />
      <ConverterInput
        label="Km/h"
        value={windObject.kmH.toString()}
        handleChange={handleChange}
        resetForms={resetForms}
      />
      <ConverterInput
        label="m/s"
        value={windObject.mSec.toString()}
        handleChange={handleChange}
        resetForms={resetForms}
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

export default WindSpeedConverter;
