import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerIOS = props => {
  return (
    <DateTimePicker
      value={new Date(props.date)}
      mode={"datetime"}
      is24Hour={true}
      onChange={newDate => {
        const newTimeStamp = new Date(newDate.nativeEvent.timestamp);
        props.onChangeHandler(props.inputIdentifier, newTimeStamp);
      }}
    />
  );
};

export default DatePickerIOS;
