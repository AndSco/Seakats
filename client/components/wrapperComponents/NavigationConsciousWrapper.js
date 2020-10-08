import React from "react";
import { View } from "react-native";
import { NavigationEvents } from "react-navigation";

const NavigationConsciousWrapper = props => {
  const { children } = props;
  return (
    <View>
      <NavigationEvents onWillFocus={props.onFocusFunction} />
      {children}
    </View>
  );
};

export default NavigationConsciousWrapper;
