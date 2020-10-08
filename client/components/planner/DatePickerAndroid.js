import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableOpacity
} from "react-native";

import ButtonContainer from "../wrapperComponents/ButtonContainer";
import TextStyles from "../../constants/textStyles";

const AndroidDatePicker = props => {
  const [day, setDay] = useState("TODAY");
  const [time, setTime] = useState("PICK A TIME");
  const [departureTimeStamp, setDepartureTimeStamp] = useState(null);
  const todayStartOfDay = new Date().setHours(0, 0, 0, 0);

  const handleDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open();
      if (action === DatePickerAndroid.dateSetAction) {
        const adjustedMonth = parseInt(month) + 1;
        const pickedDate = `${day}/${adjustedMonth.toString()}/${year}`;
        const dateTimeStamp = new Date(Date.UTC(year, month, day)).getTime();
        console.log("dateTimeStamp", dateTimeStamp);
        setDepartureTimeStamp(dateTimeStamp);
        setDay(pickedDate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTime = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open();
      if (action !== TimePickerAndroid.dismissedAction) {
        const pickedTime = `${hour}:${minute}0h`;
        const hourTimeStamp = hour * 60 * 60 * 1000 + minute * 60 * 1000;
        setDepartureTimeStamp(timeStamp => timeStamp + hourTimeStamp);
        setTime(pickedTime);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDepartureTimeStamp(todayStartOfDay);
  }, []);

  // Updates the value in the form input
  useEffect(() => {
    props.updateTimeStamp(props.identifier, new Date(departureTimeStamp));
  }, [departureTimeStamp]);

  return (
    <View>
      <ButtonContainer>
        <TouchableOpacity onPress={handleDate}>
          <View style={styles.pickerTextContainer}>
            <Text style={{ ...TextStyles.heading, ...styles.pickerText }}>
              {day}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTime}>
          <View style={styles.pickerTextContainer}>
            <Text style={{ ...TextStyles.heading, ...styles.pickerText }}>
              {time}
            </Text>
          </View>
        </TouchableOpacity>
      </ButtonContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerTextContainer: {
    padding: 10,
    paddingVertical: 25
  },
  pickerText: {
    fontSize: 18
  }
});

export default AndroidDatePicker;
