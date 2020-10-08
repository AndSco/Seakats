import React, { useState, useEffect } from "react";
import { View, Button, Platform, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/colors";
import TextStyles from "../../constants/textStyles";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

const AndroidDatePicker = props => {
  const initialPickerState = {
    date: new Date(props.date),
    mode: "date",
    show: false
  };

  const [pickerState, setPickerState] = useState(initialPickerState);

  const setDate = (event, date) => {
    date = date || pickerState.date;
    setPickerState({
      ...pickerState,
      show: Platform.OS === "ios" ? true : false,
      date
    });
  };

  const { onChangeHandler, inputIdentifier } = props;
  useEffect(() => {
    onChangeHandler(inputIdentifier, pickerState.date);
  }, [pickerState.date, onChangeHandler, inputIdentifier]);

  const show = mode => {
    setPickerState({
      ...pickerState,
      show: true,
      mode
    });
  };

  const timepicker = () => {
    show("time");
  };

  useEffect(() => console.log("DATE", pickerState.date), [pickerState.date]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chosenTime} onPress={timepicker}>
        <Text style={{ ...TextStyles.heading, ...styles.chosenTimeText }}>
          {moment(pickerState.date).calendar()}
        </Text>
      </TouchableOpacity>

      <Button
        onPress={timepicker}
        title="CHANGE TIME"
        color={Colors.fourthiary}
      />

      {pickerState.show && (
        <DateTimePicker
          is24Hour={true}
          value={pickerState.date}
          mode={pickerState.mode}
          display="default"
          onChange={setDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "space-between"
  },
  chosenTime: {},
  chosenTimeText: {
    fontSize: 25
  }
});

export default AndroidDatePicker;
