import React, { useReducer, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import EditableLine from "../UIComponents/EditableLine";
import { useSelector, useDispatch } from "react-redux";
import HighlightUnderline from "../wrapperComponents/HighlightUnderline";
import TextStyles from "../../constants/textStyles";
import moment from "moment";
import {
  millisecondsToHours,
  createDateFromString,
  extractTime
} from "../../functions/timeFormatting";
import { getTodayWeather } from "../../functions/weather";
import Spinner from "../UIComponents/Spinner";
import SubmitButton from "../wrapperComponents/SubmitButton";
import Colors from "../../constants/colors";
import { closeSession } from "../../store/actions/session";
import { formReducer, FORM_UPDATE } from "../../store/reducers/form";
import axios from "axios";
import { refreshUser } from "../../store/actions/auth";
import apiURL from "../../assets/apiUrl";

const AfterPaddling = props => {
  const currentSession = useSelector(store => store.session);
  const { userId } = currentSession;
  const actualPaddleDuration = millisecondsToHours(
    new Date().getTime() - currentSession.departureTimeStamp
  );
  const departureTime = extractTime(currentSession.departureTimeStamp);
  const arrivalTime = extractTime(new Date().getTime());
  const [weather, isLoading] = getTodayWeather();
  const dispatch = useDispatch();

  const initialState = {
    inputValues: {
      from: currentSession.departurePoint,
      to: currentSession.destination,
      date: moment(currentSession.departureTimeStamp).format("DD/MM/YYYY"),
      hoursPaddled: millisecondsToHours(
        new Date().getTime() - currentSession.departureTimeStamp
      ),
      distancePaddled: (actualPaddleDuration * 3).toFixed(2),
      wind: weather ? weather.shortWind : "waiting",
      sea: weather ? weather.sea : "waiting"
    },
    inputValidities: {
      from: true,
      to: true,
      date: true,
      hoursPaddled: true,
      distancePaddled: true,
      wind: true,
      sea: true
    },
    isFormValid: true
  };

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const {
    from,
    to,
    date,
    hoursPaddled,
    distancePaddled,
    wind,
    sea
  } = formState.inputValues;

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  // Initialise wind and sea once the weather has been fetched
  useEffect(() => {
    if (weather) {
      dispatchFormState({
        type: FORM_UPDATE,
        value: weather.shortWind,
        isValid: true,
        input: "wind"
      });

      dispatchFormState({
        type: FORM_UPDATE,
        value: weather.sea,
        isValid: true,
        input: "sea"
      });
    }
  }, [weather]);

  const saveTrip = async (tripToSave, userId) => {
    const response = await axios.post(
      `${apiURL}/api/trips/${userId}`,
      tripToSave
    );
    console.log("save trip response", response.data);
  };

  return isLoading || !weather ? (
    <Spinner />
  ) : (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ width: Dimensions.get("window").width }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <HighlightUnderline style={{ width: "80%", alignSelf: "center" }}>
          <Text style={TextStyles.bodyHeading}>Save paddle to your trips</Text>
        </HighlightUnderline>
        <View style={{ ...styles.listContainer }}>
          <EditableLine
            label="From"
            value={from}
            inputId="from"
            changeTextFunction={inputChangeHandler}
          />
          <EditableLine
            label="To"
            value={to}
            inputId="to"
            changeTextFunction={inputChangeHandler}
          />
          <EditableLine
            label="Date"
            value={date}
            inputId="date"
            changeTextFunction={inputChangeHandler}
          />
          <EditableLine
            label="Hours paddled"
            value={hoursPaddled}
            inputId="hoursPaddled"
            changeTextFunction={inputChangeHandler}
          />
          <EditableLine
            label="Estimated Nautical Miles"
            value={distancePaddled}
            inputId="distancePaddled"
            changeTextFunction={inputChangeHandler}
          />
          <EditableLine
            label="Wind"
            value={wind}
            inputId="wind"
            changeTextFunction={inputChangeHandler}
            // shorten={true}
          />
          <EditableLine
            label="Sea"
            value={sea}
            inputId="sea"
            changeTextFunction={inputChangeHandler}
          />
          <View>
            <SubmitButton
              title="Save to trips"
              style={{
                ...TextStyles.outlinedButton,
                alignSelf: "center",
                width: "100%"
              }}
              textStyle={{
                ...TextStyles.outlinedButtonText
              }}
              function={async () => {
                const tripToSave = {
                  ...formState.inputValues,
                  date: createDateFromString(date),
                  userId: userId,
                  distancePaddled: +distancePaddled,
                  hoursPaddled: +hoursPaddled,
                  departureTime: departureTime,
                  arrivalTime: arrivalTime
                };
                console.log("trip to save", tripToSave);
                await saveTrip(tripToSave, userId);
                await dispatch(refreshUser(userId));
                props.onResetPlanner();
              }}
            />
            <SubmitButton
              title="Don't save"
              style={{
                ...TextStyles.outlinedButton,
                borderColor: Colors.warning,
                alignSelf: "center",
                width: "100%"
              }}
              textStyle={{
                ...TextStyles.outlinedButtonText,
                color: Colors.warning,
                fontSize: 16
              }}
              function={() => {
                dispatch(closeSession());
                props.onResetPlanner();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "90%",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 10
  }
});

export default AfterPaddling;
