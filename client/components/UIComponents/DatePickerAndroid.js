import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ButtonContainer from "../wrapperComponents/ButtonContainer";
import TextStyles from "../../constants/textStyles";

const DatePickerAndroid = props => {
  const [date, setDate] = useState(new Date(props.date));

  const [day, setDay] = useState("TODAY");
  const [time, setTime] = useState("PICK A TIME");
  const [isPickerShowing, setIsPickerShowing] = useState(false);
  const [pickerMode, setPickerMode] = useState(null);

  const openDatePicker = () => {
    setIsPickerShowing(true);
    setPickerMode("date");
  };

  const openTimePicker = () => {
    setIsPickerShowing(true);
    setPickerMode("time");
  };

  const closePicker = () => {
    setIsPickerShowing(false);
  };

  useEffect(() => console.log("DATE CHANGED", date), [date]);

  return (
    <View>
      <ButtonContainer>
        <TouchableOpacity onPress={openDatePicker}>
          <View style={styles.pickerTextContainer}>
            <Text style={{ ...TextStyles.heading, ...styles.pickerText }}>
              {day === "TODAY" ? day : day.getDate()}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openTimePicker}>
          <View style={styles.pickerTextContainer}>
            <Text style={{ ...TextStyles.heading, ...styles.pickerText }}>
              {time}
            </Text>
          </View>
        </TouchableOpacity>
      </ButtonContainer>

      {isPickerShowing && (
        <DateTimePicker
          value={date}
          // minimumDate={new Date(props.date).getTime()}
          mode={pickerMode}
          is24Hour={true}
          display="default"
          onChange={newDate => {
            const newTimeStamp = new Date(newDate.nativeEvent.timestamp);
            setDate(newTimeStamp);
            closePicker();
            // props.onChangeHandler(props.inputIdentifier, newTimeStamp);
            // console.log(newDate);
          }}
        />
      )}
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

export default DatePickerAndroid;

// import React, { useState, useEffect } from "react";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TimePickerAndroid,
//   TouchableOpacity,
//   Alert
// } from "react-native";
// import ButtonContainer from "../wrapperComponents/ButtonContainer";
// import TextStyles from "../../constants/textStyles";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const AndroidDatePicker = props => {
//   const [day, setDay] = useState("TODAY");
//   const [time, setTime] = useState("PICK A TIME");
//   const [departureTimeStamp, setDepartureTimeStamp] = useState(null);
//   const todayStartOfDay = new Date().setHours(0, 0, 0, 0);

//   const handleDate = async () => {
//     try {
//       const { action, year, month, day } = await DatePickerAndroid.open();
//       if (action === DatePickerAndroid.dateSetAction) {
//         const adjustedMonth = parseInt(month) + 1;
//         const pickedDate = `${day}/${adjustedMonth.toString()}/${year}`;
//         const dateTimeStamp = new Date(Date.UTC(year, month, day)).getTime();
//         console.log("dateTimeStamp", dateTimeStamp);
//         setDepartureTimeStamp(dateTimeStamp);
//         setDay(pickedDate);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleTime = async () => {
//     try {
//       const { action, hour, minute } = await TimePickerAndroid.open();
//       if (action !== TimePickerAndroid.dismissedAction) {
//         const pickedTime = `${hour}:${minute}0h`;
//         const hourTimeStamp = hour * 60 * 60 * 1000 + minute * 60 * 1000;
//         setDepartureTimeStamp(timeStamp => timeStamp + hourTimeStamp);
//         setTime(pickedTime);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     setDepartureTimeStamp(todayStartOfDay);
//   }, []);

//   // Updates the value in the form input
//   useEffect(() => {
//     props.updateTimeStamp(props.identifier, new Date(departureTimeStamp));
//   }, [departureTimeStamp]);

//   return (
//     <View>
//       <ButtonContainer>
//         <TouchableOpacity onPress={handleDate}>
//           <View style={styles.pickerTextContainer}>
//             <Text style={{ ...TextStyles.heading, ...styles.pickerText }}>
//               {day}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={handleTime}>
//           <View style={styles.pickerTextContainer}>
//             <Text style={{ ...TextStyles.heading, ...styles.pickerText }}>
//               {time}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </ButtonContainer>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   pickerTextContainer: {
//     padding: 10,
//     paddingVertical: 25
//   },
//   pickerText: {
//     fontSize: 18
//   }
// });

// export default AndroidDatePicker;

// import React, { useState, useEffect } from "react";
// import { View, Button, Platform, Text, StyleSheet } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import ButtonContainer from "../wrapperComponents/ButtonContainer";
// import Colors from "../../constants/colors";
// import TextStyles from "../../constants/textStyles";
// import {
//   getBeginningOfDay,
//   hoursToMilliseconds,
//   minutesToMilliseconds
// } from "../../functions/timeFormatting";
// import moment from "moment";
// import { TouchableOpacity } from "react-native-gesture-handler";

// const AndroidDatePicker = props => {
//   const initialPickerState = {
//     date: new Date(props.date),
//     mode: "date",
//     show: false
//   };

//   const [pickerState, setPickerState] = useState(initialPickerState);
//   const { date } = pickerState;

//   // console.log("BEGINN", beginningOfToday)
//   // const [time, setTime] = useState(calculateTimeInMs(new Date(pickerState.date).getTime()));
//   const [day, setDay] = useState(getBeginningOfDay(date));
//   const [hours, setHours] = useState(hoursToMilliseconds(date.getHours()));
//   const [minutes, setMinutes] = useState(
//     minutesToMilliseconds(date.getMinutes())
//   );
//   const [finalTimeStamp, setFinalTimeStamp] = useState(
//     new Date(day + hours + minutes)
//   );

//   // useEffect(() => {
//   //   setDay(getBeginningOfDay(date));
//   //   setHours(hoursToMilliseconds(date.getHours()));
//   //   setMinutes(minutesToMilliseconds(date.getMinutes()));
//   // }, [date])

//   useEffect(() => {
//     console.log("FINAL TIMESTAMP", finalTimeStamp);
//     setFinalTimeStamp(new Date(day + hours + minutes));
//   }, [day, hours, minutes]);

//   const setDate = (event, date) => {
//     date = date || pickerState.date;
//     setPickerState({
//       ...pickerState,
//       show: Platform.OS === "ios" ? true : false,
//       date
//     });
//     // setDay(new Date(date).setHours(0, 0, 0, 0));
//     // setTime(calculateTimeInMs(new Date(date).getTime()));
//   };

//   const show = mode => {
//     setPickerState({
//       ...pickerState,
//       show: true,
//       mode
//     });
//   };

//   const timepicker = () => {
//     show("time");
//   };

//   useEffect(() => console.log("DATE", pickerState.date), [pickerState.date]);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.chosenTime} onPress={timepicker}>
//         <Text style={{ ...TextStyles.heading, ...styles.chosenTimeText }}>
//           {moment(finalTimeStamp).calendar()}
//         </Text>
//       </TouchableOpacity>

//       <ButtonContainer style={{ width: "100%" }}>
//         {/* <Button
//           onPress={datepicker}
//           title="CHANGE DAY"
//           color={Colors.primary}
//         /> */}
//         <Button
//           onPress={timepicker}
//           title="CHANGE TIME"
//           color={Colors.fourthiary}
//         />
//         <Button
//           title="Confirm"
//           color={Colors.greenTouch}
//           onPress={() =>
//             props.onChangeHandler(props.inputIdentifier, pickerState.date)
//           }
//         />
//       </ButtonContainer>

//       {pickerState.show && (
//         <DateTimePicker
//           is24Hour={true}
//           value={pickerState.date}
//           mode={pickerState.mode}
//           display="default"
//           onChange={setDate}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: 100,
//     alignItems: "center",
//     justifyContent: "space-between"
//   },
//   chosenTime: {},
//   chosenTimeText: {
//     fontSize: 25
//   }
// });

// export default AndroidDatePicker;
