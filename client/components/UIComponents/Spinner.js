import React from "react";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/colors";

const Spinner = props => {
  return (
    <ActivityIndicator
      size="large"
      color={Colors.primary}
      style={{ ...props.style }}
    />
  );
};

export default Spinner;
